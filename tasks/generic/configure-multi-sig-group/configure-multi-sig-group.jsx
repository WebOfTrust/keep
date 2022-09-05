import m from 'mithril';
import { Button, Checkbox, IconButton, Radio, Select, TextField, TextTooltip, AID, AIDField } from '../../../src/app/components';
import { Contacts, KERI, MultiSig, Profile, Witnesses } from '../../../src/app/services';

import AddSignerModal from './add-signer-modal';

import secureMessaging from '../../../src/assets/img/secure-messaging.svg';
import greenCheckMark from '../../../src/assets/img/green-check-mark.svg';
import redX from '../../../src/assets/img/red-x.svg';
import configureIdentifier from "../../../src/assets/img/configure-identifier.svg";

class ConfigureMultiSigGroupTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    Contacts.requestList();
    this._component = {
      view: (vnode) => {
        return <ConfigureMultiSigGroup end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'create-multisig-alias';
    this.requiredDelegator = this.config.requiredDelegator;
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
    this.sufficient = false;
    this.fractionallyWeighted = true;
    this.useAsDefault = false;
    this.addSignerOpen = false;
    this.addSignerIdx = 0;
    if (MultiSig.participants === undefined) {
      MultiSig.participants = [];
    }
    this.minParticipants = MultiSig.participants.length;
    this.numSigners = this.minParticipants + 1;

    if (vnode.attrs.parent.requireDelegator) {
      MultiSig.delegator = null;
    }
    this.loadDelegator(vnode.attrs.parent.requiredDelegator);
    this.default = Profile.getDefaultAID();
    this.weight = '1/2';
    this.showAdvancedOptions = false;
    this.pool = '';
    this.wits = []
    this.witThold = 1;
    this.estOnly = false;
  }

  oninit(vnode) {
    vnode.attrs.parent.currentState = 'create-multisig-alias';
  }

  get validSigners() {
    return MultiSig.participants.every((signer) => {
      return (signer.id !== '' && signer.id !== undefined && signer.id !== null) &&
        (!this.fractionallyWeighted || this.validFraction(signer.weight))
    })
  }

  validFraction(s) {
    let p = s.split('/')
    if (p.length !== 2) {
      return false
    }

    let num = parseInt(p[0]);
    let dem = parseInt(p[1]);

    return !isNaN(num) && !isNaN(dem) && 0 < num < dem && dem > 0;
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
    let task = this;
    new Promise(function (resolve, reject) {
      setTimeout(function waitForSignatures() {
        KERI.getEvent(MultiSig.currentEvent['i'], MultiSig.currentEvent['d'])
          .then((event) => {
            let sigs = event['signatures'];
            sigs.forEach((sig) => {
              let idx = sig.index;
              MultiSig.participants[idx].signed = true;
            });

            if (event["stored"] === true) {
              if(MultiSig.delegator === null || MultiSig.delegator === undefined) {
                task.status = 'Inception complete';
              } else {
                if(!task.sufficient) {
                  task.status = 'Sufficient signatures received';
                  task.sufficient = true;
                }
              }

              let unsigned = MultiSig.participants.find((part) => {return !part.signed})
              if (unsigned === undefined) {
                if (this.useAsDefault === true) {
                  Profile.loadIdentifiers()
                    .then((ids) => {
                      let aid = ids.find(id => {
                        return id.alias === task.groupAlias;
                      })
                      Profile.setDefaultAID(aid).then(() => {
                        m.redraw()
                      })
                    })
                } else {
                  m.redraw()
                }
                return
              }
            } else {
              task.status = 'Waiting for sufficient signatures...';
            }
            m.redraw();
            setTimeout(waitForSignatures, 3000);
          })
          .catch((err) => {
            console.log('getContacts', err);
          });
      }, 3000);
    });

    new Promise(function (resolve, reject) {
      let task = this;
      setTimeout(function waitForDelegation() {
        if (MultiSig.delegator === null || MultiSig.delegatorSigned) {
          return;
        }

        KERI.listIdentifiers().then((identifiers) => {
          let icp = identifiers.find((e) => e.prefix === MultiSig.currentEvent['i']);
          if (icp.delegated && icp.anchored) {
            MultiSig.delegatorSigned = true;
          }
          if (icp.group.accepted) {
            this.status = 'Inception Complete';
          } else {
            this.status = 'Failed: Event Timeout';
          }
          m.redraw();
          setTimeout(waitForDelegation, 3050);
        });
      }, 3050);
    });

  }

  initiateGroupInception() {
    let aids = MultiSig.participants.map((obj) => {
      return obj.id;
    });
    let inceptData = {
      aids: [this.default.prefix, ...aids],
      toad: this.witThold,
      wits: this.wits,
      estOnly: this.estOnly,
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
        {vnode.attrs.parent.currentState === 'create-multisig-alias' && (
          <>
            <h3>Create Your Alias and Configure Your AID</h3>
            <img src={configureIdentifier} style={{display: 'block', margin: '4rem auto 0', width: '172px'}}/>
            <p class="p-tag" style={{marginTop: '2rem', marginBottom: '2rem'}}>
              The alias should be an easy to remember name for your AID.
              <br/>
              <br/>
            </p>
            <p className="p-tag-bold">What would you like your alias to be?</p>
            <TextField
              id="alias"
              outlined
              fluid
              style={{margin: '0 0 0 0'}}
              oninput={(e) => {
                this.groupAlias = e.target.value;
              }}
              value={this.groupAlias}
            />
            <p className="p-tag-bold">Select your witness pool:</p>
            <Select
              outlined
              fluid
              value={this.pool}
              style={{margin: '0 0 1.5rem 0'}}
              options={Witnesses.witnessPools}
              onchange={(pool) => {
                this.pool = pool;
                this.wits = Witnesses.witnesses[this.pool];
                this.witThold = KERI.recommendedThold(this.wits.length)
              }}
            />
            { this.wits.length > 0 && <p className="p-tag-italic" style={{margin: '-0.5rem 0 0.25rem 1.5rem'}}>{this.wits.length} Witnesses in Pool</p> }

            <p className="p-tag-bold">How many other participants will be in the group:</p>
            <TextField
              outlined
              type="number"
              min={this.minParticipants}
              style={{marginBottom: '2rem', width: '5rem'}}
              value={MultiSig.participants.length}
              oninput={(e) => {
                 let num = parseInt(e.target.value);
                 MultiSig.updateParticipantLength(num)
              }}
            />

            <div className="flex flex-justify-start" style={{margin: '0 0 0 -0.75rem'}}>
              <Checkbox
                outlined
                fluid
                disabled={(Profile.identifiers === undefined || Profile.identifiers.length === 0)}
                checked={this.useAsDefault}
                style={{margin: '0 0 3.5rem 0'}}
                onclick={() => {
                  this.useAsDefault = !this.useAsDefault;
                }}
              />
              <p className="p-tag-bold">Set new AID as Keep Default?</p>
            </div>
            <div className="flex flex-justify-between" style={{margin: '0 0 0 0'}}>
              <p className="p-tag-bold">Advanced Options: </p>
              <span className="material-icons-outlined md-24 p-tag-bold"
                    style={{cursor: 'pointer', marginTop: '0.5rem'}}
                    onclick={() => {
                      this.showAdvancedOptions = !this.showAdvancedOptions;
                    }}>{this.showAdvancedOptions ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down'}</span>
            </div>
            {this.showAdvancedOptions && <div style={{marginTop: '1.5rem'}}>
              <div className="flex flex-justify-between" style={{margin: '0'}}>
                <p class="p-tag">Witness Threshold:</p>
                <TextField
                  outlined
                  type="number"
                  min={KERI.recommendedThold(this.wits.length)}
                  max={this.wits.length}
                  style={{ marginBottom: '2rem', width: '5rem' }}
                  value={this.witThold}
                  oninput={(e) => {
                    this.witThold = parseInt(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-justify-between" style={{margin: '0'}}>
                <p class="p-tag">Establishment Only:</p>
                <div className="flex flex-justify-end">
                  <div className="flex flex-align-center" style={{marginRight: '2rem'}}>
                    <Radio
                      id="weighted-yes"
                      name="weighted"
                      checked={this.estOnly}
                      onclick={() => {
                        this.estOnly = true;
                      }}
                    />
                    <label className="font-weight--bold font-color--battleship" htmlFor="weighted-yes">
                      Yes
                    </label>
                  </div>
                  <div className="flex flex-align-center">
                    <Radio
                      id="weighted-no"
                      name="weighted"
                      checked={!this.estOnly}
                      onclick={() => {
                        this.estOnly = false;
                      }}
                    />
                    <label className="font-weight--bold font-color--battleship" htmlFor="weighted-no">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex margin-v-1" style={{marginLeft: '-0.75rem'}}>
                <Checkbox checked={true} disabled={true}/>
                <label className="font-weight--medium font-color--battleship" style={{marginTop: '1rem'}}>
                  Allow this Identifier to issue credentials
                </label>
              </div>
            </div>}

            <div class="flex flex-justify-end" style={{marginTop: '2.75rem'}}>
              <Button
                id="continue"
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={this.wits.length === 0 || this.groupAlias.length === 0}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'configure-multisig-participants';
                }}
              />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'configure-multisig-participants' && (
          <>
            <h3 style={{ marginBottom: '2rem' }}>Configure Participants for Multi-Sig Group</h3>
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
            {!this.fractionallyWeighted && (
              <>
                <label>
                  <p class="p-tag-bold">How many signers are required to sign?</p>
                </label>
                <TextField
                  outlined
                  type="number"
                  min={1}
                  max={MultiSig.participants.length+1}
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
              <div class="flex-1"/>
              {this.fractionallyWeighted && <b class="font-color--battleship">Weight</b>}
              <div style={{ width: '48px', height: '48px', marginLeft: '1rem' }}/>
            </div>
            <div style={{ marginBottom: '1rem'}}>
              <div class="flex flex-align-center flex-justify-between margin-v-1">
                <AIDField aid={this.default}/>
                <div class="flex-1"/>
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
                <div style={{ height: '48px', marginLeft: '2.2rem'}}/>
                <span className="p-tag-bold" style={{fontSize: '1rem'}}>You</span>
              </div>
              <AddSignerModal
                isOpen={this.addSignerOpen}
                onClose={() => {
                  this.addSignerOpen = false;
                }}
                onSave={(contact) => {
                  MultiSig.participants[this.addSignerIdx] = {
                    id: contact.id,
                    alias: contact.alias,
                    contact: contact,
                    weight: '',
                    signed: false,
                  };
                  this.addSignerOpen = false;
                }}
              />
              {MultiSig.participants.map((signer, index) => {
                return (
                  <div class="flex flex-align-center flex-justify-between margin-v-1">
                    <AIDField contact={signer.contact} onclick={() => {
                      this.addSignerIdx = index;
                      this.addSignerOpen = true;
                    }}/>
                    <div class="flex-1"/>
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
            <div class="flex flex-justify-between margin-top-4">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-multisig-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={
                  !this.validSigners
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
            <div class="uneditable-value">{Witnesses.witnessPools.find((p) => p.value === this.pool).label}</div>
            {!this.fractionallyWeighted && <div><p class="font-weight--bold font-color--battleship">Number of Required Signers:</p>
              <div class="uneditable-value">{this.numSigners}</div></div>}
            <p class="font-color--battleship margin-v-2">Review signers to make sure the list is complete.</p>
            <p class="font-weight--bold font-color--battleship">Signers (in order):</p>
            <div class="flex flex-align-center flex-justify-between margin-v-1">
              <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                <AID aid={this.default}/>
              </div>
              {this.fractionallyWeighted && <div class="uneditable-value">{this.weight}</div>}
            </div>
            {MultiSig.participants.map((signer) => {
              return (
                <>
                  <div class="flex flex-align-center flex-justify-between margin-v-1">
                    <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                      <AID contact={signer.contact}/>
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
            <p className="font-color--battleship margin-v-2">Advanced Options.</p>
            <p className="font-weight--bold font-color--battleship">Witness Threshold:</p>
            <div className="uneditable-value">{this.witThold}</div>
            <p className="font-weight--bold font-color--battleship">Establishment Only:</p>
            <div className="uneditable-value">{this.estOnly ? 'Yes' : 'No'}</div>
            <p className="font-weight--bold font-color--battleship">Issue Credentials:</p>
            <div className="uneditable-value">Yes</div>

            <div class="flex flex-justify-between margin-top-4">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  if (vnode.attrs.parent.requireDelegator) {
                    vnode.attrs.parent.currentState = 'select-delegator';
                  } else {
                    vnode.attrs.parent.currentState = 'configure-multisig-participants';
                  }
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
        <div class="flex flex-justify-start flex-al">
          <h4 class="p-tag margin-clear">Status:</h4>
          <h4 style={{color: "#000", marginLeft: "0.5rem", lineHeight: 1.38}}>{vnode.attrs.status}</h4>
        </div>

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
        <div class="flex flex-justify-end margin-top-4">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

module.exports = ConfigureMultiSigGroupTask;
