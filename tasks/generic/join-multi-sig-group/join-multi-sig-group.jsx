import m, { vnode } from 'mithril';
import { Button, Checkbox, TextField, AID } from '../../../src/app/components';
import { KERI, Profile, Contacts, Witnesses, MultiSig } from '../../../src/app/services';
import todoList from '../../../src/assets/img/to-do-list.svg';
import secureMessaging from '../../../src/assets/img/secure-messaging.svg';
import EventDetails from '../multisig-event-details/multisig-event-details';

class JoinMultiSigGroupTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this.useAsDefault = false;
    this.default = undefined;
    this._component = {
      view: (vnode) => {
        return <JoinMultiSigGroup end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'new-multi-sig-group';
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

  set notification(notification) {
    this._notification = notification;
    this._aids = notification.a.aids;
    this._ked = notification.a.ked;
    Contacts.requestList().then(() => {
      MultiSig.currentEvent = notification.a.ked;
      MultiSig.participants = this.aids.map((aid, index) => {
        let contact = Contacts.filterById(aid);
        if (contact !== undefined) {
          return {
            id: contact.aid,
            alias: contact.alias.name,
            contact: contact,
            weight: Array.isArray(this.ked.kt) ? this.ked.kt[index] : '',
            signed: false,
          };
        }
        this.default = Profile.identifiers.find((id) => {
          return id.prefix === aid;
        });
        return {
          id: this.default.prefix,
          alias: this.default.name,
          weight: Array.isArray(this.ked.kt) ? this.ked.kt[index] : '',
          signed: false,
        };
      });
    });
    this._delegator = Contacts.filterById(this.ked.di);
    this._fractionallyWeighted = Array.isArray(this.ked.kt);
    this.wits = this.ked.b;
    this.pool = '';
    for (const poolName in Witnesses.witnesses) {
      if (KERI.arrayEquals(Witnesses.witnesses[poolName], this.wits)) {
        this.pool = poolName;
        break;
      }
    }
    this.witThold = this.ked.bt;
    this.estOnly = this.ked.c.indexOf('EO') !== -1;
    this.DnD = this.ked.c.indexOf('DND') !== -1;
    this.status = 'Event signed and submitted';
  }

  get notification() {
    return this._notification;
  }

  get aids() {
    return this._aids;
  }

  get ked() {
    return this._ked;
  }

  get delegator() {
    return this._delegator;
  }

  get fractionallyWeighted() {
    return this._fractionallyWeighted;
  }
}

class JoinMultiSigGroup {
  constructor() {
    this.aid = Profile.getDefaultAID();
    this.useAsDefault = true;
    this.groupAlias = '';
  }

  confirmAndSign(vnode) {
    KERI.participateGroupInception(this.groupAlias, {
      delpre: vnode.attrs.parent.ked.di,
      aids: vnode.attrs.parent.aids,
      isith: vnode.attrs.parent.ked.kt,
      nsith: vnode.attrs.parent.ked.nt,
      toad: Number(vnode.attrs.parent.ked.bt),
      wits: vnode.attrs.parent.ked.b,
      estOnly: vnode.attrs.parent.estOnly,
      DnD: vnode.attrs.parent.DnD,
    }).then(() => {
      vnode.attrs.parent.currentState = 'setup-complete';
    });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'new-multi-sig-group' && (
          <>
            <img class="task-img" src={todoList} />
            <h3>New Multi-Sig Group</h3>
            <p class="p-tag">View the multi-sig group and confirm that these individuals are authenticated.</p>
            <div class="task-actions">
              <Button
                raised
                label="View"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-members';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'review-members' && (
          <>
            <h3>Review and Confirm</h3>
            <p class="p-tag">
              Review to make sure the signer list is complete and configuration information is accurate.
            </p>
            {vnode.attrs.parent.ked.di && (
              <div class="task-form-group">
                <label class="task-form-label">Delegator:</label>
                <div class="flex-1 uneditable-value">
                  <AID contact={vnode.attrs.parent.delegator} />
                </div>
              </div>
            )}
            <div class="task-form-group">
              <label className="task-form-label">Witness Pool:</label>
              <div className="uneditable-value">
                {Witnesses.witnessPools.find((p) => p.value === vnode.attrs.parent.pool).label}
              </div>
            </div>
            <label className="task-form-label">Signers:</label>
            {vnode.attrs.parent.aids.map((signer, i) => {
              let contact = Contacts.filterById(signer);
              return (
                <div class="flex flex-align-center flex-justify-between  margin-v-1">
                  <div class="flex-3 uneditable-value" style={{ marginRight: '1rem' }}>
                    {signer === this.aid.prefix && <AID aid={this.aid} />}
                    {contact !== undefined && <AID contact={contact} />}
                    {contact === undefined && signer !== this.aid.prefix && <span>Unknown AID</span>}
                  </div>
                  {vnode.attrs.parent.fractionallyWeighted && (
                    <div class="uneditable-value" style={{ marginRight: '1rem' }}>
                      {vnode.attrs.parent.ked.kt[i]}
                    </div>
                  )}
                  {signer === this.aid.prefix && <span className="flex-1 p-tag-bold">You</span>}
                  {signer !== this.aid.prefix && <span className="flex-1 p-tag-bold">&nbsp;</span>}
                </div>
              );
            })}
            <label className="task-form-more-label margin-v-2">Advanced Options:</label>
            <div class="task-form-group task-form-group--between">
              <label className="task-form-label">Witness Threshold:</label>
              <div className="uneditable-value" style={{ width: '75px' }}>
                {vnode.attrs.parent.witThold}
              </div>
            </div>
            <div class="task-form-group task-form-group--between">
              <label className="task-form-label">Establishment Only:</label>
              <div className="uneditable-value" style={{ width: '75px' }}>
                {vnode.attrs.parent.estOnly ? 'Yes' : 'No'}
              </div>
            </div>
            <div class="task-form-group task-form-group--between">
              <label className="task-form-label">Allow Delegation:</label>
              <div className="uneditable-value" style={{ width: '75px' }}>
                {vnode.attrs.parent.DnD ? 'No' : 'Yes'}
              </div>
            </div>
            <div class="task-form-group task-form-group--between">
              <label className="task-form-label">Issue Credentials:</label>
              <div className="uneditable-value" style={{ width: '75px' }}>
                Yes
              </div>
            </div>
            <div class="task-actions">
              <Button
                class="button--secondary margin-right-1"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'new-multi-sig-group';
                }}
              />
              <Button
                raised
                label="Confirm"
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
            <img class="task-img" src={secureMessaging} />
            <p class="p-tag">The alias should be an easy to remember name for your multi-sig group?</p>
            <div class="task-form-group">
              <label class="task-form-label" for="alias">
                What would you like your group's alias to be?
              </label>
              <TextField
                id="alias"
                outlined
                fluid
                value={this.groupAlias}
                oninput={(e) => {
                  this.groupAlias = e.target.value;
                }}
              />
            </div>
            <div className="task-form-checkbox-container">
              <Checkbox
                id="set-default"
                outlined
                fluid
                disabled={Profile.identifiers === undefined || Profile.identifiers.length === 0}
                checked={this.useAsDefault}
                onchange={(_default) => {
                  this.useAsDefault = _default;
                }}
              />
              <label className="task-form-label" for="set-default">
                Set new AID as Keep Default?
              </label>
            </div>
            <div class="task-actions">
              <Button
                raised
                label="Continue"
                disabled={!this.groupAlias}
                onclick={() => {
                  this.confirmAndSign(vnode);
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'setup-complete' && (
          <EventDetails
            parent={vnode.attrs.parent}
            groupAlias={this.groupAlias}
            default={vnode.attrs.parent.default}
            fractionallyWeighted={vnode.attrs.parent.fractionallyWeighted}
            status={vnode.attrs.parent.status}
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
        {vnode.attrs.parent.currentState === 'event-complete' && (
          <>
            <img class="task-img" src={todoList} />
            <h3>Inception Event Completed</h3>
            <p class="p-tag">
              Thank you for confirming the Inception Event. You will receive a notification when it is completed.
            </p>
            <div class="task-actions">
              <Button raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = JoinMultiSigGroupTask;
