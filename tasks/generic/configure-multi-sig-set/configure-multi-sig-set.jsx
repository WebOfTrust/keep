import m from 'mithril';
import { Button, Checkbox, Radio, Select, TextField, TextTooltip } from '../../../src/app/components';
import { Contacts, KERI, Profile } from '../../../src/app/services';

import secureMessaging from '../../../src/assets/img/secure-messaging.png';

class ConfigureMultiSigSet {
  constructor() {
    this.currentState = 'configure-multi-sig-index';
    this.groupAlias = '';
    this.fractionallyWeighted = false;
    this.numSigners = 0; // Used only if fractionallyWeighted is false
    this.signers = [
      {
        id: '',
        alias: '',
        weight: '',
      },
    ];
    this.default = Profile.getDefaultAID()
    this.weight = "1/2"
    Contacts.requestList();
  }

  initiateGroupInception() {
    let aids = this.signers.map((obj) => {
      return obj.id;
    });
    let inceptData = {
      aids: [this.default.aid, ...aids],
      toad: 3,
      wits: [
        'BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo',
        'BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw',
        'Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c',
      ],
    };
    if (!this.fractionallyWeighted) {
      let sith = this.numSigners.toString();
      inceptData.isith = sith;
      inceptData.nsith = sith;
    }
    if (this.fractionallyWeighted) {
      let vals = this.signers
        .map((obj) => {
          return obj.weight;
        });
      vals.splice(0, 0, this.weight);
      let sith = vals.join(',')
      inceptData.isith = sith;
      inceptData.nsith = sith;
    }
    KERI.initiateGroupInception(this.groupAlias, inceptData)
      .then((incept) => {
        console.log(incept);
      })
      .catch((err) => {
        console.log('initiateGroupInception', err);
      });
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'configure-multi-sig-index' && (
          <>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 1rem 0' }} />
            <h3>Configure Multi-Sig Group</h3>
            <p class="p-tag">
              If you are seeing this, it is because you have verified contacts and can now configure the multi-sig
              group. You will now be tasked with creating the multi-sig group. Once this is completed, make sure that
              all members of the multi-sig group are available to sign the inception event of the multisig identifier.
            </p>
            <div class="flex flex-justify-end">
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'create-group-alias';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'create-group-alias' && (
          <>
            <h3>Create Your Multi-Sig Group Alias</h3>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 2rem 0' }} />
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              The alias should be an easy to remember name for your multi-sig group.
            </p>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              What would you like your group's alias to be?
            </p>
            <TextField
              outlined
              fluid
              value={this.groupAlias}
              oninput={(e) => {
                this.groupAlias = e.target.value;
              }}
            />
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'configure-multi-sig-index';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={!this.groupAlias}
                onclick={() => {
                  this.currentState = 'configure-multisig-group';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'configure-multisig-group' && (
          <>
            <h3>Configure Multi-Sig Group</h3>
            <div style={{ height: '608px', overflowY: 'auto' }}>
              <p class="p-tag-bold">Are your signatures fractionally weighted?</p>
              <p class="p-tag">ex. Each signer equals 1/3 of the group.</p>
              <div class="flex flex-align-center">
                <div class="flex flex-align-center" style={{ marginRight: '2rem' }}>
                  <Radio
                    id="weighted-yes"
                    name="weighted"
                    checked={this.fractionallyWeighted}
                    onclick={() => {
                      this.fractionallyWeighted = true;
                    }}
                  />
                  <label for="weighted-yes">Yes</label>
                </div>
                <div class="flex flex-align-center">
                  <Radio
                    id="weighted-no"
                    name="weighted"
                    checked={!this.fractionallyWeighted}
                    onclick={() => {
                      this.fractionallyWeighted = false;
                    }}
                  />
                  <label for="weighted-no">No</label>
                </div>
              </div>
              {!this.fractionallyWeighted && (
                <>
                  <label>
                    <p class="p-tag-bold">How many signers are required to sign?</p>
                  </label>
                  <TextField
                    outlined
                    type="number"
                    value={this.numSigners}
                    oninput={(e) => {
                      this.numSigners = parseInt(e.target.value);
                    }}
                  />
                </>
              )}
              <div class="flex" style={{ alignItems: 'center', margin: '2rem 0 2rem 0' }}>
                <Checkbox />
                <label>Create Credential Registry</label>
              </div>
              <div class="flex flex-justify-between">
                <label>
                  <>
                    <b>Enter Signers </b>
                    <TextTooltip
                      label={
                        <u>
                          <b>(in order):</b>
                        </u>
                      }
                    >
                      Order must be consistent (same exact list everytime). If fractionally weighted it should be
                      highest to lowest weight.
                    </TextTooltip>
                  </>
                </label>
                {this.fractionallyWeighted && <b>Weight</b>}
              </div>
              <div className="flex flex-justify-between" style={{margin: '1rem 0'}}>
                <p><b>{this.default.name}</b> (Your local identifier)</p>
                {this.fractionallyWeighted && (
                    <TextField
                        outlined
                        style={{ width: '80px' }}
                        placeholder="1/3"
                        value={this.weight}
                        oninput={(e) => {
                          this.weight = e.target.value;
                        }}
                    />
                )}
              </div>
              {this.signers.map((signer) => {
                return (
                  <div class="flex flex-justify-between" style={{ margin: '1rem 0' }}>
                    <Select
                      options={Contacts.list.map((contact) => {
                        return {
                          label: contact.alias,
                          value: contact.id,
                        };
                      })}
                      selectedChange={(id) => {
                        let contact = Contacts.filterById(id)[0];
                        signer.id = contact.id;
                        signer.alias = contact.alias;
                      }}
                    />
                    {this.fractionallyWeighted && (
                      <TextField
                        outlined
                        style={{ width: '80px' }}
                        placeholder="1/3"
                        value={signer.weight}
                        oninput={(e) => {
                          signer.weight = e.target.value;
                        }}
                      />
                    )}
                  </div>
                );
              })}
              <Button
                class="button--big button--no-transform"
                raised
                label="Add New"
                iconLeading="add"
                onclick={() => {
                  this.signers.push({
                    id: '',
                    alias: '',
                    weight: '',
                  });
                }}
              />
            </div>
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'create-group-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={
                  this.signers.filter((signer) => {
                    return signer.id !== '';
                  }).length < 1
                }
                onclick={() => {
                  this.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}
        {/* {this.currentState === 'select-delegator' && (
          <>
            <img src={secureMessaging} style={{ width: '268px' }} />
            <h3>Select a Delegator</h3>
            <p class="p-tag">
              Provide the AID and create an alias for the delegator that will be delegating the accesses.
            </p>
            <p class="p-tag-bold">Delegator AID</p>
            <TextField outlined style={{ marginRight: '2rem' }} placeholder="delegator aid" />
            <p class="p-tag-bold">Delegator Alias</p>
            <TextField outlined style={{ marginRight: '2rem' }} placeholder="delegator alias" />
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'configure-multisig-group';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )} */}
        {this.currentState === 'review-and-confirm' && (
          <>
            <h3>Review and Confirm</h3>
            <h4>Group Alias</h4>
            <TextField outlined fluid value={this.groupAlias} />
            <p>Review signers to make sure the list is complete.</p>
            <h4>Signers (in order):</h4>
            <TextField outlined style={{ margin: '0 2rem 2rem 0' }} value={this.default.name} />
            {this.fractionallyWeighted && <TextField outlined style={{ width: '80px' }} value={this.weight} />}
            {this.signers.map((signer) => {
              return (
                <>
                  <TextField outlined style={{ margin: '0 2rem 2rem 0' }} value={signer.alias} />
                  {this.fractionallyWeighted && <TextField outlined style={{ width: '80px' }} value={signer.weight} />}
                </>
              );
            })}
            {/* <div class="flex flex-justfiy-between" style={{ margin: '0 0 4rem 0' }}>
              <div class="flex flex-column">
                <p class="p-tag-bold">Delegator AID</p>
                <TextField outlined style={{ marginRight: '2rem' }} placeholder="delegator aid" />
              </div>
              <div class="flex flex-column">
                <p class="p-tag-bold">Delegator Alias</p>
                <TextField outlined style={{ marginRight: '2rem' }} placeholder="delegator alias" />
              </div>
            </div> */}
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'create-group-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Complete"
                onclick={() => {
                  this.initiateGroupInception();
                  this.currentState = 'setup-complete';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'setup-complete' && (
          <>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 2rem 0' }} />
            <h3>Multi-Signature Verification in Progress</h3>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              You will be notified when the participants provide their signature on the Inception Event.
            </p>
            <div class="flex flex-justify-end">
              <Button class="button--big button--no-transform" raised label="View Progress" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = ConfigureMultiSigSet;
