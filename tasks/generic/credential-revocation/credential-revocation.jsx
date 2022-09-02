import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import declineRequest from '../../../src/assets/img/decline-request.svg';

class CredentialRevocationTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <CredentialRevocation end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'revoke-request';
  }

  get imgSrc() {
    return declineRequest;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class CredentialRevocation {
  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'revoke-request' && (
          <>
            <h3>Request Credential Revocation</h3>
            <p class="p-tag">Please select the contact and credentials you would like to revoke.</p>

            <TextField
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '3rem', margin: '0 0 1.5rem 0', width: '75%' }}
              filled
              fluid
              placeholder="ACME"
              // oninput={(e) => {
              //   this.passcode = e.target.value;
              // }}
              iconLeading={{
                icon: 'search',
              }}
            />
            <div>
              <Card class="card--active" style={{ margin: '2rem 0 2rem 0', height: '6rem' }}>
                <p>Paul Smith</p>
                <p>AVR for ACME Corp.</p>
              </Card>
              <Card style={{ margin: '2rem 0 2rem 0', height: '6rem' }}>
                <p>Judith Williams</p>
                <p>AVR for ACME Corp.</p>
              </Card>
            </div>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                vnode={vnode.attrs.end}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'confirm-revoke';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'confirm-revoke' && (
          <>
            <h3>Request Credential Revocation</h3>
            <p class="p-tag">On submission, a signed request has been sent to the requested user for their review. </p>

            <div>
              <p>Contact: Paul Smith</p>
              <p>Credential: LAR for ACME Corp.</p>
              <br></br>
              <br />
            </div>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'revoke-request';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Submit"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'revoke-submitted';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'revoke-submitted' && (
          <>
            <h3>Revocation Submitted!</h3>
            <p class="p-tag">You will be notified when the credential revocation is completed.</p>
            <div>
              <p>Contact: Paul Smith</p>
              <p>Credential: LAR for ACME Corp.</p>
              <br></br>
              <br />
            </div>
            <div class="flex flex-justify-end">
              <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = CredentialRevocationTask;
