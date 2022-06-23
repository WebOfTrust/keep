import m from 'mithril';
import { Button, Card, Checkbox, TextField } from '../../../../../src/app/components';
import {KERI, Profile} from '../../../../../src/app/services';

/*
 * EnterChallengesForm
 *
 * attrs
 * identifiers - an array of agent identifiers
 */

class EnterChallengesForm {
  constructor(vnode) {
    this.alias = Profile.getDefaultAID(vnode.attrs.aidToSend).name;
    this.aliases = vnode.attrs.participants.oobis.map((oobi) => {
      return oobi.alias;
    });
  }

  signChallengePromise(signer) {
    return KERI.signChallengeMessage(this.alias, signer.id, signer.challengeMessage.trim().split(' '));
  }

  view(vnode) {
    return (
      <>
        <div style={{ maxHeight: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem' }}>
          {vnode.attrs.participants.oobis.map((signer, index) => {
            return (
              <>
                <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0' }}>
                  <div class="flex flex-align-center">
                    <h5 style={{ minWidth: '100px' }}>Alias:</h5>
                    <p class="p-tag-bold">{signer.alias}</p>
                  </div>
                  <div class="flex flex-justify-between">
                    <h5 style={{ minWidth: '100px' }}>Message:</h5>
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
                    <div class="flex flex-justify-end" style={{ marginTop: '1rem' }}>
                      <Button
                        class="button--no-transform"
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
                    </div>
                  ) : (
                    <div class="flex flex-align-center flex-justify-between" style={{ marginTop: '1.5rem' }}>
                      <div class="flex flex-align-left flex-justify-between">
                        <label
                          class="font-color--battleship"
                          style={{ marginTop: '1rem', fontWeight: 'bold', textDecoration: 'underline' }}
                        >
                          Confirmed?
                        </label>
                        <Checkbox
                          checked={signer.confirmed}
                          onclick={() => {
                            signer.confirmed = !signer.confirmed;
                          }}
                        />
                      </div>
                      <Button
                        class="button--no-transform"
                        raised
                        label="Resend"
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
                    </div>
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
