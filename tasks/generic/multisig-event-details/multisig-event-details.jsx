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
        <div class="flex flex-justify-start flex-align-start">
          <h4 class="p-tag-bold margin-clear">Status:</h4>
          <h4 class="p-tag margin-clear" style={{ lineHeight: 1.38 }}>
            {vnode.attrs.status}
          </h4>
        </div>

        <div class="flex flex-justify-between">
          <p class="p-tag" style={{ margin: '2rem 0 1rem 0' }}>
            Signer:
          </p>
          <div className="flex-1"></div>
          <p class="p-tag" style={{ margin: '2rem 0 1rem 3rem' }}>
            Signed?
          </p>
        </div>
        <div style={{ margin: '0 0 1rem 0' }}></div>
        {MultiSig.participants.map((sig, i) => {
          if (sig.id === vnode.attrs.default.prefix) {
            return (
              <div className="flex flex-align-center flex-justify-between margin-v-1">
                <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                  <AID aid={vnode.attrs.default} />
                </div>
                {vnode.attrs.fractionallyWeighted && <div className="uneditable-value">{sig.weight}</div>}
                <div style={{ width: '1rem' }}></div>
                <div style={{ margin: '0 0 0 .5rem' }}>
                  <span className="material-icons-outlined md-24 matched-label" style={{ margin: '0 0 .4rem 0.75rem' }}>
                    check_circle
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div className="flex flex-align-center flex-justify-between margin-v-1">
              <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                <AID contact={sig.contact} />
              </div>
              {vnode.attrs.fractionallyWeighted && <div className="uneditable-value">{sig.weight}</div>}
              <div style={{ width: '1rem' }}></div>
              <div style={{ margin: '0 0 0 .5rem' }}>
                {sig.signed ? (
                  <span className="material-icons-outlined md-24 matched-label" style={{ margin: '0 0 .4rem 0.75rem' }}>
                    check_circle
                  </span>
                ) : (
                  <span className="material-icons-outlined md-24 missed-label" style={{ margin: '0 0 .4rem 0.75rem' }}>
                    cancel
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {vnode.attrs.parent.requireDelegator && (
          <>
            <h3>Delegation Approval:</h3>
            <div className="flex flex-align-center flex-justify-between margin-v-1">
              <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                <AID contact={MultiSig.delegator} />
              </div>
              {vnode.attrs.fractionallyWeighted && <div className="flex-1"></div>}
              <div style={{ width: '1rem' }}></div>
              <div style={{ margin: '0 0 0 .5rem' }}>
                {MultiSig.delegatorSigned ? (
                  <span className="material-icons-outlined md-24 matched-label" style={{ margin: '0 0 .4rem 0.75rem' }}>
                    check_circle
                  </span>
                ) : (
                  <span className="material-icons-outlined md-24 missed-label" style={{ margin: '0 0 .4rem 0.75rem' }}>
                    cancel
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        <div class="flex flex-justify-between margin-top-4">
          <Button
            class="button--secondary"
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
