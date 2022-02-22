import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
class IntroToQDACRole {
  constructor(vnode) {
    this.step = 0;

    this.steps = [
      <>
        <h3>
          Intro to the <u>QDAC</u> Role
        </h3>
        <img src={approveRequest} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} />
        <p class="p-tag">
          You have now created your QVI Delegated AID! While you are waiting for your QVI credentials, here is a brief
          introduction to some of the tasks you can complete in your role.
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
        <h3>Delegate Credentials</h3>
        <img src={addNewContacts} style={{ width: '50%', margin: '4rem 0 4rem 4rem' }} />
        <p class="p-tag">
          You have now created your QVI Delegated AID! While you are waiting for your QVI credentials, here is a brief
          introduction to some of the tasks you can complete in your role.
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
        <h3>Perform Key Rotation</h3>
        <img src={verifyCredentials} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} />
        <p class="p-tag">
          The QDAGC performs key rotations to ensure the security of the credentials given to QDACs. If any security
          issues come up, the GDAC can always rotate keys so that they are new.
          <br />
          <br />
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" />
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = IntroToQDACRole;
