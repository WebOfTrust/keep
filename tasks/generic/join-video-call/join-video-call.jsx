import m from 'mithril';
import { Button, Card, TextField, TextTooltip } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.png';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import approveRequest from '../../../src/assets/img/approve-request.png';
import uploadImage from '../../../src/assets/img/upload-image.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import githubLogo from '../../../src/assets/img/github-logo.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';
import liFour from '../../../src/assets/img/li-four.png';
import liFive from '../../../src/assets/img/li-five.png';

class DelegatingAIDs {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <h3>Delegating AIDs</h3>
        <p class="p-tag">This module will take you through the steps for AID Delegation. </p>
        <h3>Steps to AID Delegation</h3>
        <p class="p-tag">
          <div class="flex flex-column">
            <ol class="styled-ol" style={{ margin: '2rem 0' }}>
              <li>Initiate a Video Call</li>
              <li>Use an OOBI protocol to share your AID and service endpoints with the Initiator.</li>
              <li>Send a Challenge Message</li>
              <li>You will sign and return Challenge Message.</li>
              <li>Once you have signed, you must verify all signatures.</li>
            </ol>
          </div>
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class VideoCall {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <h3>Join a Video Call</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          In order to start the authentication process, you will need to initiate an real-time OOBI session in which
          everyone is present, You will accept all their AID and URL on a Video Call so that you can receive their
          identifying information.
        </p>
        <h3>
          <TextTooltip
            label={
              <b>
                Generate <u>OOBI</u>
              </b>
            }
          >
            <b>OOBI</b> is an Out Of Band Introduction that connects an AID with a service endpoint URL.
          </TextTooltip>
        </h3>
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

class SendOOBI {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '50%', margin: '0 0 1rem 0' }} />
        <h3>Send OOBI</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy this OOBI (AID + URL) to share your identifying information, and paste it into the Video Call.
        </p>
        <h3>AID:</h3>
        <TextField
          style={{ height: '3rem', width: '100%', margin: '0 0 1rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        />
        <h3>URL:</h3>
        <TextField
          style={{ height: '3rem', width: '100%', margin: '0 0 2rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
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

class IdentityVerification {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Identity Verification in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Remain in the Video Call. The initiator will generate a challenge message and send it to you in this portal so
          that you may send it back for verification purposes.
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

class SendChallengeMessage {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Paste Challenge Message Below</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Enter the 12-word challenge message into the chat and send to the initiator via direct message.
        </p>
        <TextField
          style={{ height: '5rem', width: '100%', margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
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

class VerificationProgress {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Your Verification is Under Review</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when your signature is verified and you will resume on a Video Call to configure the
          multi-sig set.
        </p>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="close" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class JoinVideoCall {
  constructor() {
    this.currentState = 'delegating-aids';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'delegating-aids' && (
          <DelegatingAIDs
            continue={() => {
              this.currentState = 'video-call';
            }}
          />
        )}
        {this.currentState === 'video-call' && (
          <VideoCall
            back={() => {
              this.currentState = 'delegating-aids';
            }}
            continue={() => {
              this.currentState = 'send-oobi';
            }}
          />
        )}
        {this.currentState === 'send-oobi' && (
          <SendOOBI
            back={() => {
              this.currentState = 'video-call';
            }}
            continue={() => {
              this.currentState = 'identity-verification';
            }}
          />
        )}
        {this.currentState === 'identity-verification' && (
          <IdentityVerification
            back={() => {
              this.currentState = 'send-oobi';
            }}
            continue={() => {
              this.currentState = 'send-challenge-message';
            }}
          />
        )}
        {this.currentState === 'send-challenge-message' && (
          <SendChallengeMessage
            back={() => {
              this.currentState = 'identity-verification';
            }}
            continue={() => {
              this.currentState = 'verification-progress';
            }}
          />
        )}
        {this.currentState === 'verification-progress' && <VerificationProgress end={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = JoinVideoCall;
