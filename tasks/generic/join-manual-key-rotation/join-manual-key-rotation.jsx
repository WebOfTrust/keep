import m from 'mithril';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class JoinManualKeyRotationTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <JoinManualKeyRotation end={vnode.attrs.end} parent={this} />;
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

class JoinManualKeyRotation {
  view(vnode) {
    return (
      <>
        <h3>Join Manual Key Rotation</h3>
      </>
    );
  }
}

module.exports = JoinManualKeyRotationTask;
