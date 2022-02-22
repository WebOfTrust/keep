import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.png';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import approveRequest from '../../../src/assets/img/approve-request.png';
import uploadImage from '../../../src/assets/img/upload-image.png';
import githubLogo from '../../../src/assets/img/github-logo.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';

class IssuanceOfQvleiCred {
  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <img src={approveRequest} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Credentials are Issued</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'center' }}>
          <img src={githubLogo} style={{ width: '10%', height: '10%', margin: '0 0 0 0' }} />
          <p class="p-tag">Octocat verified at 1:23pm on 12/7/21</p>
        </div>
        <p class="p-tag">
          The GAR approves the issuance of Jane Smith’s QVI vLEI Credential. The QVI vLEI Credential is now in their
          credential wallet.
        </p>
        <br />
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

module.exports = IssuanceOfQvleiCred;
