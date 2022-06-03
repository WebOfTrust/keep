import m from 'mithril';
import { Button } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import {KERI, Profile} from "../../../src/app/services";

class ManualKeyRotationTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <ManualKeyRotation end={vnode.attrs.end} parent={this} />;
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

class ManualKeyRotation {
  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'manual-key-rotation' && (
          <>
            <img src={createIdentifier} style={{ width: '50%', margin: '0 0 2rem 0' }} />
            <h3 style={{ margin: '0 0 2rem 0 ' }}>Perform Manual Key Rotation</h3>
            <p class="p-tag" style={{ margin: '0 0 2rem 0' }}>
              Perform a key rotation on your identifier regularly for good measure or in an emergency
              if your signing keys have been compromised.
            </p>
            <p class="p-tag">Identifier to Rotate:</p>
            <code class="p-tag" style={{ margin: '0 0 2rem 0', fontWeight: 'bold' }}>
              {Profile.getDefaultAID().name}
            </code>
            <p class="p-tag">AID:</p>
            <code class="p-tag" style={{ margin: '0 0 2rem 0', fontWeight: 'bold' }}>
              {Profile.getDefaultAID().prefix}
            </code>
            <p class="p-tag">Current Key:</p>
            <code class="p-tag" style={{ margin: '0 0 2rem 0', fontWeight: 'bold' }}>
              {Profile.getDefaultAID().public_keys[0]}
            </code>
            <p class="p-tag" style={{ margin: '0 0 3rem 0'}}/>
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
                  vnode.attrs.parent.currentState = 'witnesses';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'witnesses' && (
            <>
              <img src={createIdentifier} style={{ width: '50%', margin: '0 0 2rem 0' }} />
              <h3 style={{ margin: '0 0 2rem 0 ' }}>Update Your Witness Pool</h3>
              <p class="p-tag" style={{ margin: '0 0 2rem 0' }}>
                This is also an opportunity to update your witnesses.
              </p>

              <p class="p-tag">Updating witnesses currently not supported:</p>
              <p class="p-tag" style={{ margin: '0 0 3rem 0'}}/>
              <div class="flex flex-justify-between">
                <Button
                    class="button--gray-dk button--big button--no-transform"
                    raised
                    label="Cancel"
                    onclick={vnode.attrs.end}
                />
                <Button
                    class="button--big button--no-transform"
                    raised
                    label="Rotate"
                    onclick={() => {
                      KERI.rotateIdentifier(Profile.getDefaultAID().name);
                      vnode.attrs.parent.currentState = 'complete';
                    }}
                />
              </div>
            </>
        )}
        {vnode.attrs.parent.currentState === 'complete' && (
            <>
              <h3 style={{ margin: '0 0 2rem 0 ' }}>Update Your Witness Pool</h3>
              <p class="p-tag" style={{ margin: '0 0 2rem 0' }}>
                Identifier rotation complete.
              </p>

              <div class="flex flex-justify-between">
                <Button
                    class="button--gray-dk button--big button--no-transform"
                    raised
                    label="Close"
                    onclick={vnode.attrs.end}
                />
              </div>
            </>
        )}
      </>
    );
  }
}

module.exports = ManualKeyRotationTask;
