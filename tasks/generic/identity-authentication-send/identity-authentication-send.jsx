import m from 'mithril';
import { Button, TextField, TextTooltip } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
import responseMessage from '../../../src/assets/img/response-message.png';

class IdentityAuthenticationSend {
  constructor(vnode) {
    this.step = 0;

    this.steps = [
      <>
        <h3>QVI Identity Authentication</h3>
        <p class="p-tag">
          This module will take you through the steps of how to complete the verification process and receive a QVI vLEI
          Credential.
        </p>
        <h3>Steps to Identity Authentication</h3>
        <ol class="styled-ol" style={{ margin: '2rem 0' }}>
          <li>Join a Video Call with a GAR</li>
          <li>Use an OOBI protocol to share your AID with the GAR.</li>
          <li>Receive a Challenge Message from the GAR.</li>
          <li>Sign and return Challenge Message.</li>
          <li>GAR will issue QAR credentials and QAR receives Credentials in Credential Wallet.</li>
        </ol>
        <div class="flex flex-justify-end">
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
        <h3>Join a Video Call with a GAR</h3>
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
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Copy this OOBI (AID + URL) to share your identifying information with the GAR, and paste it into the Video
          Call.
        </p>
        <label>AID:</label>
        <TextField
          outlined
          fluid
          iconTrailing={{
            icon: 'content_copy',
          }}
          style={{ margin: '0 0 4rem 0' }}
        />
        <label>URL:</label>
        <TextField
          outlined
          fluid
          iconTrailing={{
            icon: 'content_copy',
          }}
          style={{ margin: '0 0 4rem 0' }}
        />
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
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Remain in the Video Call. A Challenge Message will be generated and sent to you for verification purposes.
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
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          Enter the 12-word challenge message into the chat and send to the GAR.
        </p>
        <TextField outlined textarea fluid style={{ margin: '0 0 4rem 0' }} />
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
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          You will be notified when the GAR verifies your signature and approves the issuance of your vLEI Credentials.
        </p>

        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = IdentityAuthenticationSend;
