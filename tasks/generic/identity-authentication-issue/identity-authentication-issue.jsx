import m from 'mithril';
import { Button, TextField, TextTooltip, Modal } from '../../../src/app/components';
import { KERI, Profile } from '../../../src/app/services';
import addNewContacts from '../../../src/assets/img/add-new-contacts.svg';
import responseMessage from '../../../src/assets/img/response-message.svg';
import uploadFile from '../../../src/assets/img/upload-file.svg';
import wait from '../../../src/assets/img/wait.svg';

class WaitModal {
  view(vnode) {
    return (
      <>
        <Modal
          isOpen={vnode.attrs.isOpen}
          backdropClose={false}
          onClose={vnode.attrs.onClose}
          style={{ width: '560px' }}
          header={<h3 class="font-weight--medium">Wait! Did you complete Identity Assurance?</h3>}
          content={
            <>
              <div class="flex flex-align-center flex-justify-center">
                <img style={{ width: '150px', margin: '2rem 5rem 0 0' }} src={wait} />
                <p
                  class="font-weight--light font-color--battleship"
                  style={{ lineHeight: '2', letterSpacing: '0.15px' }}
                >
                  Verification is a two-step process. Before authenticating, make sure that Identity Assurance is
                  completed.
                </p>
              </div>
            </>
          }
          footer={
            <>
              <div class="flex flex-justify-center" style={{ marginTop: '3rem' }}>
                <Button
                  raised
                  class="button--big button--extraPadding"
                  label="Identity Assurance is Done"
                  onclick={vnode.attrs.onClose}
                />
              </div>
            </>
          }
        />
      </>
    );
  }
}

class StepsToAuthenticate {
  constructor(vnode) {
    this.waitModalOpen = true;
    Profile.isLead = true;
  }

  view(vnode) {
    return (
      <>
        <WaitModal
          isOpen={this.waitModalOpen}
          onClose={() => {
            this.waitModalOpen = false;
          }}
        />
        <h3>Identity Authentication</h3>
        <p class="p-tag">
          {vnode.attrs.steps ? (
            vnode.attrs.steps.paragraph
          ) : (
            <>
              This module will take you through the steps of how to authenticate a user's identity. Below are the steps
              for how to complete the process:
            </>
          )}
        </p>
        <h3>Steps to Identity Authentication</h3>
        <ol class="styled-ol" style={{ margin: '2rem 0' }}>
          {vnode.attrs.steps ? (
            vnode.attrs.steps.list.map((element) => {
              return <li>{element}</li>;
            })
          ) : (
            <>
              <li>Join a Video Call</li>
              <li>Use an OOBI protocol to obtain the user's AID</li>
              <li>Use an OOBI protocol to share your AID</li>
              <li>Obtain and sign a Challenge Message</li>
              <li>Generate and send a Challenge Message</li>
              <li>User signs and returns Challenge Message</li>
              <li>You verify signature and issue credentials</li>
            </>
          )}
        </ol>
        <div class="flex flex-justify-end">
          {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class JoinVideoCall {
  view(vnode) {
    return (
      <>
        <h3>Initiate a Video Call</h3>
        <p class="p-tag">
          In order to start the authentication process, you will need to complete an real-time OOBI session in which you
          and the user you wish to verify are present, You will accept their OOBI on a Video Call so that you can
          receive their identifying information.
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ResolveOOBI {
  constructor() {
    this.alias = '';
    this.oobi = {
      alias: '',
      url: '',
    };
  }

  resolveOOBI(vnode) {
    KERI.listIdentifiers()
      .then((identifiers) => {
        this.alias = identifiers[0].name;
        KERI.resolveOOBI(this.alias, this.oobi.alias, this.oobi.url)
          .then(() => {
            vnode.attrs.continue();
          })
          .catch((err) => {
            console.log('resolveOOBI', err);
          });
      })
      .catch((err) => {
        console.log('listIdentifiers', err);
      });
  }

  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '40%', margin: '1.5rem 0 0 0' }} />
        <h3>
          Accept{' '}
          <TextTooltip label={<u>OOBI</u>}>
            OOBI is an Out Of Band (meaning outside this software) interaction.
          </TextTooltip>
        </h3>
        <p class="p-tag">
          {vnode.attrs.acceptOobi ? (
            vnode.attrs.acceptOobi.paragraph
          ) : (
            <>
              While on the Video Call, make sure to obtain the other party's <b>URL and OOBI</b>. When you have both for
              each party, please press continue.
            </>
          )}
        </p>
        <label>
          {vnode.attrs.acceptOobi ? (
            vnode.attrs.acceptOobi.alias
          ) : (
            <>
              <strong>Alias:</strong>
            </>
          )}
        </label>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 2rem 0' }}
          value={this.oobi.alias}
          iconTrailing={{ icon: 'content_copy' }}
          oninput={(e) => {
            this.oobi.alias = e.target.value;
          }}
        />
        <label>
          <strong>URL:</strong>
        </label>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 4rem 0' }}
          iconTrailing={{ icon: 'content_copy' }}
          value={this.oobi.url}
          oninput={(e) => {
            this.oobi.url = e.target.value;
          }}
        />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            disabled={!this.oobi.alias || !this.oobi.url}
            onclick={() => {
              this.resolveOOBI(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

class SendOOBI {
  constructor() {
    this.oobi = {
      alias: '',
      url: '',
    };
  }

  oninit() {
    KERI.listIdentifiers()
      .then((identifiers) => {
        this.oobi.alias = identifiers[0].name;
        KERI.getOOBI(identifiers[0].name, 'witness')
          .then((oobi) => {
            this.oobi.url = oobi.oobis[0];
          })
          .catch((err) => {
            console.log('getOOBI', err);
          });
      })
      .catch((err) => {
        console.log('listIdentifiers', err);
      });
  }

  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '40%', margin: '1.5rem 0 0 0' }} />
        <h3>Send OOBI</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy this OOBI (AID + URL) to share your identifying information and paste it into the ideo Call.
        </p>
        <label>Alias:</label>
        <TextField
          outlined
          fluid
          iconTrailing={{
            icon: 'content_copy',
          }}
          style={{ margin: '0 0 4rem 0' }}
          value={this.oobi.alias}
        />
        <label>URL:</label>
        <TextField
          outlined
          fluid
          iconTrailing={{
            icon: 'content_copy',
          }}
          style={{ margin: '0 0 4rem 0' }}
          value={this.oobi.url}
        />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class IdentityVerificationInProgress {
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Identity Verification in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Remain in the Video Call until the user has resolved your OOBI.
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class SignChallengeMessage {
  constructor() {
    this.challengeMessage = '';
  }

  signChallengeMessage(vnode) {
    KERI.listIdentifiers()
      .then((identifiers) => {
        KERI.getContacts()
          .then((contacts) => {
            KERI.signChallengeMessage(identifiers[0].name, contacts[0].id, this.challengeMessage.split(' '))
              .then(() => {
                vnode.attrs.continue();
              })
              .catch((err) => {
                console.log('signChallengeMessage', err);
              });
          })
          .catch((err) => {
            console.log('getContacts', err);
          });
      })
      .catch((err) => {
        console.log('listIdentifiers', err);
      });
  }

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Send Challenge Message</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Enter the 12-word challenge message into the chat and send to the credential issuer.
        </p>
        <TextField
          outlined
          textarea
          fluid
          style={{ margin: '0 0 4rem 0' }}
          value={this.challengeMessage}
          oninput={(e) => {
            this.challengeMessage = e.target.value;
          }}
        />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.signChallengeMessage(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

class GenerateChallengeMessage {
  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Generate Challenge Message</h3>
        <p class="p-tag">The Challenge Message generated will be sent for verification purposes.</p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Generate" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class CopyChallengeMessage {
  constructor() {
    this.challangeMessage = '';
  }

  oninit() {
    KERI.generateChallengeMessage()
      .then((res) => {
        this.challangeMessage = res.words.join(' ');
      })
      .catch((err) => {
        console.log('generateChallengeMessage', err);
      });
  }

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Copy Challenge Message</h3>
        <p class="p-tag">Copy the Challenge Message into the chat box while on the Video Call.</p>
        <TextField outlined textarea fluid style={{ margin: '0 0 4rem 0' }} value={this.challangeMessage} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ChallengeMessageInProgress {
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Challenge Message in Progress</h3>
        <p class="p-tag">You will be notified when the user signs and returns the Challenge Message.</p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class IdentityAuthenticationIssue {
  constructor() {
    this.currentState = 'steps-to-authenticate';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'steps-to-authenticate' && (
          <StepsToAuthenticate
            steps={vnode.attrs.steps}
            continue={() => {
              this.currentState = 'join-video-call';
            }}
          />
        )}
        {this.currentState === 'join-video-call' && (
          <JoinVideoCall
            back={() => {
              this.currentState = 'steps-to-authenticate';
            }}
            continue={() => {
              this.currentState = 'resolve-oobi';
            }}
          />
        )}
        {this.currentState === 'resolve-oobi' && (
          <ResolveOOBI
            acceptOobi={vnode.attrs.acceptOobi}
            back={() => {
              this.currentState = 'join-video-call';
            }}
            continue={() => {
              this.currentState = 'send-oobi';
            }}
          />
        )}
        {this.currentState === 'send-oobi' && (
          <SendOOBI
            back={() => {
              this.currentState = 'resolve-oobi';
            }}
            continue={() => {
              this.currentState = 'identity-verification';
            }}
          />
        )}
        {this.currentState === 'identity-verification' && (
          <IdentityVerificationInProgress
            back={() => {
              this.currentState = 'send-oobi';
            }}
            continue={() => {
              this.currentState = 'sign-challenge-message';
            }}
          />
        )}
        {this.currentState === 'sign-challenge-message' && (
          <SignChallengeMessage
            back={() => {
              this.currentState = 'identity-verification';
            }}
            continue={() => {
              this.currentState = 'generate-challenge-message';
            }}
          />
        )}
        {this.currentState === 'generate-challenge-message' && (
          <GenerateChallengeMessage
            back={() => {
              this.currentState = 'sign-challenge-message';
            }}
            continue={() => {
              this.currentState = 'copy-challenge-message';
            }}
          />
        )}
        {this.currentState === 'copy-challenge-message' && (
          <CopyChallengeMessage
            back={() => {
              this.currentState = 'generate-challenge-message';
            }}
            continue={() => {
              this.currentState = 'challenge-message-in-process';
            }}
          />
        )}
        {this.currentState === 'challenge-message-in-process' && (
          <ChallengeMessageInProgress
            back={() => {
              this.currentState = 'copy-challenge-message';
            }}
            end={vnode.attrs.end}
          />
        )}
      </>
    );
  }
}

module.exports = IdentityAuthenticationIssue;
