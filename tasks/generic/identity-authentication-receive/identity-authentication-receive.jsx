import m from 'mithril';
import { Button, TextField, TextTooltip } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import approveRequest from '../../../src/assets/img/approve-request.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
import responseMessage from '../../../src/assets/img/response-message.png';

class StepsToAuthenticate {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <h3>Identity Authentication</h3>
        <p class="p-tag">
          This module will take you through the steps of how to complete the verification process and receive a vLEI
          Credential.
        </p>
        <h3>Steps to Identity Authentication</h3>
        <ol class="styled-ol" style={{ margin: '2rem 0' }}>
          <li>Join a Video Call</li>
          <li>Use an OOBI protocol to share your AID</li>
          <li>Use an OOBI protocol to obtain the user's AID</li>
          <li>Generate and send a Challenge Message</li>
          <li>User signs and returns Challenge Message</li>
          <li>Receive and sign a Challenge Message</li>
          <li>Receive notification of your newly issued credentials in your credential wallet</li>
        </ol>
        <div class="flex flex-justify-end">
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
        <h3>Join a Video Call</h3>
        <p class="p-tag">
          In order to start the authentication process, you will need to complete an real-time OOBI session, sharing
          your OOBI on a Video Call so that you can provide your information.
        </p>
        <h3>
          Generate{' '}
          <TextTooltip label={<u>OOBI</u>}>
            OOBI is an out of band (meaning outside this software) interaction.
          </TextTooltip>
        </h3>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
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
    KERI.listIdentifiers().then((identifiers) => {
      this.oobi.alias = identifiers[0].name;
      KERI.getOOBI(identifiers[0].name, 'witness').then((oobi) => {
        this.oobi.url = oobi.oobis[0];
      });
    });
  }

  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '40%', margin: '1.5rem 0 0 0' }} />
        <h3>Send OOBI</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy this OOBI (AID + URL) to share your identifying information and paste it into the Video Call.
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
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
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
          Remain in the Video Call. An OOBI sent to you for verification purposes.
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ResolveOOBI {
  constructor() {
    this.oobi = {
      alias: '',
      url: '',
    };
  }

  resolveOOBI(vnode) {
    KERI.resolveOOBI(this.oobi.alias, this.oobi.url).then(() => {
      vnode.attrs.continue();
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
          While on the Video Call, make sure to obtain the other party's <b>URL and OOBI</b>. When you have both for
          each party, please press continue.
        </p>
        <label>Alias:</label>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 2rem 0' }}
          value={this.oobi.alias}
          oninput={(e) => {
            this.oobi.alias = e.target.value;
          }}
        />
        <label>URL:</label>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 4rem 0' }}
          value={this.oobi.url}
          oninput={(e) => {
            this.oobi.url = e.target.value;
          }}
        />
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.resolveOOBI(vnode);
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
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
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
    KERI.generateChallengeMessage().then((res) => {
      console.log(res);
      this.challangeMessage = res.words.join(' ');
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
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class VerificationInProgress {
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Verification in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when your signature is verified and approved, and credentials are issued.
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.continue} />
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
    KERI.listIdentifiers().then((identifiers) => {
      KERI.getContacts().then((contacts) => {
        KERI.signChallengeMessage(identifiers[0].name, contacts[0].id, this.challengeMessage.split(' ')).then(() => {
          vnode.attrs.end();
        });
      });
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
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button
            class="button--big button--no-transform"
            raised
            label="Close"
            onclick={() => {
              this.signChallengeMessage(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

class IdentityAuthenticationReceive {
  constructor() {
    // this.currentState = 'send-oobi';
    this.currentState = 'steps-to-authenticate';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'steps-to-authenticate' && (
          <StepsToAuthenticate
            continue={() => {
              this.currentState = 'join-video-call';
            }}
          />
        )}
        {this.currentState === 'join-video-call' && (
          <JoinVideoCall
            continue={() => {
              this.currentState = 'send-oobi';
            }}
          />
        )}
        {this.currentState === 'send-oobi' && (
          <SendOOBI
            continue={() => {
              this.currentState = 'resolve-oobi';
            }}
          />
        )}
        {this.currentState === 'identity-verification' && (
          <IdentityVerificationInProgress
            continue={() => {
              this.currentState = 'generate-challenge-message';
            }}
          />
        )}
        {this.currentState === 'resolve-oobi' && (
          <ResolveOOBI
            continue={() => {
              this.currentState = 'identity-verification';
            }}
          />
        )}
        {this.currentState === 'generate-challenge-message' && (
          <GenerateChallengeMessage
            continue={() => {
              this.currentState = 'copy-challenge-message';
            }}
          />
        )}
        {this.currentState === 'copy-challenge-message' && (
          <CopyChallengeMessage
            continue={() => {
              this.currentState = 'verification';
            }}
          />
        )}
        {this.currentState === 'verification' && (
          <VerificationInProgress
            continue={() => {
              this.currentState = 'verification';
            }}
          />
        )}
        {this.currentState === 'sign-challenge-message' && <SignChallengeMessage end={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = IdentityAuthenticationReceive;
