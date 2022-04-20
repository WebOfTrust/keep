import m from 'mithril';
import { Button, Card, TextField } from '../../src/app/components';
import { KERI, Participants } from '../../src/app/services';

/*
 * EnterChallengesForm
 *
 * attrs
 * identifiers - an array of agent identifiers
 */

class EnterChallengesForm {
  constructor(vnode) {
    this.alias = vnode.attrs.identifiers[0].name;
    this.aliases = Participants.oobis.map((oobi) => {
      return oobi.alias;
    });
  }

  signChallengePromise(signer) {
    return KERI.signChallengeMessage(this.alias, signer.id, signer.challengeMessage.split(' '));
  }

  view(vnode) {
    return (
      <>
        <div style={{ height: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem' }}>
          {Participants.oobis.map((signer, index) => {
            return (
              <>
                <Card class="card--fluid" style={{margin: '0 0 1.5rem 0'}}>
                    <div className="flex flex-align-center flex-justify-between">
                        <h5 style={{width: '100px'}}>{signer.alias}</h5>
                          <TextField
                            outlined
                            fluid
                            textarea
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                            value={signer.challengeMessage}
                            oninput={(e) => {
                              signer.challengeMessage = e.target.value;
                            }}
                          />
                    </div>
                  {!signer.sent ? (
                    <Button
                      class="button--big button--no-transform"
                      raised
                      label="Send"
                      onclick={() => {
                        this.signChallengePromise(signer)
                          .then(() => {
                            signer.sent = true;
                          })
                          .catch((err) => {
                            console.log('signChallengePromise', err);
                          });
                      }}
                    />
                  ) : (
                    <>
                      <label>
                        Out of Band Confirmation
                        <input
                          type="checkbox"
                          checked={signer.confirmed}
                          onchange={() => {
                            signer.confirmed = !signer.confirmed;
                          }}
                        />
                      </label>
                    </>
                  )}
                </Card>
              </>
            );
          })}
        </div>
      </>
    );
  }
}

module.exports = EnterChallengesForm;
