import m from 'mithril';
import moment from 'moment';
import { AID, Button, TextField } from '../../../src/app/components';

import calendar from '../../../src/assets/img/calendar.svg';
import { Contacts, KERI, MultiSig, Profile } from '../../../src/app/services';
import ProfilePicture from '../../../src/app/components/profile/picture';

class ViewMultiSigEventLogsTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this.currentState = 'event-log';
    this._component = {
      view: (vnode) => {
        return <ViewMultiSigEventLogs end={vnode.attrs.end} parent={this} />;
      },
    };
  }

  get imgSrc() {
    return calendar;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class ViewMultiSigEventLogs {
  constructor() {
    this.keystate = {};
    this.kel = [];
    this.pending = [];

    this.selected = undefined;
    this.pselected = undefined;
    this.signers = [];
    this.currentAID = Profile.getDefaultAID();
    if (Contacts.list.length === 0) {
      Contacts.requestList();
    }

    KERI.getKeyStateForIdentifier(this.currentAID.prefix).then((ks) => {
      this.keystate = ks.state;
      this.kel = ks.kel.reverse();
      this.pending = ks.pending.reverse();
    });
  }

  loadSigners() {
    let task = this;
    this.signers = [];
    this.fractionallyWeighted = Array.isArray(this.selected.ked.kt);
    this.selected.ked.k.forEach((pubkey, idx) => {
      KERI.findEvent(pubkey).then((evt) => {
        let p = task.findSigner(evt.i);
        if (this.fractionallyWeighted) {
          p.weight = this.selected.ked.kt[idx];
        }

        p.signed = this.selected.signatures.find((sig) => {
          return sig.index === idx;
        });

        this.signers.push(p);
      });
    });
  }

  loadPendingSigners() {
    let task = this;
    this.signers = [];
    this.fractionallyWeighted = Array.isArray(this.pselected.sith);
    this.pselected.aids.forEach((aid, idx) => {
      let p = task.findSigner(aid);
      if (this.fractionallyWeighted) {
        p.weight = this.pselected.sith[idx];
      }

      p.signed = false;
      this.signers.push(p);
    });
  }

  findSigner(aid) {
    let contact = Contacts.filterById(aid);
    let p = {
      weight: '0',
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
    return p;
  }

  displayType(t) {
    switch (t) {
      case 'icp':
        return 'Inception';
      case 'dip':
        return 'Delegated Inception';
      case 'rot':
        return 'Rotation';
      case 'drt':
        return 'Delegated Rotation';
      case 'ixn':
        return 'Interaction';
    }
  }

  view(vnode) {
    return (
      <>
        {(vnode.attrs.parent.currentState === 'event-log' ||
          (this.selected === undefined && this.pselected === undefined)) && (
          <>
            <h3>Event Log For:</h3>
            <div className="flex flex-justify-start flex-align-center" style={{ margin: '0', padding: '0.5rem' }}>
              <ProfilePicture identifier={{ name: this.currentAID.name }} />
              <div style={{ margin: '0 0 0 1rem' }}>
                <p className="p-tag-bold" style={{ margin: '0 0 0.5rem 0' }}>
                  Alias:
                </p>
                <AID aid={this.currentAID} />
              </div>
            </div>
            <div className="flex flex-justify-between flex-align-center" style={{ margin: '0.5rem' }}>
              <p className="p-tag-bold" style={{ margin: '0', fontSize: '85%' }}>
                Latest Digest:
              </p>
              <code style={{ margin: '0', fontSize: '90%' }}>{this.keystate.d}</code>
            </div>
            <div class="flex flex-justify-between">
              <p class="p-tag-bold" style={{ fontSize: '80%', marginRight: '3rem' }}>
                Seq #
              </p>
              <p class="p-tag-bold" style={{ fontSize: '80%', marginRight: '5.2rem' }}>
                Type
              </p>
              <p class="p-tag-bold" style={{ fontSize: '80%', marginRight: '5.2rem' }}>
                Date
              </p>
              <p class="p-tag-bold" style={{ fontSize: '80%', marginRight: '2.8rem' }}>
                Status
              </p>
            </div>
            <div style={{ height: '350px', overflowY: 'scroll', margin: '0 0 2rem 0' }}>
              {this.pending.map((event) => {
                return (
                  <div
                    class="flex flex-justify-between divider"
                    style={{ alignItems: 'center', margin: '0', height: '45px', width: '100%', cursor: 'pointer' }}
                    onclick={() => {
                      this.pselected = event;
                      this.loadPendingSigners();
                      vnode.attrs.parent.currentState = 'pending-details';
                    }}
                  >
                    <div class="flex flex-justify-between" style={{ width: '100%' }}>
                      <p class="p-tag" style={{}}>
                        <span>{event.sn}</span>
                      </p>
                      <p class="p-tag" style={{ fontSize: '90%' }}>
                        Rotation
                      </p>
                      <p class="p-tag" style={{ fontSize: '90%' }}>
                        {moment(event.timestamp).format('M/D/YY')}
                      </p>
                      <div style={{ marginRight: '1rem' }}>
                        <p class="p-tag" style={{ fontSize: '90%', color: '#aa3737' }}>
                          Pending
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {this.kel.map((event) => {
                return (
                  <div
                    class="flex flex-justify-between divider"
                    style={{ alignItems: 'center', margin: '0', height: '45px', width: '100%', cursor: 'pointer' }}
                    onclick={() => {
                      this.selected = event;
                      this.loadSigners();
                      vnode.attrs.parent.currentState = 'event-details';
                    }}
                  >
                    <div class="flex flex-justify-between" style={{ width: '100%' }}>
                      <p class="p-tag" style={{}}>
                        <span>{event.ked.s}</span>
                      </p>
                      <p class="p-tag" style={{ fontSize: '90%' }}>
                        {this.displayType(event.ked.t)}
                      </p>
                      <p class="p-tag" style={{ fontSize: '90%' }}>
                        {moment(event.timestamp).format('M/D/YY')}
                      </p>
                      <div style={{ marginRight: '1rem' }}>
                        {event.stored ? (
                          <p class="p-tag" style={{ fontSize: '90%' }}>
                            Completed
                          </p>
                        ) : (
                          <p class="p-tag" style={{ fontSize: '90%', color: '#aa3737' }}>
                            Incomplete
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div class="flex flex-justify-between">
              <Button raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}

        {vnode.attrs.parent.currentState === 'pending-details' && this.pselected !== undefined && (
          <>
            <div class="flex flex-justify-between flex-align-center">
              <div class="flex flex-justify-start flex-align-center" style={{ margin: '0 0 0 -1rem' }}>
                <h3>Event #{this.pselected.sn} - Rotation </h3>
                <span className="material-icons-outlined md-24 missed-label" style={{ margin: '0 0 .4rem 0.75rem' }}>
                  cancel
                </span>
              </div>
              <p className="p-tag">{moment(this.pselected.timestamp).format('MMM DD h:mm A')}</p>
            </div>
            {!this.fractionallyWeighted && (
              <div className="flex flex-justify-between flex-align-center" style={{ margin: '0.5rem' }}>
                <p className="p-tag-bold" style={{ margin: '0', fontSize: '85%' }}>
                  Signature Threshold:
                </p>
                <code style={{ margin: '0' }}>{this.pselected.sith}</code>
              </div>
            )}

            <div className="flex flex-justify-between" style={{ margin: '0 0 0 -1rem' }}>
              <p className="p-tag-bold">Signers: </p>
            </div>
            <div style={{ marginTop: '0' }}>
              <div class="flex flex-justify-between">
                <p class="p-tag" style={{ margin: '0 0 1rem 0' }}>
                  Signer:
                </p>
                <div className="flex-1"></div>
                <p class="p-tag" style={{ margin: '0 0 1rem 3rem' }}>
                  Signed?
                </p>
              </div>
              <div style={{ margin: '0 0 1rem 0' }}></div>
              {this.signers.map((sig, i) => {
                if ('aid' in sig) {
                  return (
                    <div className="flex flex-align-center flex-justify-between margin-v-1">
                      <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                        <AID aid={sig.aid} />
                      </div>
                      {this.fractionallyWeighted && <div className="uneditable-value">{sig.weight}</div>}
                      <div style={{ margin: '0 0 0 .5rem' }}>
                        <span
                          className="material-icons-outlined md-24 matched-label"
                          style={{ margin: '0 0 .4rem 0.75rem' }}
                        >
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
                    {this.fractionallyWeighted && <div className="uneditable-value">{sig.weight}</div>}
                    <div style={{ width: '1rem' }}></div>
                    <div style={{ margin: '0 0 0 .5rem' }}>
                      {sig.signed ? (
                        <span
                          className="material-icons-outlined md-24 matched-label"
                          style={{ margin: '0 0 .4rem 0.75rem' }}
                        >
                          check_circle
                        </span>
                      ) : (
                        <span className="material-icons-outlined md-24 missed-label">cancel</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div class="flex flex-justify-between" style={{ margin: '4rem 0 0.5rem 0' }}>
              <Button
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'event-log';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'event-details' && this.selected !== undefined && (
          <>
            <div class="flex flex-justify-between flex-align-center">
              <div class="flex flex-justify-start flex-align-center" style={{ margin: '0 0 0 -1rem' }}>
                <h3>
                  Event #{this.selected.ked.s} - {this.displayType(this.selected.ked.t)}
                </h3>
                {this.selected.stored && (
                  <span className="material-icons-outlined md-24 matched-label" style={{ margin: '0 0 .4rem 0.75rem' }}>
                    check_circle
                  </span>
                )}
                {!this.selected.stored && <span className="material-icons-outlined md-24 missed-label">cancel</span>}
              </div>
              <p className="p-tag">{moment(this.selected.timestamp).format('MMM DD h:mm A')}</p>
            </div>
            <div className="flex flex-justify-between flex-align-center" style={{ margin: '0 0 0.5rem 0' }}>
              <p className="p-tag-bold" style={{ margin: '0', fontSize: '90%' }}>
                Digest:
              </p>
              <code style={{ margin: '0' }}>{this.selected.ked.d}</code>
            </div>
            {!this.fractionallyWeighted && (
              <div className="flex flex-justify-between flex-align-center" style={{ margin: '0.5rem' }}>
                <p className="p-tag-bold" style={{ margin: '0', fontSize: '85%' }}>
                  Signature Threshold:
                </p>
                <code style={{ margin: '0' }}>{this.selected.ked.kt}</code>
              </div>
            )}

            <div className="flex flex-justify-between" style={{ margin: '0 0 0 -1rem' }}>
              <p className="p-tag-bold">Signers: </p>
            </div>
            <div style={{ marginTop: '0' }}>
              <div class="flex flex-justify-between">
                <p class="p-tag" style={{ margin: '0 0 1rem 0' }}>
                  Signer:
                </p>
                <div className="flex-1"></div>
                <p class="p-tag" style={{ margin: '0 0 1rem 3rem' }}>
                  Signed?
                </p>
              </div>
              <div style={{ margin: '0 0 1rem 0' }}></div>
              {this.signers.map((sig, i) => {
                if ('aid' in sig) {
                  return (
                    <div className="flex flex-align-center flex-justify-between margin-v-1">
                      <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                        <AID aid={sig.aid} />
                      </div>
                      {this.fractionallyWeighted && <div className="uneditable-value">{sig.weight}</div>}
                      <div style={{ width: '1rem' }}></div>
                      <div style={{ margin: '0 0 0 .5rem' }}>
                        <span
                          className="material-icons-outlined md-24 matched-label"
                          style={{ margin: '0 0 .4rem 0.75rem' }}
                        >
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
                    {this.fractionallyWeighted && <div className="uneditable-value">{sig.weight}</div>}
                    <div style={{ width: '1rem' }}></div>
                    <div style={{ margin: '0 0 0 .5rem' }}>
                      {sig.signed ? (
                        <span
                          className="material-icons-outlined md-24 matched-label"
                          style={{ margin: '0 0 .4rem 0.75rem' }}
                        >
                          check_circle
                        </span>
                      ) : (
                        <span
                          className="material-icons-outlined md-24 missed-label"
                          style={{ margin: '0 0 .4rem 0.75rem' }}
                        >
                          cancel
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-justify-between" style={{ margin: '0 0 0 -1rem' }}>
              <p className="p-tag-bold">Witnesses: </p>
            </div>
            <div style={{ marginTop: '0' }}>
              <div class="flex flex-justify-between">
                <p class="p-tag" style={{ margin: '0 0 1rem 0' }}>
                  Witness:
                </p>
                <div className="flex-1"></div>
                <p class="p-tag" style={{ margin: '0 0 1rem 3rem' }}>
                  Receipted?
                </p>
              </div>
              <div style={{ margin: '0 0 1rem 0' }}></div>
              {this.selected.witnesses.map((wit, i) => {
                let receipted = this.selected.witness_signatures.find((sig) => {
                  return sig.index === i;
                });
                return (
                  <div className="flex flex-align-center flex-justify-between margin-v-1">
                    <div className="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                      <code style={{ margin: '0', fontSize: '95%' }}>{wit}</code>
                    </div>
                    {vnode.attrs.fractionallyWeighted && <div className="uneditable-value">{sig.weight}</div>}
                    <div style={{ width: '1rem' }}></div>
                    <div style={{ margin: '0 0 0 .5rem' }}>
                      {receipted ? (
                        <span
                          className="material-icons-outlined md-24 matched-label"
                          style={{ margin: '0 0 .4rem 0.75rem' }}
                        >
                          check_circle
                        </span>
                      ) : (
                        <span className="material-icons-outlined md-24 missed-label">cancel</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div class="flex flex-justify-between" style={{ margin: '4rem 0 0.5rem 0' }}>
              <Button
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'event-log';
                }}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = ViewMultiSigEventLogsTask;
