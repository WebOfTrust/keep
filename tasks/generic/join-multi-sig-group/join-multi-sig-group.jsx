import m from 'mithril';
import { Button, TextField } from '../../../src/app/components';
import { KERI, Profile, Notify, Contacts } from '../../../src/app/services';
import todoList from '../../../src/assets/img/to-do-list.png';
import secureMessaging from '../../../src/assets/img/secure-messaging.png';

// {
//   "data": {
//       "src": "E-4-PsMBN0YEKyTl3zL0zulWcBehdaaG6Go5cMc0BzQ8",
//       "r": "/icp/init",
//       "aids": [
//           "E-4-PsMBN0YEKyTl3zL0zulWcBehdaaG6Go5cMc0BzQ8",
//           "EozYHef4je02EkMOA1IKM65WkIdSjfrL7XWDk_JzJL9o"
//       ],
//       "ked": {
//           "v": "KERI10JSON000215_",
//           "t": "icp",
//           "d": "EoZCKXPW7bG_Il3pfzjKZYzS80bCTZXTZja5ZS4-85jY",
//           "i": "EoZCKXPW7bG_Il3pfzjKZYzS80bCTZXTZja5ZS4-85jY",
//           "s": "0",
//           "kt": "1",
//           "k": [
//               "D-U6Sc6VqQC3rDuD2wLF3oR8C4xQyWOTMp4zbJyEnRlE",
//               "DQKeRX-2dXdSWS-EiwYyiQdeIwesvubEqnUYC5vsEyjo"
//           ],
//           "nt": "1",
//           "n": [
//               "E6UpCouA9mZA03hMFJLrhA0SvwR4HVNqf2wrZM-ydTSI",
//               "ENVtv0_G68psQhfWB-ZyVH1lndLli2LSmfSxxszNufoI"
//           ],
//           "bt": "3",
//           "b": [
//               "BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo",
//               "BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw",
//               "Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c"
//           ],
//           "c": [],
//           "a": []
//       }
//   }
// }

class JoinMultiSigGroup {
  constructor() {
    this.currentState = 'new-multi-sig-group';
    this.aid = Profile.getDefaultAID();
    Contacts.requestList();
    this.groupAlias = '';
    let notif = Notify.findByType("multisig")
    this.aids = notif.data.aids
    this.ked = notif.data.ked
    this.fractionallyWeighted = Array.isArray(this.ked.kt)
  }

  confirmAndSign() {
    KERI.participateGroupInception(this.groupAlias, {
      aids: this.aids,
      isith: this.ked.kt,
      nsith: this.ked.nt,
      toad: Number(this.ked.bt),
      wits: this.ked.b,
    }).then(() => {
      console.log('inception complete');
      this.currentState = 'event-complete';
    });
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'new-multi-sig-group' && (
          <>
            <img src={todoList} style={{ width: '188px', margin: '4rem 0 0 0' }} />
            <h3>New Multi-Sig Group</h3>
            <p class="p-tag">View the multi-sig group and confirm that these individuals are authorized.</p>
            <div class="flex flex-justify-end">
              <Button
                class="button--big button--no-transform"
                raised
                label="View"
                onclick={() => {
                  this.currentState = 'review-members';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'review-members' && (
            <>
              <h3>Review and Confirm</h3>
              <p>Review signers to make sure the list is complete.</p>
              <h4>Signers (in order):</h4>
              {this.aids.map((signer, i) => {
                console.log(signer)
                let name = ""
                let contact = Contacts.filterById(signer)
                console.log(contact)
                if (contact.length === 1) {
                  name = contact[0].alias
                } else if(signer === this.aid.prefix){
                  name = this.aid.name + " (Your AID)"
                } else {
                  name = "Unknown AID"
                }
                return (
                    <>
                      <TextField outlined style={{ margin: '0 2rem 2rem 0' }} value={name} />
                      {this.fractionallyWeighted && <TextField outlined style={{ width: '80px' }} value={this.ked.kt[i]} />}
                    </>
                );
              })}

              <div class="flex flex-justify-between">
                <Button
                    class="button--gray-dk button--big button--no-transform"
                    raised
                    label="Go Back"
                    onclick={() => {
                      this.currentState = 'review-members';
                    }}
                />
                <Button
                    class="button--big button--no-transform"
                    raised
                    label="Confirm"
                    onclick={() => {
                      this.currentState = 'create-group-alias';
                    }}
                />
              </div>
            </>
        )}
        {this.currentState === 'create-group-alias' && (
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
                  this.confirmAndSign();
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'event-complete' && (
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

module.exports = JoinMultiSigGroup;
