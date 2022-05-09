import m from 'mithril';
import { Button } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import addNewContacts from '../../../src/assets/img/add-new-contacts.svg';
import verifyCredentials from '../../../src/assets/img/verify-credentials.svg';
import githubLogo from '../../../src/assets/img/github-logo.svg';
class ViewCreds {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={approveRequest} style={{ width: '50%', margin: '2rem 0 2rem 0' }} />
        <h3>View New Credentials</h3>
        <div class="flex flex-justify-between">
          <img src={githubLogo} style={{ width: '30%', borderRadius: '50%' }} />
          <div style={{ width: '60%' }}>
            <p class="p-tag" style={{ fontSize: '120%' }}>
              Ocotcat verified at 1:23pm on 12/7/21
            </p>
          </div>
        </div>
        <p class="p-tag">
          Your credentials have been issued and are now in your credential wallet.
          <br />
          <br />
        </p>
        <div class="flex flex-justify-end">
          <Button
            class="button--big button--no-transform"
            raised
            label="View Credentials"
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}

class ViewNewCredential {
  constructor() {
    this.currentState = 'view-new';
  }

  view(vnode) {
    return <>{this.currentState === 'view-new' && <ViewCreds />}</>;
  }
}

module.exports = ViewNewCredential;
