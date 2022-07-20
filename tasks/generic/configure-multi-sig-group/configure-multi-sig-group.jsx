import m from 'mithril';
import { Button, Checkbox, IconButton, Radio, Select, TextField, TextTooltip } from '../../../src/app/components';
import { Contacts, KERI, MultiSig, Profile, Witnesses } from '../../../src/app/services';

import AddSignerModal from './add-signer-modal';

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
    this.requiredDelegator = config.requiredDelegator;
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

  get requireDelegator() {
    return this.requiredDelegator !== undefined;
  }
}

class ConfigureMultiSigGroup {
  constructor(vnode) {
    this.groupAlias = '';
    this.status = '';
    this.fractionallyWeighted = false;
    this.numSigners = 0; // Used only if fractionallyWeighted is false
    this.wits = Witnesses.witnessPools[0].wits;
    this.addSignerOpen = false;
    MultiSig.participants = [];

    if (vnode.attrs.parent.requireDelegator) {
      MultiSig.delegator = null;
    }
    this.loadDelegator(vnode.attrs.parent.requiredDelegator);
    this.default = Profile.getDefaultAID();
    this.weight = '1/2';
  }

  oninit(vnode) {
    vnode.attrs.parent.currentState = 'configure-multi-sig-index';
  }

  loadDelegator(requiredDelegator) {
    Contacts.requestList().then((e) => {
      Contacts.list.forEach((contact) => {
        if (contact.alias === requiredDelegator) {
          MultiSig.delegator = contact;
        }
      });
    });
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
              console.log('marked all signers, waiting for delegation...');
              KERI.listIdentifiers().then((identifiers) => {
                console.log(identifiers);
                console.log(MultiSig.currentEvent['i']);
                let icp = identifiers.find((e) => e.prefix === MultiSig.currentEvent['i']);
                console.log('we found icp', icp);
                if (icp.delegated && icp.anchored) {
                  MultiSig.delegatorSigned = true;
                }
                if (icp.group.accepted) {
                  this.status = 'Inception Complete';
                } else {
                  this.status = 'Failed: Event Timeout';
                }
                m.redraw();
              });
              if (MultiSig.delegator === null || MultiSig.delegatorSigned) {
                return;
              }
            }
            setTimeout(waitForSignatures, 2000);
          })
          .catch((err) => {
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
    if (MultiSig.delegator) {
      inceptData.delpre = MultiSig.delegator.id;
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
        {vnode.attrs.parent.requireDelegator && MultiSig.delegator === null && (
          <>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 1rem 0' }} />
            <h3>Required Delegator {vnode.attrs.parent.requiredDelegator} missing.</h3>
            <p class="p-tag margin-v-2">
              You can not begin this process until the AID for {vnode.attrs.parent.requiredDelegator} has been created.
              Please click "Retry" to try again.
            </p>
            <div class="flex flex-justify-end">
              <Button
                class="button--big button--no-transform"
                raised
                label="Retry"
                onclick={() => {
                  this.loadDelegator(vnode.attrs.parent.requiredDelegator);
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'configure-multi-sig-index' && (
          <>
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 1rem 0' }} />
            <h3>Configure Multi-Sig Group</h3>
            <p class="p-tag margin-v-2">
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
            <p class="p-tag margin-v-2">The alias should be an easy to remember name for your multi-sig group.</p>
            <p class="p-tag margin-v-2">What would you like your group's alias to be?</p>
            <TextField
              outlined
              fluid
              value={this.groupAlias}
              oninput={(e) => {
                this.groupAlias = e.target.value;
              }}
            />
            <div class="flex flex-justify-between margin-top-4">
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
            <div class="flex margin-v-1">
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
              <div class="flex flex-align-center flex-justify-between margin-v-1">
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
              <AddSignerModal
                isOpen={this.addSignerOpen}
                onClose={() => {
                  this.addSignerOpen = false;
                }}
                onSave={(contact) => {
                  MultiSig.participants.push({
                    id: contact.id,
                    alias: contact.alias,
                    weight: '',
                    signed: false,
                  });
                  this.addSignerOpen = false;
                }}
              />
              {MultiSig.participants.map((signer, index) => {
                return (
                  <div class="flex flex-align-center flex-justify-between margin-v-1">
                    <p class="font-color--battleship">
                      <b>{signer.alias}</b>
                    </p>
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
                        MultiSig.participants.splice(index, 1);
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
                this.addSignerOpen = true;
              }}
            />
            <div class="flex flex-justify-between margin-top-4">
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
            <img src={secureMessaging} style={{ marginBottom: '1rem', width: '268px' }} />
            <h3>Confirm Delegator</h3>
            <p class="p-tag margin-v-2">These details should be cross referenced with other well known sources.</p>

            <p class="p-tag-bold">Delegator Alias:</p>
            <div class="uneditable-value">{MultiSig.delegator.alias}</div>
            <p class="p-tag-bold">Delegator AID:</p>
            <div class="uneditable-value">
              <code>{MultiSig.delegator.id}</code>
            </div>

            <p class="p-tag">
              See the Ecosystem Governance Framework for a full listing of available well known sources.
            </p>
            <div class="flex flex-justify-between margin-top-4">
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
                disabled={!MultiSig.delegator}
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
            <p class="font-weight--bold font-color--battleship">Group Alias:</p>
            <div class="uneditable-value">{this.groupAlias}</div>
            <p class="font-weight--bold font-color--battleship">Witness Pool:</p>
            <div class="uneditable-value">{Witnesses.witnessPools.find((p) => p.value === this.wits).label}</div>
            <p class="font-color--battleship margin-v-2">Review signers to make sure the list is complete.</p>
            <p class="font-weight--bold font-color--battleship">Signers (in order):</p>
            <div class="flex flex-align-center flex-justify-between margin-v-1">
              <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                {this.default.name}
              </div>
              {this.fractionallyWeighted && <div class="uneditable-value">{this.weight}</div>}
            </div>
            {MultiSig.participants.map((signer) => {
              let alias = signer.alias;
              if (signer.prefix === this.default.prefix) {
                alias = signer.alias + ' (Your AID)';
              }
              return (
                <>
                  <div class="flex flex-align-center flex-justify-between margin-v-1">
                    <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                      {alias}
                    </div>
                    {this.fractionallyWeighted && <div class="uneditable-value">{signer.weight}</div>}
                  </div>
                </>
              );
            })}
            {vnode.attrs.parent.requireDelegator && (
              <>
                <p class="font-weight--bold font-color--battleship">Delegator:</p>
                <div class="flex flex-align-center flex-justify-between" style={{ margin: '0 0 4rem 0' }}>
                  <div class="flex-1 uneditable-value">{MultiSig.delegator.alias}</div>
                </div>
              </>
            )}
            <div class="flex flex-justify-between margin-top-4">
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
            parent={vnode.attrs.parent}
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
        <h4 class="p-tag margin-clear">Status: {vnode.attrs.status}</h4>

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ margin: '2rem 0 1rem 4.5rem' }}>
            Name:
          </p>
          <p class="p-tag" style={{ margin: '2rem 1rem 1rem 0' }}>
            Signed?
          </p>
        </div>
        <div style={{ maxHeight: '350px', overflowY: 'scroll', margin: '0 0 1rem 0' }}>
          {MultiSig.participants.map((sig, i) => {
            return (
              <div
                class="flex flex-justify-evenly flex-justify-center "
                style={{ margin: '0 0 1rem 0', width: '100%' }}
              >
                <h4 class="p-tag margin-clear">{`#${i + 1}`}</h4>
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
        {vnode.attrs.parent.requireDelegator && (
          <>
            <h3>Delegation Approval:</h3>
            <div
              class="flex flex-justify-evenly "
              style={{ alignItems: 'center', margin: '0 0 1rem 0', width: '100%' }}
            >
              <div
                class="flex flex-align-center"
                style={{ width: '55%', backgroundColor: 'white', height: '40px', borderRadius: '3px' }}
              >
                <p class="p-tag-bold" style={{ margin: '0 0 0 .5rem', fontSize: '80%' }}>
                  {MultiSig.delegator.alias}
                </p>
              </div>
              <div style={{ margin: '0 0 0 .5rem' }}>
                {MultiSig.delegatorSigned ? (
                  <img src={greenCheckMark} style={{ width: '80%' }} />
                ) : (
                  <img src={redX} style={{ width: '80%' }} />
                )}
              </div>
            </div>
          </>
        )}
        <div class="flex flex-justify-between margin-top-4">
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
