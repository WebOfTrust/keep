import m from 'mithril';
import { Button } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import addNewContacts from '../../../src/assets/img/add-new-contacts.svg';
import verifyCredentials from '../../../src/assets/img/verify-credentials.svg';
import githubLogo from '../../../src/assets/img/github-logo.svg';
class Notifications {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <h3>Notifications</h3>
        <div class="flex" style={{ borderBottom: '1px solid grey', height: '40px', justifyContent: 'space-evenly' }}>
          <img src={githubLogo} style={{ width: '10%' }} />
          <p>New Key Rotation Request</p>
          <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onclick={vnode.attrs.continue}>
            Go To Task
          </p>
        </div>
        <div class="flex" style={{ borderBottom: '1px solid grey', height: '40px' }}></div>
        <div class="flex" style={{ borderBottom: '1px solid grey', height: '40px' }}></div>
        <div class="flex" style={{ borderBottom: '1px solid grey', height: '40px' }}></div>
        <div class="flex" style={{ borderBottom: '1px solid grey', height: '40px' }}></div>
        <div class="flex" style={{ borderBottom: '1px solid grey', height: '40px' }}></div>
        <div class="flex" style={{ borderBottom: '1px solid grey', height: '40px' }}></div>
        <br></br>
        <br></br>
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}
class RequestForKey {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={verifyCredentials} style={{ width: '50%', margin: '0 0 2rem 0' }} />

        <h3 style={{ margin: '0 0 2rem 0 ' }}>Triggered Manual Key Rotation</h3>

        <p class="p-tag" style={{ margin: '0 0 2rem 0' }}>
          A request for a key rotation has been sent from a QVI to GLEIF.
        </p>
        <p class="p-tag">Contact</p>
        <p class="p-tag" style={{ margin: '0 0 2rem 0', fontWeight: 'bold' }}>
          Jane Smith
        </p>
        <p class="p-tag">Credentials</p>
        <p class="p-tag" style={{ margin: '0 0 2rem 0', fontWeight: 'bold' }}>
          QAR for QVI Corp.
        </p>
        <br></br>
        <br></br>
        <br></br>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Close"
            onclick={vnode.attrs.end}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}
class BeforeRotation {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={verifyCredentials} style={{ width: '50%', margin: '0 0 2rem 0' }} />
        <h3 style={{ margin: '0 0 2rem 0 ' }}>Triggered Manual Key Rotation</h3>

        <p class="p-tag">
          Before completing the manual key rotation, check with the QAR to determine if any credentials have been issued
          during the time between occurrence of potential or actual key compromise and the time that potential or actual
          key compromise has been realized.
          <br />
          <br />
          Once this is completed, continue to revoke credentials.
        </p>
        <br />
        <br />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Close"
            onclick={vnode.attrs.end}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}
class ApproveRequest {
  constructor(vnode) {}
  view(vnode) {
    return (
      <>
        <img src={verifyCredentials} style={{ width: '50%', margin: '0 0 2rem 0' }} />

        <h3 style={{ margin: '0 0 2rem 0 ' }}>Triggered Manual Key Rotation</h3>

        <p class="p-tag" style={{ margin: '0 0 2rem 0' }}>
          Please manually approve the rotation request.
        </p>
        <p class="p-tag">Contact</p>
        <p class="p-tag" style={{ margin: '0 0 2rem 0', fontWeight: 'bold' }}>
          Jane Smith
        </p>
        <p class="p-tag">Credentials</p>
        <p class="p-tag" style={{ margin: '0 0 2rem 0', fontWeight: 'bold' }}>
          QAR for QVI Corp.
        </p>
        <br></br>
        <br></br>
        <br></br>

        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Decline"
            onclick={vnode.attrs.end}
          />
          <Button class="button--big button--no-transform" raised label="Approve" onclick={vnode.attrs.end} />
        </div>
      </>
    );
  }
}
class ManualKeyRotation {
  constructor() {
    this.currentState = 'notifications';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'notifications' && (
          <Notifications
            end={vnode.attrs.end}
            continue={() => {
              this.currentState = 'request-for-key';
            }}
          />
        )}
        {this.currentState === 'request-for-key' && (
          <RequestForKey
            end={vnode.attrs.end}
            continue={() => {
              this.currentState = 'before-rotation';
            }}
          />
        )}
        {this.currentState === 'before-rotation' && (
          <BeforeRotation
            end={vnode.attrs.end}
            continue={() => {
              this.currentState = 'approve-request';
            }}
          />
        )}
        {this.currentState === 'approve-request' && <ApproveRequest end={vnode.attrs.end} />}
      </>
    );
  }
}
module.exports = ManualKeyRotation;
