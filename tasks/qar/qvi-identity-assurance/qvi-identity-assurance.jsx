import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';
import liFour from '../../../src/assets/img/li-four.png';
import liFive from '../../../src/assets/img/li-five.png';
class QVIIdentityAssurance {
  constructor(vnode) {
    this.step = 0;

    this.steps = [
      <>
        <h3>QVI Identity Assurance</h3>
        {/* <img src={approveRequest} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} /> */}
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
        >
          This module will take you through the steps of how to complete the verification process and receive a QVI vLEI
          Credential.
          <br />
          <br />
        </p>
        <h3>Steps to Identity Assurance</h3>
        <div class="flex flex-column">
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
            <p
              class="font-color--battleship"
              style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
            >
              Join a Video Call with a GAR
            </p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
            <p
              class="font-color--battleship"
              style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
            >
              Complete an OOBI exchange to obtain QVI AID information.
            </p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
            <p
              class="font-color--battleship"
              style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
            >
              Receive a Challenge Message from the GAR.
            </p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liFour} style={{ margin: '1rem 10px 1rem 0' }} />
            <p
              class="font-color--battleship"
              style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
            >
              Sign and return Challenge Message.
            </p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liFive} style={{ margin: '1rem 10px 1rem 0' }} />
            <p
              class="font-color--battleship"
              style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
            >
              GAR will issue QAR credentials.
            </p>
          </div>
        </div>

        <div class="flex flex-justify-end">
          {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>Join a Zoom Call with a GAR</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', margin: '4rem, 0 4rem 0' }}
        >
          In order to start the authentication process, you will need to complete an real-time OOBI session, sharing
          your text string on a Video Call so that you can provide your information.
          <br />
          <br />
        </p>
        <h3>Generate OOBI</h3>
        <br />
        <br />
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={addNewContacts} style={{ width: '40%', margin: '1.5rem 0 0 0' }} />
        <h3>Send OOBI to GAR</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2rem' }}
        >
          Copy this OOBI to share your identifying information with the GAR, and paste it into the Video Call.
          <br />
          <br />
        </p>
        <TextField outlined style={{ height: '3rem', width: '100%', margin: '0 0 4rem 0' }} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={uploadFile} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>QVI Identity Verification in Progress</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2rem' }}
        >
          Remain in the Video Call. A Challenge Message will be generated and sent to you for verification purposes.
          <br />
          <br />
        </p>

        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Send Challenge Message</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2rem' }}
        >
          Enter the 12-word challenge message into the chat and send to the GAR.
          <br />
          <br />
        </p>
        <TextField outlined style={{ height: '5rem', width: '100%', margin: '0 0 4rem 0' }} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Verification in Progress</h3>
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '2rem', marginBottom: '2rem' }}
        >
          You will be notified when the GAR verifies your signature and approves the issuance of your vLEI Credentials.
          <br />
          <br />
        </p>

        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="close" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = QVIIdentityAssurance;
