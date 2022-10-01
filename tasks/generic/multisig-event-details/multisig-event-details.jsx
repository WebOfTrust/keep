import { Button, AID } from '../../../src/app/components';
import { KERI, MultiSig } from '../../../src/app/services';
import m from 'mithril';

class EventDetails {
  constructor(vnode) {
    /*
     *
     * We have the AIDS.  Use them to get the KELs and to determine
     * the order of the signatures so we can match up with Signatures.
     *
     * */
    this.finish = vnode.attrs.finish;
  }

  oninit() {
    this.ensureMultiSigSigned();
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

            if (event['stored'] === true) {
              if (MultiSig.delegator === null || MultiSig.delegator === undefined) {
                task.status = 'Inception complete';
              } else {
                if (!task.sufficient) {
                  task.status = 'Sufficient signatures received';
                  task.sufficient = true;
                }
              }

              let unsigned = MultiSig.participants.find((part) => {
                return !part.signed;
              });
              if (unsigned === undefined) {
                task.finish();
                return;
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
      }, 200);
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

  view(vnode) {
    return (
      <>
        <h3>{vnode.attrs.groupAlias} Inception:</h3>
        <div class="flex flex-align-center">
          <h4>Status:</h4>
          <p class="p-tag margin-left-1">{vnode.attrs.status}</p>
        </div>

        <div class="flex flex-justify-between">
          <label class="task-form-label">Signer:</label>
          <div class="flex-1"></div>
          <label class="task-form-label">Signed?</label>
        </div>
        {MultiSig.participants.map((sig, i) => {
          if (sig.id === vnode.attrs.default.prefix) {
            return (
              <div class="flex flex-align-center flex-justify-between margin-v-1">
                <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                  <AID aid={vnode.attrs.default} />
                </div>
                {vnode.attrs.fractionallyWeighted && (
                  <div class="uneditable-value" style={{ width: '75px' }}>
                    {sig.weight}
                  </div>
                )}
                <div style={{ marginLeft: '1rem', width: '54px', textAlign: 'center' }}>
                  <span class="material-icons-outlined md-24 matched-label">check_circle</span>
                </div>
              </div>
            );
          }
          return (
            <div class="flex flex-align-center flex-justify-between margin-v-1">
              <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                <AID contact={sig.contact} />
              </div>
              {vnode.attrs.fractionallyWeighted && (
                <div class="uneditable-value" style={{ width: '75px' }}>
                  {sig.weight}
                </div>
              )}
              <div style={{ marginLeft: '1rem', width: '54px', textAlign: 'center' }}>
                {sig.signed ? (
                  <span class="material-icons-outlined md-24 matched-label">check_circle</span>
                ) : (
                  <span class="material-icons-outlined md-24 missed-label">cancel</span>
                )}
              </div>
            </div>
          );
        })}
        {vnode.attrs.parent.requireDelegator && (
          <>
            <label class="task-form-label">Delegation Approval:</label>
            <div class="flex flex-align-center flex-justify-between margin-v-1">
              <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                <AID contact={MultiSig.delegator} />
              </div>
              {vnode.attrs.fractionallyWeighted && <div style={{ width: '75px' }}></div>}
              <div style={{ marginLeft: '1rem', width: '54px', textAlign: 'center' }}>
                {MultiSig.delegatorSigned ? (
                  <span class="material-icons-outlined md-24 matched-label">check_circle</span>
                ) : (
                  <span class="material-icons-outlined md-24 missed-label">cancel</span>
                )}
              </div>
            </div>
          </>
        )}
        <div class="task-actions">
          <Button
            class="button--secondary margin-right-1"
            raised
            label="Go Back"
            onclick={() => {
              vnode.attrs.back();
            }}
          />
          <Button raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

module.exports = EventDetails;
