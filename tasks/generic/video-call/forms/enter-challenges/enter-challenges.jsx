import m from 'mithril';
import { Button, Card, CarouselControls, Checkbox, TextField } from '../../../../../src/app/components';
import {KERI, Participants, Profile} from '../../../../../src/app/services';

class EnterChallengesForm {
  constructor(vnode) {
    this.validChallenge = true;
    this.selectedOobiIndex = 0;
    this.alias = Profile.getDefaultAID(vnode.attrs.aidToSend).name;
    this.aliases = vnode.attrs.participants.oobis.map((oobi) => {
      return oobi.alias;
    });
  }

  signChallengePromise(signer) {
    return KERI.signChallengeMessage(this.alias, signer.id, signer.challengeMessage.trim().split(' '));
  }

  validateChallenge(vnode, c) {
    if (c === '') {
      return true;
    }
    this.validChallenge = (c !== vnode.attrs.participants.words.join(' '));
  }

  view(vnode) {
    const signer = vnode.attrs.participants.oobis[this.selectedOobiIndex];
    return (
      <>
        <h4>Receive Challenge Messages</h4>
        <div style={{ maxHeight: '512px', overflowY: 'auto', margin: '0 0 1rem 0', paddingRight: '1rem' }}>
          <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0' }}>
            <div class="flex flex-align-center">
              <p class="font-color--battleship font-size--12 font-weight--bold" style={{ minWidth: '100px' }}>
                Alias:
              </p>
              <p class="p-tag-bold">{signer.alias}</p>
            </div>
            <div class="flex flex-justify-between">
              <p class="font-color--battleship font-size--12 font-weight--bold" style={{ minWidth: '100px' }}>
                Message:
              </p>
              <TextField
                outlined
                fluid
                textarea
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                value={signer.challengeMessage}
                oninput={(e) => {
                  signer.challengeMessage = e.target.value;
                  this.validateChallenge(vnode, signer.challengeMessage);
                }}
              />
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              {!this.validChallenge && (
                  <>
                    You cannot use your own challenge message
                  </>
              )}
            </div>
            {!signer.sent ? (
              <div class="flex flex-justify-end" style={{ marginTop: '1rem' }}>
                <Button
                  outlined
                  label="Send"
                  disabled={!this.validChallenge}
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
          {vnode.attrs.participants.oobis.length > 1 && (
            <CarouselControls
              items={vnode.attrs.participants.oobis.length}
              active={this.selectedOobiIndex}
              setActive={(idx) => {
                this.selectedOobiIndex = idx;
              }}
            />
          )}
        </div>
      </>
    );
  }
}

module.exports = EnterChallengesForm;
