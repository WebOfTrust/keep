import m, { vnode } from 'mithril';
import moment from 'moment';
import { Button, Select, TextField } from '../../../src/app/components';
import { Contacts, KERI, Profile } from '../../../src/app/services';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import loanApproved from '../../../src/assets/img/loan-approved.svg';
import githubLogo from '../../../src/assets/img/github-logo.svg';

class CredentialIssuanceTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <CredentialIssuance end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'issue-credential';
  }

  get imgSrc() {
    return loanApproved;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class CredentialIssuance {
  constructor(vnode) {
    this.contacts = [];
    this.credentials = {
      'EZKqORTA9nWpoC0fnJZE69uXLrJ1KhIphqqLynAh8Tbw': 'Legal Entity Engagement Context Role vLEI Credential',
      'EfUao55W5P2JhyyGK7w_qAaXjq_Zy6a-v1zq3fjTpeJU': 'Legal Entity Official Organizational Role vLEI Credential',
      'EN8i2i5ye0-xGS95pm5cg1j0GmFkarJe0zzsSrrf4XJY': 'Legal Entity vLEI Credential',
    };
    this.recipient = null;
    this.credential = vnode.attrs.credential;
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
    return [
      {
        label: '',
        value: null,
      },
      ...this.contacts.map((contact) => {
        return {
          label: contact.alias,
          value: contact.id,
        };
      }),
    ];
  }

  issueCredential(vnode) {
    KERI.issueCredential(Profile.getDefaultAID().name, {
      credentialData: null,
      recipient: Contacts.filterByAlias(this.recipient)[0].id,
      registry: null,
      schema: this.credential,
      source: null,
    }).then(() => {
      vnode.attrs.parent.currentState = 'credential-issued';
    });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'issue-credential' && (
          <>
            <h3>Issue Credential</h3>
            <p class="p-tag">Contact</p>
            {/* <Select
              outlined
              fluid
              style={{ marginBottom: '2rem' }}
              options={this.contactsSelect}
              value={this.contact}
              onchange={(e) => {
                this.contact = e;
              }}
            /> */}
            <TextField
              outlined
              fluid
              style={{ marginBottom: '2rem' }}
              iconTrailing={{
                icon: 'search',
              }}
              value={this.recipient}
              oninput={(e) => {
                this.recipient = e.target.value;
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
                class="button--gray-dk"
                label="Go Back"
                onclick={() => {
                  vnode.attrs.end();
                }}
              /> */}
              <Button
                disabled={!this.recipient || !this.credential}
                raised
                label="Preview"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-credential';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'review-credential' && (
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
                <h3 style={{ fontSize: '20px', margin: '.5rem 0' }}>{this.recipient}</h3>
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
                      <u>{this.recipient}</u>
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
                    <u>GLEIF vLEI Credential to be issued on {this.currentDate}</u>
                  </b>
                </p>
              </div>
            </div>
            <div class="flex flex-justify-between" style={{ marginTop: '4rem' }}>
              <Button
                class="button--gray-dk"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'issue-credential';
                }}
              />
              <Button
                raised
                label="Submit"
                onclick={() => {
                  this.issueCredential(vnode);
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'credential-issued' && (
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
              <Button raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = CredentialIssuanceTask;
