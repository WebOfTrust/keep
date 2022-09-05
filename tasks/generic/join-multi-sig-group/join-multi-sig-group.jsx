import m, { vnode } from 'mithril';
import {Button, Checkbox, TextField} from '../../../src/app/components';
import { KERI, Profile, Notify, Contacts } from '../../../src/app/services';
import todoList from '../../../src/assets/img/to-do-list.svg';
import secureMessaging from '../../../src/assets/img/secure-messaging.svg';

class JoinMultiSigGroupTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this.setDefault = false;
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
    this._notification = notification
    this._aids = notification.a.aids;
    this._ked = notification.a.ked;
    Contacts.requestList();
    this._delegator = Contacts.filterById(this._ked.di);
    this._fractionallyWeighted = Array.isArray(this._ked.kt);
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
    }).then(() => {
      vnode.attrs.parent.currentState = 'event-complete';
    });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'new-multi-sig-group' && (
          <>
            <img src={todoList} style={{ width: '188px', margin: '0 0 2rem 0' }} />
            <h3>New Multi-Sig Group</h3>
            <p class="p-tag">View the multi-sig group and confirm that these individuals are authorized.</p>
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              <Button
                class="button--big button--no-transform"
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
            <p>Review signers to make sure the list is complete.</p>
            {vnode.attrs.parent.ked.di && (
              <>
                <h4>Delegator:</h4>
                <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
                  <div class="flex-1 uneditable-value" style={{ minHeight: '48px' }}>
                    {vnode.attrs.parent.delegator?.alias}
                  </div>
                </div>
              </>
            )}
            <h4>Signers:</h4>
            {vnode.attrs.parent.aids.map((signer, i) => {
              let name = '';
              let contact = Contacts.filterById(signer);
              if (contact !== undefined) {
                name = contact.alias;
              } else if (signer === this.aid.prefix) {
                name = this.aid.name + ' (Your AID)';
              } else {
                name = 'Unknown AID';
              }
              return (
                <>
                  <div class="flex flex-align-center flex-justify-between" style={{ margin: '1rem 0' }}>
                    <div class="flex-1 uneditable-value" style={{ marginRight: '1rem' }}>
                      {name}
                    </div>
                    {vnode.attrs.parent.fractionallyWeighted && <div class="uneditable-value">{vnode.attrs.parent.ked.kt[i]}</div>}
                  </div>
                </>
              );
            })}

            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'new-multi-sig-group';
                }}
              />
              <Button
                class="button--big button--no-transform"
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
            <img src={secureMessaging} style={{ width: '268px', margin: '4rem 0 2rem 0' }} />
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              The alias should be an easy to remember name for your multi-sig group?
            </p>
            <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
              What would you like your group's alias to be?
            </p>
            <div className="flex flex-justify-start" style={{margin: '0 0 3.5rem 0'}}>
              <Checkbox
                outlined
                fluid
                disabled={(Profile.identifiers === undefined || Profile.identifiers.length === 0)}
                checked={this.setDefault}
                style={{margin: '0 0 3.5rem 0'}}
                onchange={(_default) => {
                  this.setDefault = _default;
                }}
              />
              <p className="p-tag-bold">Set new AID as Keep Default?</p>
            </div>
            <TextField
              outlined
              fluid
              value={this.groupAlias}
              oninput={(e) => {
                this.groupAlias = e.target.value;
              }}
            />
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              <Button
                class="button--big button--no-transform"
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
        {vnode.attrs.parent.currentState === 'event-complete' && (
          <>
            <img src={todoList} style={{ width: '188px', margin: '4rem 0 0 0' }} />
            <h3>Inception Event Completed</h3>
            <p class="p-tag">
              Thank you for confirming the Inception Event. You will receive a notification when it is completed.
            </p>
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = JoinMultiSigGroupTask;
