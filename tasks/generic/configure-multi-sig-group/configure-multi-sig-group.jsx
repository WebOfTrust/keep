import m from 'mithril';
import { Button, Checkbox, IconButton, Radio, Select, TextField, TextTooltip } from '../../../src/app/components';
import { Contacts, KERI, Profile, MultiSig, Witnesses } from '../../../src/app/services';

import secureMessaging from '../../../src/assets/img/secure-messaging.svg';
import greenCheckMark from '../../../src/assets/img/green-check-mark.svg';
import redX from '../../../src/assets/img/red-x.svg';

class ConfigureMultiSigGroupTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <ConfigureMultiSigGroup end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'configure-multi-sig-index';
    this.requireDelegator = config.requireDelegator;
  }

  get imgSrc() {
    return secureMessaging;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class ConfigureMultiSigGroup {
  constructor() {
    this.groupAlias = '';
    this.status = '';
    this.fractionallyWeighted = false;
    this.numSigners = 0; // Used only if fractionallyWeighted is false
    this.wits = Witnesses.witnessPools[0].wits;
    MultiSig.participants = [
      {
        id: '',
        alias: '',
        weight: '',
        signed: false,
      },
    ];
    this.default = Profile.getDefaultAID();
    this.weight = '1/2';
    this.delegator = null;
    Contacts.requestList();
  }

  ensureMultiSigSigned() {
    new Promise(function (resolve, reject) {
      setTimeout(function waitForSignatures() {
        KERI.getEscrowsForIdentifier(MultiSig.currentEvent['i'])
          .then((escrows) => {
            if (escrows['partially-signed-events'].length > 0) {
              let icp = escrows['partially-signed-events'][0];
              let sigs = icp['signatures'];
              sigs.every((sig) => {
                let idx = sig.index;
                MultiSig.participants[idx].signed = true;
              });
              this.status = 'Waiting for participant signatures...';
              m.redraw();
            } else if (escrows['partially-witnessed-events'].length > 0) {
              this.status = 'Waiting for witness receipts...';
              m.redraw();
            } else {
              MultiSig.participants.forEach((sig) => {
                sig.signed = true;
              });
              KERI.listIdentifiers()
                .then((identifiers) => {
                  let icp = identifiers.find((e) => e.prefix === MultiSig.currentEvent['i']);
                  if (icp.group.accepted) {
                    this.status = 'Inception Complete';
                  } else {
                    this.status = 'Failed: Event Timeout';
                  }
                  m.redraw();
                })
                .catch((err) => {
                  console.log('listIdentifiers', err);
                });
              return;
            }
            setTimeout(waitForSignatures, 2000);
          })
          .catch((err) => {
            reject();
            console.log('getContacts', err);
          });
      }, 2000);
    });
  }

  initiateGroupInception() {
    let aids = MultiSig.participants.map((obj) => {
      return obj.id;
    });
    let inceptData = {
      aids: [this.default.prefix, ...aids],
      toad: 3,
      wits: Witnesses.witnesses[this.wits],
    };
    if (!this.fractionallyWeighted) {
      let sith = this.numSigners.toString();
      inceptData.isith = sith;
      inceptData.nsith = sith;
    }
    if (this.fractionallyWeighted) {
      let vals = MultiSig.participants.map((obj) => {
        return obj.weight;
      });
      vals.splice(0, 0, this.weight);
      let sith = vals.join(',');
      inceptData.isith = sith;
      inceptData.nsith = sith;
    }
    if (this.delegator) {
      inceptData.delpre = this.delegator.id;
    }
    MultiSig.participants.splice(0, 0, {
      id: this.default.prefix,
      alias: this.default.name,
      weight: this.weight,
      signed: true,
    });
    KERI.initiateGroupInception(this.groupAlias, inceptData)
      .then((incept) => {
        this.status = 'Event Submitted';
        MultiSig.currentEvent = incept;
        this.ensureMultiSigSigned();
      })
      .catch((err) => {
        this.status = 'Failed: Invalid Event';
        console.log('initiateGroupInception', err);
      });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'configure-multi-sig-index' && (
          <>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 1rem 0' }} />
            <h3>Configure Multi-Sig Group</h3>
            <p class="p-tag" style={{ margin: '2rem 0' }}>
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
                  vnode.attrs.parent.currentState = 'create-group-alias';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'create-group-alias' && (
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
                  vnode.attrs.parent.currentState = 'configure-multi-sig-index';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={!this.groupAlias}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'configure-multisig-group';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'configure-multisig-group' && (
          <>
            <h3 style={{ marginBottom: '2rem' }}>Configure Multi-Sig Group</h3>
            <p class="p-tag-bold">Select your witness pool:</p>
            <Select
              outlined
              value={this.wits}
              options={Witnesses.witnessPools}
              style={{ width: '300px' }}
              onchange={(wits) => {
                this.wits = wits;
              }}
            />

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
                <label class="font-weight--bold font-color--battleship" for="weighted-yes">
                  Yes
                </label>
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
                <label class="font-weight--bold font-color--battleship" for="weighted-no">
                  No
                </label>
              </div>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '1rem 0' }}>
              <Checkbox checked={true} disabled={true} />
              <label class="font-weight--medium font-color--battleship">Create Credential Registry</label>
            </div>
            {!this.fractionallyWeighted && (
              <>
                <label>
                  <p class="p-tag-bold">How many signers are required to sign?</p>
                </label>
                <TextField
                  outlined
                  type="number"
                  style={{ marginBottom: '2rem' }}
                  value={this.numSigners}
                  oninput={(e) => {
                    this.numSigners = parseInt(e.target.value);
                  }}
                />
              </>
            )}
            <div class="flex flex-align-center flex-justify-between">
              <label class="font-color--battleship">
                <>
                  <b>Enter Signers </b>
                  <TextTooltip
                    label={
                      <u>
                        <b>(in order):</b>
                      </u>
                    }
                  >
                    Order must be consistent (same exact list everytime). If fractionally weighted it should be highest
                    to lowest weight.
                  </TextTooltip>
                </>
              </label>
              <div class="flex-1"></div>
              {this.fractionallyWeighted && <b class="font-color--battleship">Weight</b>}
              <div style={{ width: '48px', height: '48px', marginLeft: '1rem' }}></div>
            </div>
            <div style={{ marginBottom: '1rem', maxHeight: '320px', overflowY: 'auto' }}>
              <div className="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
                <p class="font-color--battleship">
                  <b>{this.default.name}</b> (Your local identifier)
                </p>
                <div class="flex-1"></div>
                {this.fractionallyWeighted && (
                  <TextField
                    outlined
                    style={{ width: '75px' }}
                    placeholder="1/3"
                    value={this.weight}
                    oninput={(e) => {
                      this.weight = e.target.value;
                    }}
                  />
                )}
                <div style={{ width: '48px', height: '48px', marginLeft: '1rem' }}></div>
              </div>
              {MultiSig.participants.map((signer, index) => {
                return (
                  <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
                    <Select
                      outlined
                      options={Contacts.list.map((contact) => {
                        return {
                          label: contact.alias,
                          value: contact.id,
                        };
                      })}
                      onchange={(id) => {
                        let contact = Contacts.filterById(id)[0];
                        signer.id = contact.id;
                        signer.alias = contact.alias;
                      }}
                    />
                    <div class="flex-1"></div>
                    {this.fractionallyWeighted && (
                      <TextField
                        outlined
                        style={{ width: '75px' }}
                        placeholder="1/3"
                        value={signer.weight}
                        oninput={(e) => {
                          signer.weight = e.target.value;
                        }}
                      />
                    )}
                    <IconButton
                      icon="close"
                      style={{
                        marginLeft: '1rem',
                      }}
                      onclick={() => {
                        this.signers.splice(index, 1);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              raised
              class="button--no-transform button--gray"
              label="Add Another"
              iconLeading="add"
              onclick={() => {
                MultiSig.participants.push({
                  id: '',
                  alias: '',
                  weight: '',
                  signed: false,
                });
              }}
            />
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-group-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={
                  MultiSig.participants.filter((signer) => {
                    return signer.id !== '';
                  }).length < 1
                }
                onclick={() => {
                  if (vnode.attrs.parent.requireDelegator) {
                    vnode.attrs.parent.currentState = 'select-delegator';
                  } else {
                    vnode.attrs.parent.currentState = 'review-and-confirm';
                  }
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'select-delegator' && (
          <>
            <img src={secureMessaging} style={{ width: '268px' }} />
            <h3>Select a Delegator</h3>
            <p class="p-tag">Select a delegator that will be delegating the accesses.</p>
            <p class="p-tag-bold">Delegator</p>
            <Select
              outlined
              options={Contacts.list.map((contact) => {
                return {
                  label: contact.alias,
                  value: contact.id,
                };
              })}
              onchange={(id) => {
                let contact = Contacts.filterById(id)[0];
                this.delegator = contact;
              }}
            />
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'configure-multisig-group';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={!this.delegator}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'review-and-confirm' && (
          <>
            <h3 style={{ marginBottom: '2rem' }}>Review and Confirm</h3>
            <p class="font-weight--bold font-color--battleship">Group Alias</p>
            <div class="uneditable-value">{this.groupAlias}</div>
            <p className="font-weight--bold font-color--battleship">Witness Pool:</p>
            <div className="uneditable-value">{Witnesses.witnessPools.find((p) => p.value === this.wits).label}</div>
            <p class="font-color--battleship" style={{ margin: '2rem 0' }}>
              Review signers to make sure the list is complete.
            </p>
            <p class="font-weight--bold font-color--battleship">Signers (in order):</p>
            <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
              <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                {this.default.name}
              </div>
              {this.fractionallyWeighted && <div class="uneditable-value">{this.weight}</div>}
            </div>
            {MultiSig.participants.map((signer) => {
              return (
                <>
                  <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
                    <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                      {signer.alias}
                    </div>
                    {this.fractionallyWeighted && <div class="uneditable-value">{signer.weight}</div>}
                  </div>
                </>
              );
            })}
            {vnode.attrs.parent.requireDelegator && (
              <>
                <div class="flex flex-justfiy-between" style={{ margin: '0 0 4rem 0' }}>
                  <div class="flex flex-column">
                    <p class="p-tag-bold">Delegator AID</p>
                    <div class="uneditable-value">{this.delegator.id}</div>
                  </div>
                  <div class="flex flex-column">
                    <p class="p-tag-bold">Delegator Alias</p>
                    <div class="uneditable-value">{this.delegator.alias}</div>
                  </div>
                </div>
              </>
            )}
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-group-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Complete"
                onclick={() => {
                  this.initiateGroupInception();
                  vnode.attrs.parent.currentState = 'setup-complete';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'setup-complete' && (
          <EventDetails
            groupAlias={this.groupAlias}
            status={this.status}
            back={() => {
              vnode.attrs.parent.currentState = 'event-log';
            }}
            continue={vnode.attrs.end}
          />
        )}
      </>
    );
  }
}

class EventDetails {
  constructor(vnode) {
    /*
     *
     * We have the AIDS.  Use them to get the KELs and to determine
     * the order of the signatures so we can match up with Signatures.
     *
     * */
  }

  view(vnode) {
    return (
      <>
        <h3>{vnode.attrs.groupAlias} Inception:</h3>
        <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
          Status: {vnode.attrs.status}
        </h4>

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ margin: '2rem 0 1rem 4.5rem' }}>
            Name:
          </p>
          <p class="p-tag" style={{ margin: '2rem 1rem 1rem 0' }}>
            Signed?
          </p>
        </div>
        <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 1rem 0' }}>
          {MultiSig.participants.map((sig, i) => {
            return (
              <div
                class="flex flex-justify-evenly "
                style={{ alignItems: 'center', margin: '0 0 1rem 0', width: '100%' }}
              >
                <h4 class="p-tag" style={{ margin: '0 0 0 0' }}>
                  {`#${i + 1}`}
                </h4>
                <div
                  class="flex flex-align-center"
                  style={{ width: '55%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
                >
                  <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                    {sig.alias}
                  </p>
                </div>

                <div style={{ margin: '0 0 0 .5rem' }}>
                  {sig.signed ? (
                    <img src={greenCheckMark} style={{ width: '80%' }} />
                  ) : (
                    <img src={redX} style={{ width: '80%' }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

module.exports = ConfigureMultiSigGroupTask;
