import approveRequest from '../../../src/assets/img/approve-request.svg';
import { AID, Button } from '../../../src/app/components';
import { Contacts, KERI, MultiSig, Profile, Tasks, Witnesses } from '../../../src/app/services';

class JoinManualKeyRotationTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <JoinManualKeyRotation end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'approve-rotation';
  }

  get imgSrc() {
    return approveRequest;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class JoinManualKeyRotation {
  constructor() {
    let task = this;
    this.currentAID = Profile.identifiers.find((id) => {
      return id.prefix === MultiSig.rotation.i;
    });

    MultiSig.participants = [];
    if (Contacts.list.length === 0) {
      Contacts.requestList().then(() => {
        task.loadSigners();
      });
    } else {
      task.loadSigners();
    }

    this.wits = MultiSig.rotation.wits.length > 0 ? MultiSig.rotation.wits : this.currentAID.witnesses;
    for (const poolName in Witnesses.witnesses) {
      if (KERI.arrayEquals(Witnesses.witnesses[poolName], this.wits)) {
        this.pool = poolName;
        break;
      }
    }
  }

  loadSigners() {
    MultiSig.rotation.aids.forEach((aid, idx) => {
      let contact = Contacts.filterById(aid);
      let p = {
        weight: '0',
        signed: false,
      };
      if (contact === undefined) {
        let local = Profile.identifiers.find((id) => {
          return id.prefix === aid;
        });
        p = {
          id: aid,
          alias: local.name,
          aid: local,
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
        p.weight = MultiSig.rotation.isith[idx];
      }
      MultiSig.participants.push(p);
    });
  }

  approveRotation() {
    return KERI.participateGroupRotation(this.currentAID.name, {
      aids: MultiSig.rotation.aids,
      wits: MultiSig.rotation.wits,
      toad: MultiSig.rotation.toad,
      isith: MultiSig.rotation.isith,
      data: MultiSig.rotation.data,
    });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'approve-rotation' && (
          <>
            <img src={approveRequest} style={{ width: '188px', margin: '0 0 2rem 0' }} />
            <h3>Approve Multi-Sig Group Rotation</h3>
            <p class="p-tag">View the rotation request and confirm the participants and all parameters.</p>
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              <Button
                raised
                label="View"
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
            <p className="font-weight--bold font-color--battleship">Group Alias:</p>
            <div className="uneditable-value">
              <AID aid={this.currentAID} />
            </div>
            <p className="font-weight--bold font-color--battleship">Witness Pool:</p>
            <div className="uneditable-value">{Witnesses.witnessPools.find((p) => p.value === this.pool).label}</div>
            {!MultiSig.fractionallyWeighted && (
              <div>
                <p className="font-weight--bold font-color--battleship">Number of Required Signers:</p>
                <div className="uneditable-value">{this.numSigners}</div>
              </div>
            )}
            <p className="font-color--battleship margin-v-2">Review signers to make sure the list is complete.</p>
            <p className="font-weight--bold font-color--battleship">Signers (in order):</p>
            {MultiSig.participants.map((signer) => {
              return (
                <>
                  <div className="flex flex-align-center flex-justify-between margin-v-1">
                    {'contact' in signer && (
                      <>
                        <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                          <AID contact={signer.contact} />
                        </div>
                        {MultiSig.fractionallyWeighted && <div className="uneditable-value">{signer.weight}</div>}
                      </>
                    )}
                    {'aid' in signer && (
                      <>
                        <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                          <AID aid={signer.aid} />
                        </div>
                        {MultiSig.fractionallyWeighted && <div className="uneditable-value">{signer.weight}</div>}
                      </>
                    )}
                  </div>
                </>
              );
            })}
            <p className="font-color--battleship margin-v-2">Advanced Options.</p>
            <p className="font-weight--bold font-color--battleship">Witness Threshold:</p>
            <div className="uneditable-value">{MultiSig.rotation.toad}</div>
            <p className="font-weight--bold font-color--battleship">Establishment Only:</p>
            <div className="uneditable-value">{this.currentAID.estOnly ? 'Yes' : 'No'}</div>
            <p className="font-weight--bold font-color--battleship">Allow Delegation:</p>
            <div className="uneditable-value">{this.currentAID.DnD ? 'No' : 'Yes'}</div>

            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk"
                raised
                label="Cancel"
                onclick={() => {
                  vnode.attrs.end();
                }}
              />
              <Button
                raised
                label="Confirm"
                onclick={() => {
                  this.approveRotation().then(() => {
                    vnode.attrs.parent.currentState = 'rotation-complete';
                  });
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'rotation-complete' && (
          <>
            <img src={approveRequest} style={{ width: '188px', margin: '0 0 2rem 0' }} />
            <h3>Rotation Approved</h3>
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

module.exports = JoinManualKeyRotationTask;
