import m from 'mithril';
import { Button } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class InitiateManualKeyRotationTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <InitiateManualKeyRotation end={vnode.attrs.end} parent={this} />;
      },
    };
    this.currentState = 'manual-key-rotation';
  }

  get imgSrc() {
    return createIdentifier;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class InitiateManualKeyRotation {
  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'manual-key-rotation' && (
          <>
            <img src={createIdentifier} style={{ width: '50%', margin: '0 0 2rem 0' }} />
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
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Close"
                onclick={vnode.attrs.end}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'before-rotation';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'before-rotation' && (
          <>
            <img src={createIdentifier} style={{ width: '50%', margin: '0 0 2rem 0' }} />
            <h3 style={{ margin: '0 0 2rem 0 ' }}>Triggered Manual Key Rotation</h3>

            <p class="p-tag">
              Before completing the manual key rotation, check with the QAR to determine if any credentials have been
              issued during the time between occurrence of potential or actual key compromise and the time that
              potential or actual key compromise has been realized.
              <br />
              <br />
              Once this is completed, continue to revoke credentials.
            </p>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Close"
                onclick={vnode.attrs.end}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'approve-request';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'approve-request' && (
          <>
            <img src={createIdentifier} style={{ width: '50%', margin: '0 0 2rem 0' }} />
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
        )}
      </>
    );
  }
}

module.exports = InitiateManualKeyRotationTask;
