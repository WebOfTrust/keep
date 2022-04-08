import m from 'mithril';
import { Button, TextField } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import githubLogo from '../../../src/assets/img/github-logo.png';

class IssueCreds {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <h3>Issue Credentials</h3>
        <p class="p-tag">Contact</p>
        <TextField
          filled
          fluid
          placeholder="Jane Smith"
          iconTrailing={{
            icon: 'search',
          }}
        />
        <p class="p-tag">Credentials</p>
        <TextField
          filled
          fluid
          placeholder="QAR for QVI Corp."
          iconTrailing={{
            icon: 'arrow_drop_down',
          }}
        />

        <br />
        <br />
        <br />
        <div class="flex flex-justify-between">
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

class CredsAreIssued {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={approveRequest} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Credentials are Issued</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'center' }}>
          <img src={githubLogo} style={{ width: '10%', height: '10%', margin: '0 0 0 0' }} />
          <p class="p-tag">Octocat verified at 1:23pm on 12/7/21</p>
        </div>
        <p class="p-tag">
          The GAR approves the issuance of Jane Smith’s vLEI Credential. The vLEI Credential is now in their credential
          wallet.
        </p>
        <br />
        <div class="flex flex-justify-end">
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
