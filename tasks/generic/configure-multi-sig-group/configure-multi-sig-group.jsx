import m from 'mithril';
import { Button, Checkbox, IconButton, Radio, Select, TextField, TextTooltip, AID, AIDField } from '../../../src/app/components';
import {Contacts, KERI, MultiSig, Participants, Profile, Witnesses} from '../../../src/app/services';

import AddSignerModal from './add-signer-modal';
import EventDetails from '../multisig-event-details/multisig-event-details'

import secureMessaging from '../../../src/assets/img/secure-messaging.svg';
import configureIdentifier from "../../../src/assets/img/configure-identifier.svg";

class ConfigureMultiSigGroupTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this.establishable = "establishable" in this.config ? this.config.establishable : true;
    this.delegatable = "delegatable" in this.config ? this.config.delegatable : true;
    this.DnD = "DnD" in this.config ? this.config.DnD : false;
    this.estOnly = "estOnly" in this.config ? this.config.estOnly : false;
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
    this.fractionallyWeighted = true;
    this.useAsDefault = true;
    this.addSignerOpen = false;
    this.addSignerIdx = 0;
    if (MultiSig.participants === undefined) {
      MultiSig.participants = [];
    }

    if (Participants.instance !== undefined) {
      Participants.instance.oobis.forEach((oobi) => {
        MultiSig.participants.push({
          id: oobi.id,
          alias: oobi.alias,
          contact: oobi.contact,
          weight: '',
          signed: false,
        })
      })
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
    this.estOnly = vnode.attrs.parent.estOnly;
    this.DnD = vnode.attrs.parent.DnD;
  }

  get validSigners() {
    return MultiSig.participants.every((signer) => {
      return (signer.id !== '' && signer.id !== undefined && signer.id !== null) &&
        (!this.fractionallyWeighted || this.validThreshold(signer.weight))
    })
  }

  validThreshold(s) {
    if (s === "") {
      return false;
    }

    let t = Number(s)
    if (!isNaN(t)) {
      return true
    }

    let p = s.split('/')
    if (p.length !== 2) {
      return false
    }

    let num = Number(p[0]);
    let dem = Number(p[1]);

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

  initiateGroupInception() {
    let aids = MultiSig.participants.map((obj) => {
      return obj.id;
    });
    let inceptData = {
      aids: [this.default.prefix, ...aids],
      toad: this.witThold,
      wits: this.wits,
      estOnly: this.estOnly,
      DnD: this.DnD,
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
      })
      .catch((err) => {
        this.status = 'Failed: ' + err.response.msg;
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
            <h3>Create Your Alias and Configure Your Multi-Sig Group</h3>
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
                      disabled={!vnode.attrs.parent.establishable}
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
                      disabled={!vnode.attrs.parent.establishable}
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
              <div className="flex flex-justify-between" style={{margin: '0'}}>
                <p className="p-tag">Allow this identifier to delegate?</p>
                <div className="flex flex-justify-end">
                  <div className="flex flex-align-center" style={{marginRight: '2rem'}}>
                    <Radio
                      id="dnd-yes"
                      name="dnd"
                      disabled={!vnode.attrs.parent.delegatable}
                      checked={!this.DnD}
                      onclick={() => {
                        this.DnD = false;
                      }}
                    />
                    <label className="font-weight--bold font-color--battleship" htmlFor="weighted-yes">
                      Yes
                    </label>
                  </div>
                  <div className="flex flex-align-center">
                    <Radio
                      id="dnd-no"
                      name="dnd"
                      disabled={!vnode.attrs.parent.delegatable}
                      checked={this.DnD}
                      onclick={() => {
                        this.DnD = true;
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
                disabled={this.wits.length === 0 || this.groupAlias.length === 0 || MultiSig.participants.length === 0}
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
            <p className="font-weight--bold font-color--battleship">Allow Delegation:</p>
            <div className="uneditable-value">{this.DnD ? 'No' : 'Yes'}</div>
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
            default={this.default}
            fractionallyWeighted={this.fractionallyWeighted}
            status={this.status}
            back={() => {
              MultiSig.participants.shift();
              if (vnode.attrs.parent.requireDelegator) {
                vnode.attrs.parent.currentState = 'select-delegator';
              } else {
                vnode.attrs.parent.currentState = 'configure-multisig-participants';
              }
            }}
            finish={() => {
              Profile.loadIdentifiers()
                .then((ids) => {
                  if (this.useAsDefault === true) {
                    let aid = ids.find(id => {
                      return id.name === this.groupAlias;
                    })
                    Profile.setDefaultAID(aid).then(() => {
                      m.redraw()
                    })
                  } else {
                    m.redraw()
                  }
                })
            }}
            continue={vnode.attrs.end}
          />
        )}
      </>
    );
  }
}

module.exports = ConfigureMultiSigGroupTask;
