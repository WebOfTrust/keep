import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
class IntroToYourRole {
  constructor(vnode) {
    this.step = 0;

    this.steps = [
      <>
        <h3>Intro to the GAR Role</h3>
        <img src={approveRequest} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} />
        <p class="p-tag">
          You have now created your GLEIF Delegated AID! While you are waiting for your GLEIF credentials, here is a
          brief introduction to some of the tasks you can complete in your role.
          <br />
          <br />
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" />
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
        <h3>Complete Identity Assurance</h3>
        <img src={addNewContacts} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} />
        <p class="p-tag">
          Once you are authorized to act on behalf of GLEIF, you perform identity assurance of a person serving in the
          role of QAR. A GAR and the QAR will complete a real-time OOBI session in which the GAR and the QAR are
          present.
          <br />
          <br />
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" />
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
        <h3>Grant Credentials</h3>
        <img src={verifyCredentials} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} />
        <p class="p-tag">
          The GAR approves the issuance of the QVI vLEI Credential and the QVI receives the credential in its credential
          wallet. The QVI vLEI Credential may be added or revoked at any time.
          <br />
          <br />
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

module.exports = IntroToYourRole;
