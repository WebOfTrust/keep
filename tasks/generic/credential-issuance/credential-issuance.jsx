import m from 'mithril';
import moment from 'moment';
import { Button, Select, TextField } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import githubLogo from '../../../src/assets/img/github-logo.svg';

class CredentialIssuance {
  constructor() {
    this.currentState = 'issue-credential';
    this.contacts = [];
    this.credentials = [
      {
        label: 'QAR for QVI Corp.',
        value: 'qarforqvicorp',
      },
    ];
    this.contact = null;
    this.credential = null;
  }

  oninit() {
    KERI.getContacts().then((contacts) => {
      this.contacts = contacts;
    });
  }

  get currentDate() {
    const now = moment();
    return now.format('M/D/YY');
  }

  get contactsSelect() {
    return this.contacts.map((contact) => {
      return {
        label: contact.alias,
        value: contact.id,
      };
    });
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'issue-credential' && (
          <>
            <h3>Issue Credential</h3>
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
              options={this.credentials}
              value={this.credential}
              onchange={(e) => {
                this.credential = e;
              }}
            />
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              {/* <Button
                raised
                class="button--no-transform button--gray-dk button--big"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.end();
                }}
              /> */}
              <Button
                class="button--big button--no-transform"
                disabled={!this.contact || !this.credential}
                raised
                label="Preview"
                onclick={() => {
                  this.currentState = 'review-credential';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'review-credential' && (
          <>
            <h3 style={{ marginBottom: '2rem' }}>Review Credential</h3>
            <p class="p-tag" style={{ fontSize: '20px' }}>
              Please review credential prior to issuing and make sure it is correct.
            </p>
            <div class="flex flex-justify-start" style={{ margin: '3rem 0 3rem 0' }}>
              <div class="flex" style={{ marginRight: '2rem', alignItems: 'center' }}>
                <img src={githubLogo} style={{ width: '100px', height: '100px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', margin: '.5rem 0' }}>Bob Smith</h3>
                {/* <p class="p-tag" style={{ margin: '.5rem 0' }}>
                  QAR for VeriTech
                </p> */}
                <p class="p-tag" style={{ fontSize: '20px', margin: '.5rem 0' }}>
                  Issuing on {this.currentDate}
                </p>
              </div>
            </div>
            <p class="p-tag" style={{ fontSize: '20px' }}>
              Provenance Chain
            </p>
            <div class="flex" style={{ flexDirection: 'column' }}>
              <div class="flex" style={{ alignItems: 'center' }}>
                <div class="flex">
                  <img
                    src={githubLogo}
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
              </div>
              <div></div>
              <div
                style={{ height: '30px', borderLeft: '1px solid black', marginLeft: '1.5rem', marginTop: '-15px' }}
              ></div>
              <div class="flex">
                <img
                  src={githubLogo}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem' }}
                />
                <p class="p-tag">
                  <b>
                    <u>QVI credential to be issued on {this.currentDate}</u>
                  </b>
                </p>
              </div>
            </div>
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'issue-credential';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Submit"
                onclick={() => {
                  this.currentState = 'credential-issued';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'credential-issued' && (
          <>
            <img src={approveRequest} style={{ width: '230px', margin: '1.5rem 0 2rem 0' }} />
            <h3>Credential Issued</h3>
            <div class="flex flex-justify-between" style={{ alignItems: 'center' }}>
              <p class="p-tag" style={{ fontSize: '20px' }}>
                Issued 1:23pm on 12/7/21
              </p>
            </div>
            <p class="p-tag">
              The issuance of Bob Smith's vLEI Credential is complete. The vLEI Credential is now in their credential
              wallet.
            </p>
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = CredentialIssuance;
