import m from 'mithril';
import { Button, Card, TextField, Select } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import declineRequest from '../../../src/assets/img/decline-request.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
class RevokeQviCredential {
  constructor(vnode) {
    this.step = 0;

    this.steps = [
      <>
        <img src={declineRequest} style={{ width: '60%', margin: '0 0 2rem 0' }} />
        <h3>Revocation of QVI vLEI Credential</h3>

        <p class="p-tag" style={{ margin: '4rem, 0 4rem 0' }}>
          This module will take you through the Revocation of a QVI vLEI Credential.
          <br />
          <br />
          If you are completing this it is because you have been notified either by the GLEIF QVI Relationship
          Management or the GLEIF vLEI Issuer Qualification team that the QVI no longer meets the requirements in the
          vLEI Issuer Qualification Agreement or of the Qualification Program.
        </p>
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
        <h3>Revocation of QVI vLEI Credential</h3>

        <p class="p-tag" style={{ margin: '4rem, 0 4rem 0' }}>
          Please select the organization credentials you would like to revoke.
        </p>
        <TextField
          outlined
          style={{ height: '3rem', width: '100%', margin: '0 0 2rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        />

        <Card
          class="card--fluid"
          style={{ margin: '0 0 2rem 0', height: '50%', cursor: 'pointer' }}
          onclick={() => {
            this.step++;
          }}
        >
          <div class="flex flex-align-center flex-justify-between">
            <h3>QVI Corp.</h3>
          </div>
        </Card>
        <Card
          class="card--fluid"
          style={{ margin: '0 0 2rem 0', height: '50%', cursor: 'pointer' }}
          onclick={() => {
            this.step++;
          }}
        >
          <div class="flex flex-align-center flex-justify-between">
            <h3>QWI Corp.</h3>
          </div>
        </Card>
      </>,
      <>
        <h3>Issue QVI vLEI Credentials</h3>

        <p class="p-tag" style={{ margin: '4rem, 0 4rem 0' }}>
          Contact
        </p>
        <TextField
          outlined
          style={{
            height: '3rem',
            width: '100%',
            margin: '0 0 2rem 0',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          }}
        />
        <p
          class="font-color--battleship"
          style={{ letterSpacing: '.15px', lineHeight: '1.7', margin: '4rem, 0 4rem 0', fontSize: '120%' }}
        >
          Credentials
        </p>
        <select
          style={{
            width: '100%',
            height: '4rem',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            border: 'none',
            borderRadius: '4px',
            margin: '0 0 4rem 0',
          }}
        >
          <option value="0">QAR for QVI Corp.</option>
          <option value="1">QAR for QWI Corp.</option>
        </select>
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
        <img src={declineRequest} style={{ width: '60%', margin: '0 0 2rem 0' }} />
        <h3>Revocation of QVI vLEI Credential</h3>

        <p class="p-tag" style={{ margin: '4rem, 0 4rem 0' }}>
          If so, GLEIF MUST update the list of QVIs and the TrustMark on gleif.org to reflect termination of the QVI,
          and all authorized parties will be notified. Would you like to continue?
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
            label="Approve"
            onclick={() => {
              this.step++;
            }}
          />
          {/* <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} /> */}
        </div>
      </>,
      <>
        <img src={declineRequest} style={{ width: '60%', margin: '0 0 2rem 0' }} />
        <h3>Credentials Revoked</h3>

        <p class="p-tag" style={{ margin: '4rem, 0 4rem 0' }}>
          QVI Corp.’s credentials are now revoked and all authorized parties have been notified.
          <br />
          <br />
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          {/* <Button
            class="button--big button--no-transform"
            raised
            label="Approve"
            onclick={() => {
              this.step++;
            }}
          /> */}
          <Button class="button--big button--no-transform" raised label="Done" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = RevokeQviCredential;
