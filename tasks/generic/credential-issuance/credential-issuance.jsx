import m from 'mithril';
import { Button } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import githubLogo from '../../../src/assets/img/github-logo.png';

class CredentialIssuance {
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

module.exports = CredentialIssuance;
