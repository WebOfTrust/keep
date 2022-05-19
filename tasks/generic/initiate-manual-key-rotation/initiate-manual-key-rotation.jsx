import m from 'mithril';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class InitiateManualKeyRotationTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <InitiateManualKeyRotation end={vnode.attrs.end} parent={this} />;
      },
    };
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
        <h3>Initiate manual key rotation</h3>
      </>
    );
  }
}

module.exports = InitiateManualKeyRotationTask;
