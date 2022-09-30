import m from 'mithril';
import {
  Button,
  Checkbox,
  Counter,
  IconButton,
  Radio,
  Select,
  TextField,
  TextTooltip,
  AID,
  AIDField,
} from '../../../src/app/components';
import { Contacts, KERI, MultiSig, Participants, Profile, Witnesses } from '../../../src/app/services';

import AddSignerModal from './add-signer-modal';
import EventDetails from '../multisig-event-details/multisig-event-details';

import secureMessaging from '../../../src/assets/img/secure-messaging.svg';
import configureIdentifier from '../../../src/assets/img/configure-identifier.svg';

class ConfigureMultiSigGroupTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this.establishable = 'establishable' in this.config ? this.config.establishable : true;
    this.delegatable = 'delegatable' in this.config ? this.config.delegatable : true;
    this.DnD = 'DnD' in this.config ? this.config.DnD : false;
    this.estOnly = 'estOnly' in this.config ? this.config.estOnly : false;
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
    MultiSig.fractionallyWeighted = true;
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
        });
      });
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
    this.wits = [];
    this.witThold = 1;
    this.estOnly = vnode.attrs.parent.estOnly;
    this.DnD = vnode.attrs.parent.DnD;
  }

  get validSigners() {
    return MultiSig.participants.every((signer) => {
      return (
        signer.id !== '' &&
        signer.id !== undefined &&
        signer.id !== null &&
        (!MultiSig.fractionallyWeighted || MultiSig.validThreshold(signer.weight))
      );
    });
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
    if (!MultiSig.fractionallyWeighted) {
      let sith = this.numSigners.toString();
      inceptData.isith = sith;
      inceptData.nsith = sith;
    } else {
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
            <img class="task-img task-img--center" src={secureMessaging} />
            <h3>Required Delegator {vnode.attrs.parent.requiredDelegator} missing.</h3>
            <p class="p-tag">
              You can not begin this process until the AID for {vnode.attrs.parent.requiredDelegator} has been created.
              Please click "Retry" to try again.
            </p>
            <div class="task-actions">
              <Button
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
            <img class="task-img task-img--center" src={configureIdentifier} />
            <p class="p-tag">The alias should be an easy to remember name for your AID.</p>
            <div class="task-form-group">
              <label class="task-form-label" for="alias">
                What would you like your alias to be?
              </label>
              <TextField
                id="alias"
                outlined
                fluid
                style={{ margin: '0 0 0 0' }}
                oninput={(e) => {
                  this.groupAlias = e.target.value;
                }}
                value={this.groupAlias}
              />
            </div>
            <div class="task-form-group">
              <label class="task-form-label" for="pool">
                Select Your Witness Pool:
              </label>
              <Select
                id="pool"
                outlined
                fluid
                value={this.pool}
                options={Witnesses.witnessPools}
                onchange={(pool) => {
                  this.pool = pool;
                  this.wits = Witnesses.witnesses[this.pool];
                  this.witThold = KERI.recommendedThold(this.wits.length);
                }}
              />
            </div>

            {this.wits.length > 0 && (
              <p class="p-tag-italic" style={{ margin: '0.5rem 0 0 1.5rem' }}>
                {this.wits.length} Witnesses in Pool
              </p>
            )}

            <div class="task-form-group">
              <label class="task-form-label">How many other participants will be in the group:</label>
              <Counter
                min={this.minParticipants}
                value={MultiSig.participants.length}
                onchange={(value) => {
                  MultiSig.updateParticipantLength(value);
                }}
              />
            </div>
            <div class="task-form-checkbox-container">
              <Checkbox
                id="default"
                outlined
                fluid
                disabled={Profile.identifiers === undefined || Profile.identifiers.length === 0}
                checked={this.useAsDefault}
                onclick={() => {
                  this.useAsDefault = !this.useAsDefault;
                }}
              />
              <label class="task-form-label" for="default">
                Set new AID as Keep Default?
              </label>
            </div>
            <div
              class="task-form-more"
              onclick={() => {
                this.showAdvancedOptions = !this.showAdvancedOptions;
              }}
            >
              <label class="task-form-more-label">Advanced Options:</label>
              <IconButton icon={this.showAdvancedOptions ? 'expand_less' : 'expand_more'} />
            </div>
            {this.showAdvancedOptions && (
              <>
                <div class="task-form-group task-form-group--between">
                  <label class="task-form-label">Witness Threshold:</label>
                  <Counter
                    value={this.witThold}
                    disabled={!this.pool}
                    min={KERI.recommendedThold(this.wits.length)}
                    max={this.wits.length}
                    onchange={(value) => {
                      this.witThold = value;
                    }}
                  />
                </div>

                <div class="task-form-group task-form-group--between">
                  <label class="task-form-label">Establishment Only:</label>
                  <div class="task-form-radio-group">
                    <Radio
                      id="weighted-yes"
                      name="weighted"
                      disabled={!vnode.attrs.parent.establishable}
                      checked={this.estOnly}
                      onclick={() => {
                        this.estOnly = true;
                      }}
                    />
                    <label class="task-form-label" for="weighted-yes">
                      Yes
                    </label>
                    <Radio
                      id="weighted-no"
                      name="weighted"
                      disabled={!vnode.attrs.parent.establishable}
                      checked={!this.estOnly}
                      onclick={() => {
                        this.estOnly = false;
                      }}
                    />
                    <label class="task-form-label" for="weighted-no">
                      No
                    </label>
                  </div>
                </div>
                <div class="task-form-group task-form-group--between">
                  <label class="task-form-label">Allow this identifier to delegate?</label>
                  <div class="task-form-radio-group">
                    <Radio
                      id="dnd-yes"
                      name="dnd"
                      disabled={!vnode.attrs.parent.delegatable}
                      checked={!this.DnD}
                      onclick={() => {
                        this.DnD = false;
                      }}
                    />
                    <label class="task-form-label" for="dnd-yes">
                      Yes
                    </label>
                    <Radio
                      id="dnd-no"
                      name="dnd"
                      disabled={!vnode.attrs.parent.delegatable}
                      checked={this.DnD}
                      onclick={() => {
                        this.DnD = true;
                      }}
                    />
                    <label class="task-form-label" for="dnd-no">
                      No
                    </label>
                  </div>
                </div>
                <div class="task-form-checkbox-container">
                  <Checkbox id="issue-credentials" checked={true} disabled={true} />
                  <label for="issue-credentials" class="task-form-label">
                    Allow this Identifier to issue credentials
                  </label>
                </div>
              </>
            )}
            <div class="task-actions">
              <Button
                id="continue"
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
            <h3>Configure Participants for Multi-Sig Group</h3>
            <div class="task-form-group">
              <label class="task-form-label">Are your signatures fractionally weighted?</label>
              <p class="p-tag">ex. Each signer equals 1/3 of the group.</p>
              <div class="task-form-radio-group">
                <Radio
                  id="weighted-yes"
                  name="weighted"
                  checked={MultiSig.fractionallyWeighted}
                  onclick={() => {
                    MultiSig.fractionallyWeighted = true;
                  }}
                />
                <label class="task-form-label" for="weighted-yes">
                  Yes
                </label>
                <Radio
                  id="weighted-no"
                  name="weighted"
                  checked={!MultiSig.fractionallyWeighted}
                  onclick={() => {
                    MultiSig.fractionallyWeighted = false;
                  }}
                />
                <label class="task-form-label" for="weighted-no">
                  No
                </label>
              </div>
            </div>
            {!MultiSig.fractionallyWeighted && (
              <>
                <div class="task-form-group">
                  <label class="task-form-label">How many signers are required to sign?</label>
                  <Counter
                    min={1}
                    max={MultiSig.participants.length + 1}
                    value={this.numSigners}
                    onchange={(value) => {
                      this.numSigners = value;
                    }}
                  />
                </div>
              </>
            )}
            <div class="flex flex-align-center flex-justify-between">
              <label class="task-form-label">
                Enter Signers{' '}
                <TextTooltip label={<u>(in order):</u>}>
                  Order must be consistent (same exact list everytime). If fractionally weighted it should be highest to
                  lowest weight.
                </TextTooltip>
              </label>
              <div class="flex-1" />
              {MultiSig.fractionallyWeighted && <b class="task-form-label">Weight</b>}
              <div style={{ width: '56px', marginLeft: '1rem' }} />
            </div>
            <div class="flex flex-align-center flex-justify-between margin-v-1">
              <AIDField aid={this.default} />
              <div class="flex-1" />
              {MultiSig.fractionallyWeighted && (
                <TextField
                  outlined
                  style={{ marginLeft: '1rem', width: '75px' }}
                  placeholder="1/3"
                  value={this.weight}
                  oninput={(e) => {
                    this.weight = e.target.value;
                  }}
                />
              )}
              <span
                class="p-tag-bold"
                style={{
                  textAlign: 'center',
                  marginLeft: '1rem',
                  minWidth: '48px',
                }}
              >
                You
              </span>
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
                  <AIDField
                    contact={signer.contact}
                    onclick={() => {
                      this.addSignerIdx = index;
                      this.addSignerOpen = true;
                    }}
                  />
                  <div class="flex-1" />
                  {MultiSig.fractionallyWeighted && (
                    <TextField
                      outlined
                      style={{ marginLeft: '1rem', width: '75px' }}
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
            <div class="task-actions">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-multisig-alias';
                }}
              />
              <Button
                raised
                label="Continue"
                disabled={!this.validSigners}
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
            <p class="p-tag">These details should be cross referenced with other well known sources.</p>
            <div class="task-form-group">
              <label class="task-form-label">Delegator Alias:</label>
              <div class="uneditable-value">{MultiSig.delegator?.alias}</div>
            </div>
            <div class="task-form-group">
              <p class="task-form-label">Delegator AID:</p>
              <div class="uneditable-value">
                <code>{MultiSig.delegator?.id}</code>
              </div>
            </div>
            <p class="p-tag">
              See the Ecosystem Governance Framework for a full listing of available well known sources.
            </p>
            <div class="task-actions">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'configure-multisig-group';
                }}
              />
              <Button
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
            <h3>Review and Confirm</h3>
            <div class="task-form-group">
              <label class="task-form-label">Group Alias:</label>
              <div class="uneditable-value">{this.groupAlias}</div>
            </div>
            <div class="task-form-group">
              <label class="task-form-label">Witness Pool:</label>
              <div class="uneditable-value">{Witnesses.witnessPools.find((p) => p.value === this.pool)?.label}</div>
            </div>
            {/* {!MultiSig.fractionallyWeighted && ( */}
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Number of Required Signers:</label>
              <div class="uneditable-value" style={{ width: '75px' }}>
                {this.numSigners}
              </div>
            </div>
            {/* )} */}
            <p class="p-tag">Review signers to make sure the list is complete.</p>
            <label class="task-form-label">Signers (in order):</label>
            <div class="flex flex-align-center flex-justify-between margin-v-1">
              <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                <AID aid={this.default} />
              </div>
              {MultiSig.fractionallyWeighted && (
                <div class="uneditable-value" style={{ width: '75px' }}>
                  {this.weight}
                </div>
              )}
            </div>
            {MultiSig.participants.map((signer) => {
              return (
                <>
                  <div class="flex flex-align-center flex-justify-between margin-v-1">
                    <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                      <AID contact={signer.contact} />
                    </div>
                    {MultiSig.fractionallyWeighted && (
                      <div class="uneditable-value" style={{ width: '75px' }}>
                        {signer.weight}
                      </div>
                    )}
                  </div>
                </>
              );
            })}
            {vnode.attrs.parent.requireDelegator && (
              <div class="task-form-group">
                <label class="task-form-label">Delegator:</label>
                <div class="uneditable-value">
                  <AID contact={MultiSig.delegator} />
                </div>
              </div>
            )}
            <label class="task-form-more-label margin-v-2">Advanced Options:</label>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Witness Threshold:</label>
              <div class="uneditable-value" style={{ width: '75px' }}>
                {this.witThold}
              </div>
            </div>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Establishment Only:</label>
              <div class="uneditable-value" style={{ width: '75px' }}>
                {this.estOnly ? 'Yes' : 'No'}
              </div>
            </div>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Allow Delegation:</label>
              <div class="uneditable-value" style={{ width: '75px' }}>
                {this.DnD ? 'No' : 'Yes'}
              </div>
            </div>
            <div class="task-form-group task-form-group--between">
              <label class="task-form-label">Issue Credentials:</label>
              <div class="uneditable-value" style={{ width: '75px' }}>
                Yes
              </div>
            </div>
            <div class="task-actions">
              <Button
                class="button--secondary margin-right-1"
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
            fractionallyWeighted={MultiSig.fractionallyWeighted}
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
              Profile.loadIdentifiers().then((ids) => {
                if (this.useAsDefault === true) {
                  let aid = ids.find((id) => {
                    return id.name === this.groupAlias;
                  });
                  Profile.setDefaultAID(aid).then(() => {
                    m.redraw();
                  });
                } else {
                  m.redraw();
                }
              });
            }}
            continue={vnode.attrs.end}
          />
        )}
      </>
    );
  }
}

module.exports = ConfigureMultiSigGroupTask;
