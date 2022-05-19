import m from 'mithril';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class JoinCredentialIssuanceTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <JoinCredentialIssuance end={vnode.attrs.end} parent={this} />;
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

class JoinCredentialIssuance {
  view(vnode) {
    return (
      <>
        <h3>Join Credetial Issuance</h3>
      </>
    );
  }
}

module.exports = JoinCredentialIssuanceTask;
