import m from 'mithril';
import { Button, TextField, TextTooltip } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import approveRequest from '../../../src/assets/img/approve-request.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
import responseMessage from '../../../src/assets/img/response-message.png';

class OpeningVerify {
  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Verify Credentials</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Credentials demonstrate that the authorized person has the authority to transact on behalf of a business.
          <br></br>
          <br></br>
          To get started, are you looking to verify an existing contact’s credentials, or a new contact?
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Existing" />
          <Button class="button--big button--no-transform" raised label="New Contact" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class StepsToVerify {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <h3>Verify Credentials</h3>
        <p class="p-tag">
          This module will take you through the steps of how to authenticate Identity and verify credentials. Below are
          the steps for how to complete the process:
        </p>
        <h3>Steps to Verify Credentials</h3>
        <ol class="styled-ol" style={{ margin: '2rem 0' }}>
          <li>Join a Video Call with the person you are looking to verify. </li>
          <li>Use an OOBI protocol to share your Verifier AID.</li>
          <li>Send a Challenge Message to the person you are looking to verify. </li>
          <li>Person signs and returns Challenge Message.</li>
          <li>Person is verified, and you can now view their credentials.</li>
        </ol>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class InitiateVideoCall {
  view(vnode) {
    return (
      <>
        <h3>Initiate a Video Call</h3>
        <p class="p-tag">
          In order to start the authentication process, you will need to complete an real-time OOBI session in which you
          are both present, You will accept their text string on a Video Call so that you can receive their identifying
          information.
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

class AcceptOOBI {
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
        <h3>
          Accept{' '}
          <TextTooltip label={<u>OOBI</u>}>
            OOBI is an out of band (meaning outside this software) interaction.
          </TextTooltip>
        </h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          While on the Video Call, make sure to obtain the the <strong>URL and AID</strong>. When you have both please
          press continue.
        </p>
        <label>
          <strong>AID:</strong>
        </label>
        <TextField
          outlined
          fluid
          iconTrailing={{
            icon: 'content_copy',
          }}
          style={{ margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
          value={this.oobi.alias}
        />
        <label>
          <strong>URL:</strong>
        </label>
        <TextField
          outlined
          fluid
          iconTrailing={{
            icon: 'content_copy',
          }}
          style={{ margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
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

class GenerateChallengeMessage {
  constructor() {}

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Generate Challenge Message</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          The Challenge Message generated will be sent for verification purposes
        </p>

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
class PasteChallengeMessage {
  constructor() {
    this.challengeMessage = '';
  }

  signChallengeMessage(vnode) {
    KERI.signChallengeMessage('qar aid', this.challengeMessage.split(' '))
      .then(() => {
        console.log('challenge signed');
        vnode.attrs.continue();
      })
      .catch((err) => {
        console.log('signChallengeMessage', err);
      });
  }

  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Paste Challenge Message into Chat</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy the Challenge Message into the chat box while on the Video Call.
        </p>
        <TextField
          outlined
          textarea
          fluid
          style={{ margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
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
            label="Generate"
            onclick={() => {
              this.signChallengeMessage(vnode);
            }}
          />
        </div>
      </>
    );
  }
}
class ChallengeMessageInProgress {
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Challenge Message in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when they sign and return the Challenge Message.
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class VerifyCredentials {
  constructor() {
    // this.currentState = 'send-oobi';
    this.currentState = 'opening-verify';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'opening-verify' && (
          <OpeningVerify
            continue={() => {
              this.currentState = 'steps-to-verify';
            }}
          />
        )}
        {this.currentState === 'steps-to-verify' && (
          <StepsToVerify
            continue={() => {
              this.currentState = 'initiate-video-call';
            }}
          />
        )}
        {this.currentState === 'initiate-video-call' && (
          <InitiateVideoCall
            back={() => {
              this.currentState = 'steps-to-verify';
            }}
            continue={() => {
              this.currentState = 'accept-oobi';
            }}
          />
        )}
        {this.currentState === 'accept-oobi' && (
          <AcceptOOBI
            back={() => {
              this.currentState = 'initiate-video-call';
            }}
            continue={() => {
              this.currentState = 'generate-challenge-message';
            }}
          />
        )}
        {this.currentState === 'generate-challenge-message' && (
          <GenerateChallengeMessage
            back={() => {
              this.currentState = 'accept-oobi';
            }}
            continue={() => {
              this.currentState = 'paste-challenge-message';
            }}
          />
        )}
        {this.currentState === 'paste-challenge-message' && (
          <PasteChallengeMessage
            back={() => {
              this.currentState = 'generate-challenge-message';
            }}
            continue={() => {
              this.currentState = 'challenge-message-progress';
            }}
          />
        )}
        {this.currentState === 'challenge-message-progress' && <ChallengeMessageInProgress end={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = VerifyCredentials;
