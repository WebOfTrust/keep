import m from 'mithril';
import { Button, Select, TextField } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import githubLogo from '../../../src/assets/img/github-logo.svg';

class IssueCreds {
  constructor(vnode) {
    this.contact = null;
    this.credential = null;
  }

  view(vnode) {
    return (
      <>
        <h3>Issue Credentials</h3>
        <p class="p-tag">Contact</p>
        <TextField
          outlined
          fluid
          style={{ marginBottom: '2rem' }}
          iconTrailing={{
            icon: 'search',
          }}
          value={this.contact}
          oninput={(e) => {
            this.contact = e.target.value;
          }}
        />
        <p class="p-tag">Credentials</p>
        <Select
          outlined
          fluid
          style={{ marginBottom: '2rem' }}
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
          ]}
          value={this.credential}
          onchange={(e) => {
            this.credential = e;
          }}
        />
        <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
          <Button
            raised
            class="button--no-transform button--gray-dk button--big"
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button class="button--big button--no-transform" raised label="Submit" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ReviewCredential {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <h3>Review Credential</h3>
        <p class="p-tag">Please review credential prior to issuing and make sure it is correct.</p>

        <div class="flex flex-justify-start" style={{ margin: '2rem 0 2rem 0' }}>
          <div class="flex" style={{ marginRight: '4rem', alignItems: 'center' }}>
            <img src={tempProfPic} style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <h3>Bob Smith</h3>
            <p class="p-tag">QAR for VeriTech</p>
            <p class="p-tag">Issuing on 12/7/21</p>
          </div>
        </div>
        <p class="p-tag">Provenance Chain</p>
        <div class="flex" style={{ flexDirection: 'column' }}>
          <div class="flex" style={{ alignItems: 'center' }}>
            <img
              src={addNewContacts}
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem' }}
            />
            <p class="p-tag">
              <b>
                <u>ACME Corp.</u>
              </b>{' '}
              granting QAR credentials to{' '}
              <b>
                <u>Bob Smith</u>
              </b>{' '}
              on 11/2/20
            </p>
          </div>
          <div></div>
          <div
            style={{ height: '30px', borderLeft: '1px solid black', marginLeft: '1.5rem', marginTop: '-15px' }}
          ></div>
          <div class="flex">
            <img src={tempProfPic} style={{ width: '50px', borderRadius: '50%', marginRight: '1rem' }} />
            <p class="p-tag">
              <b>
                <u>QVI credential to be issued on 12/7/21</u>
              </b>
            </p>
          </div>
        </div>
        <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
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

class CredsAreIssued {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={approveRequest} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Credentials are Issued</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'center' }}>
          {/* <img src={githubLogo} style={{ width: '10%', height: '10%', margin: '0 0 0 0' }} /> */}
          <p class="p-tag" style={{ fontSize: '120%' }}>
            Issued 1:23pm on 12/7/21
          </p>
        </div>
        <p class="p-tag">
          The issuance of Bob Smith’s vLEI Credential is complete. The vLEI Credential is now in their credential
          wallet.
        </p>

        <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}

class CredentialIssuance {
  constructor() {
    this.currentState = 'issue-creds';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'issue-creds' && (
          <IssueCreds
            back={vnode.attrs.end}
            continue={() => {
              this.currentState = 'review-creds';
            }}
          />
        )}
        {this.currentState === 'review-creds' && (
          <ReviewCredential
            back={() => {
              this.currentState = 'issue-creds';
            }}
            continue={() => {
              this.currentState = 'creds-issued';
            }}
          />
        )}
        {this.currentState === 'creds-issued' && <CredsAreIssued end={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = CredentialIssuance;
