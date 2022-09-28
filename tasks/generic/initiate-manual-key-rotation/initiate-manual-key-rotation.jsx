import m from 'mithril';
import { AID, AIDField, Button, IconButton, Radio, Select, TextField, TextTooltip } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import { Contacts, KERI, MultiSig, Participants, Profile, Tasks, Witnesses } from '../../../src/app/services';
import ProfilePicture from '../../../src/app/components/profile/picture';
import AddSignerModal from '../configure-multi-sig-group/add-signer-modal';
import approveRequest from '../../../src/assets/img/approve-request.svg';

class InitiateManualKeyRotationTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <InitiateManualKeyRotation end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'manual-key-rotation';
  }

  get imgSrc() {
    return createIdentifier;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class InitiateManualKeyRotation {
  constructor() {
    this.canChangeToad = false;
    this.mustChangeToad = false;
    this.addSignerOpen = false;
    this.addSignerIdx = 0;
    this.status = '';

    this.currentAID = Profile.getDefaultAID();
    this.wits = this.currentAID.witnesses;
    this.witThold = this.currentAID.toad;
    MultiSig.fractionallyWeighted = Array.isArray(this.currentAID.isith);
    this.pool = '';
    for (const poolName in Witnesses.witnesses) {
      if (KERI.arrayEquals(Witnesses.witnesses[poolName], this.wits)) {
        this.pool = poolName;
        break;
      }
    }

    Contacts.requestList().then(() => {
      this.populateParticipants();
    });
  }

  populateParticipants() {
    MultiSig.participants = [];
    this.currentAID.group.aids.forEach((aid, idx) => {
      let contact = Contacts.filterById(aid);
      let p = {
        weight: '0',
        signed: false,
      };
      if (contact === undefined) {
        let id = Profile.identifiers.find((id) => {
          return id.prefix === aid;
        });
        p = {
          id: aid,
          alias: id.name,
          aid: id,
          ...p,
        };
      } else {
        p = {
          id: aid,
          alias: contact.alias,
          contact: contact,
          ...p,
        };
      }
      if (MultiSig.fractionallyWeighted) {
        p.weight = this.currentAID.isith[idx];
      }
      MultiSig.participants.push(p);
    });

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

  rotateAID(vnode) {
    let aids = MultiSig.participants.map((signer) => {
      return signer.id;
    });
    let rot = { aids: aids, wits: this.wits, toad: this.witThold };

    if (!MultiSig.fractionallyWeighted) {
      let sith = this.numSigners.toString();
      rot.isith = sith;
      rot.nsith = sith;
    } else {
      let vals = MultiSig.participants.map((obj) => {
        return obj.weight;
      });
      let sith = vals.join(',');
      rot.isith = sith;
      rot.nsith = sith;
    }

    KERI.initiateGroupRotation(this.currentAID.name, rot).then((rot) => {
      Profile.loadIdentifiers().then((ids) => {
        MultiSig.currentEvent = rot;
        vnode.attrs.parent.currentState = 'setup-complete';
      });
    });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'manual-key-rotation' && (
          <>
            <img src={createIdentifier} style={{ width: '50%', margin: '0 0 2rem 0' }} />
            <h3 style={{ margin: '0 0 2rem 0 ' }}>Configure Manual Key Rotation</h3>
            <p className="p-tag" style={{ margin: '0 0 2rem 0' }}>
              Perform a key rotation on your identifier regularly for good measure or in an emergency if your signing
              keys have been compromised.
            </p>
            <p className="p-tag">Identifier to Rotate:</p>
            <div className="flex flex-justify-start flex-align-center" style={{ marginTop: '2rem' }}>
              <ProfilePicture identifier={{ name: this.currentAID.name }} />
              <div style={{ margin: '0 0 0 1rem' }}>
                <p className="p-tag-bold" style={{ margin: '0 0 0.5rem 0' }}>
                  Alias:
                </p>
                <AID aid={this.currentAID} />
              </div>
            </div>
            <div style={{ marginTop: '3rem' }}>
              <p className="p-tag-bold">Would you like to change the witness pool?</p>
              <Select
                outlined
                fluid
                value={this.pool}
                style={{ margin: '0 0 1.5rem 0' }}
                options={Witnesses.witnessPools}
                onchange={(pool) => {
                  this.pool = pool;
                  this.wits = Witnesses.witnesses[this.pool];
                  this.canChangeToad = true;
                  if (
                    this.currentAID.toad > this.wits.length ||
                    this.currentAID.toad < KERI.recommendedThold(this.wits.length)
                  ) {
                    this.witThold = KERI.recommendedThold(this.wits.length);
                    this.mustChangeToad = true;
                  }
                }}
              />
              {this.wits.length > 0 && (
                <p className="p-tag-italic" style={{ margin: '-0.5rem 0 0.25rem 1.5rem' }}>
                  {this.wits.length} Witnesses in Pool
                </p>
              )}

              {this.canChangeToad && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div className="flex flex-justify-between" style={{ margin: '0' }}>
                    <p class="p-tag">
                      {this.mustChangeToad ? 'You must' : 'Would you like to'} change your witness threshold:
                    </p>
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
                </div>
              )}
            </div>
            <div class="flex flex-justify-end" style={{ marginTop: '2.75rem' }}>
              <Button
                id="continue"
                raised
                label="Continue"
                disabled={this.wits.length === 0}
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
                  checked={MultiSig.fractionallyWeighted}
                  onclick={() => {
                    MultiSig.fractionallyWeighted = true;
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
                  checked={!MultiSig.fractionallyWeighted}
                  onclick={() => {
                    MultiSig.fractionallyWeighted = false;
                  }}
                />
                <label class="font-weight--bold font-color--battleship" for="weighted-no">
                  No
                </label>
              </div>
            </div>
            {!MultiSig.fractionallyWeighted && (
              <>
                <label>
                  <p class="p-tag-bold">How many signers are required to sign?</p>
                </label>
                <TextField
                  outlined
                  type="number"
                  min={1}
                  max={MultiSig.participants.length + 1}
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
              <div class="flex-1" />
              {MultiSig.fractionallyWeighted && <b class="font-color--battleship">Weight</b>}
              <div style={{ width: '48px', height: '48px', marginLeft: '1rem' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
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
                    {'contact' in signer && (
                      <>
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
                            style={{ width: '75px' }}
                            placeholder="1/3"
                            value={signer.weight}
                            oninput={(e) => {
                              signer.weight = e.target.value;
                              m.redraw();
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
                      </>
                    )}
                    {'aid' in signer && (
                      <>
                        <AIDField aid={signer.aid} />
                        <div class="flex-1" />
                        {MultiSig.fractionallyWeighted && (
                          <TextField
                            outlined
                            style={{ width: '75px' }}
                            placeholder="1/3"
                            value={signer.weight}
                            oninput={(e) => {
                              signer.weight = e.target.value;
                              m.redraw();
                            }}
                          />
                        )}
                        <div style={{ height: '48px', marginLeft: '2.2rem' }} />
                        <span className="p-tag-bold" style={{ fontSize: '1rem' }}>
                          You
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <div class="flex flex-justify-between margin-top-4">
              <Button
                class="button--secondary"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'manual-key-rotation';
                }}
              />
              <Button
                raised
                label="Continue"
                disabled={!this.validSigners}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'review-and-confirm' && (
          <>
            <h3>Review and Confirm Rotation Parameters</h3>
            <p class="font-weight--bold font-color--battleship">Group Alias:</p>
            <div class="uneditable-value">
              <AID aid={this.currentAID} />
            </div>
            <p class="font-weight--bold font-color--battleship">Witness Pool:</p>
            <div class="uneditable-value">{Witnesses.witnessPools.find((p) => p.value === this.pool).label}</div>
            {!MultiSig.fractionallyWeighted && (
              <div>
                <p class="font-weight--bold font-color--battleship">Number of Required Signers:</p>
                <div class="uneditable-value">{this.numSigners}</div>
              </div>
            )}
            <p class="font-color--battleship margin-v-2">Review signers to make sure the list is complete.</p>
            <p class="font-weight--bold font-color--battleship">Signers (in order):</p>
            {MultiSig.participants.map((signer) => {
              return (
                <>
                  <div class="flex flex-align-center flex-justify-between margin-v-1">
                    {'contact' in signer && (
                      <>
                        <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                          <AID contact={signer.contact} />
                        </div>
                        {MultiSig.fractionallyWeighted && <div class="uneditable-value">{signer.weight}</div>}
                      </>
                    )}
                    {'aid' in signer && (
                      <>
                        <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                          <AID aid={signer.aid} />
                        </div>
                        {MultiSig.fractionallyWeighted && <div class="uneditable-value">{signer.weight}</div>}
                      </>
                    )}
                  </div>
                </>
              );
            })}
            <p className="font-color--battleship margin-v-2">Advanced Options.</p>
            <p className="font-weight--bold font-color--battleship">Witness Threshold:</p>
            <div className="uneditable-value">{this.witThold}</div>
            <p className="font-weight--bold font-color--battleship">Establishment Only:</p>
            <div className="uneditable-value">{this.currentAID.estOnly ? 'Yes' : 'No'}</div>
            <p className="font-weight--bold font-color--battleship">Allow Delegation:</p>
            <div className="uneditable-value">{this.currentAID.DnD ? 'No' : 'Yes'}</div>
            <div className="flex flex-justify-between" style={{ marginTop: '3rem' }}>
              <Button
                id="skip"
                class="button--secondary"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'configure-multisig-participants';
                }}
              />
              <Button
                id="create-aid"
                raised
                label="Continue"
                onclick={(e) => {
                  this.rotateAID(vnode);
                }}
              />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'setup-complete' && (
          <>
            <img src={approveRequest} style={{ width: '188px', margin: '0 0 2rem 0' }} />
            <h3>Rotation Submitted</h3>
            <div
              className="flex flex-justify-start flex-align-center"
              style={{ margin: '5rem 0 7rem', boxShadow: '0 3px 9px 0 rgba(0, 0, 0, 0.5)', padding: '3rem' }}
            >
              <ProfilePicture identifier={{ name: this.currentAID.name }} />
              <div style={{ margin: '0 0 0 1rem' }}>
                <p className="p-tag-bold" style={{ margin: '0 0 0.5rem 0' }}>
                  Alias:
                </p>
                <AID aid={this.currentAID} />
              </div>
            </div>
            <p class="p-tag">
              When enough members of {this.currentAID.name} have approved the rotation you will receive a notification
              that the new rotation is complete or you can check the status using the Status button below.
            </p>
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                raised
                label="Status"
                onclick={() => {
                  Tasks.active = Tasks.find('view-event-logs');
                }}
              />
              <Button
                raised
                label="Close"
                onclick={() => {
                  vnode.attrs.end();
                }}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = InitiateManualKeyRotationTask;
