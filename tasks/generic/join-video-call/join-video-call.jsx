import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
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

class GleifGenesisEvent {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <h3>GLEIF Genesis Event</h3>
        <p class="p-tag">This module will take you through the steps for GLEIF AID Genesis.</p>
        <h3>Steps to Create GLEIF Root AID</h3>
        <p class="p-tag">
          <div class="flex flex-column">
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Join a Video Call with all GLEIF Controllers.</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">
                Use an OOBI protocol to share your GLEIF Delegated AID and service endpoints with the other Controllers.
              </p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Send a Challenge Response Message to the other Controllers.</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liFour} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">GLEIF Controllers sign and return Challenge Message.</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
              <img src={liFive} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Each GLEIF Controller must verify all signatures.</p>
            </div>
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
          In order to start the authentication process, you will need to initiate an real-time OOBI session in which you
          and the other GRACs are present, You will accept all their text strings on a Video Call so that you can
          receive their identifying information.
          <br />
          <br />
        </p>
        <h3>Generate OOBI</h3>
        <br />
        <br />
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
class SendOobiToGracs {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={addNewContacts} style={{ width: '50%', margin: '0 0 1rem 0' }} />
        <h3>
          Send OOBI to <u>GRACs</u>
        </h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy this OOBI (AID + URL) to share your identifying information with the GRACs, and paste it into the Video
          Call.
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
          Remain in the Video Call. A Challenge Message will be generated and sent to you for verification purposes.
          <br />
          <br />
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
        <h3>Send Challenge Message</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Enter the 12-word challenge message into the chat and send to the GAR.
          <br />
          <br />
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
        <h3>Verification in Progress</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the GAR verifies your signature and approves the issuance of your vLEI Credentials.
          <br />
          <br />
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
    this.currentState = 'gleif-genesis';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'gleif-genesis' && (
          <GleifGenesisEvent
            continue={() => {
              this.currentState = 'video-call';
            }}
          />
        )}
        {this.currentState === 'video-call' && (
          <VideoCall
            back={() => {
              this.currentState = 'gleif-genesis';
            }}
            continue={() => {
              this.currentState = 'send-oobi';
            }}
          />
        )}
        {this.currentState === 'send-oobi' && (
          <SendOobiToGracs
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
