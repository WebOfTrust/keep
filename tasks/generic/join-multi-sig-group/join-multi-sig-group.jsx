import m, { vnode } from 'mithril';
import { Button, TextField } from '../../../src/app/components';
import { KERI, Profile, Notify, Contacts } from '../../../src/app/services';
import todoList from '../../../src/assets/img/to-do-list.svg';
import secureMessaging from '../../../src/assets/img/secure-messaging.svg';

class JoinMultiSigGroupTask {
  constructor(config) {
    this._label = config.label;
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
}

class JoinMultiSigGroup {
  constructor() {
    this.aid = Profile.getDefaultAID();
    Contacts.requestList();
    this.groupAlias = '';
    let notif = Notify.findByType('multisig');
    this.aids = notif.data.aids;
    this.ked = notif.data.ked;
    this.fractionallyWeighted = Array.isArray(this.ked.kt);
  }

  confirmAndSign(vnode) {
    KERI.participateGroupInception(this.groupAlias, {
      delpre: this.ked.di,
      aids: this.aids,
      isith: this.ked.kt,
      nsith: this.ked.nt,
      toad: Number(this.ked.bt),
      wits: this.ked.b,
    }).then(() => {
      console.log('inception complete');
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
            <h4>Signers (in order):</h4>
            {this.aids.map((signer, i) => {
              console.log(signer);
              let name = '';
              let contact = Contacts.filterById(signer);
              console.log(contact);
              if (contact.length === 1) {
                name = contact[0].alias;
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
                    {this.fractionallyWeighted && <div class="uneditable-value">{this.ked.kt[i]}</div>}
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
