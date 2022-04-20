import m from 'mithril';
import { Button, TextField } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
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
    this.aid = '';
    this.groupAlias = '';
    KERI.listIdentifiers()
      .then((identifiers) => {
        this.aid = identifiers[0].prefix;
      })
      .catch((err) => {
        console.log('listIdentifiers', err);
      });
  }

  confirmAndSign() {
    KERI.participateGroupInception(this.groupAlias, {
      aids: ['E-4-PsMBN0YEKyTl3zL0zulWcBehdaaG6Go5cMc0BzQ8', 'EozYHef4je02EkMOA1IKM65WkIdSjfrL7XWDk_JzJL9o'],
      isith: '1',
      nsith: '1',
      toad: 3,
      wits: [
        'BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo',
        'BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw',
        'Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c',
      ],
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
            <h3>New Multi-Sig Set</h3>
            <p class="p-tag">View the multi-sig group and confirm that these individuals are authorized.</p>
            <div class="flex flex-justify-end">
              <Button
                class="button--big button--no-transform"
                raised
                label="View"
                onclick={() => {
                  this.currentState = 'select-members';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'select-members' && (
          <>
            <h3>Select Multi-Sig Group Members</h3>
            <p>Please select the multi-sig group members that will sign to issue this credential.</p>
            <div class="flex flex-align-center">
              <div style={{ marginRight: '1rem' }}>
                <h3 class="p-tag">#1</h3>
              </div>
              <div class="flex-1">
                <TextField outlined fluid />
              </div>
            </div>
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              <Button
                class="button--big button--no-transform"
                raised
                label="Confirm & Sign"
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
