import m from 'mithril';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class JoinCredentialRevocationTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <JoinCredentialRevocation end={vnode.attrs.end} parent={this} />;
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

class JoinCredentialRevocation {
  view(vnode) {
    return (
      <>
        <h3>Join Credential Revocation</h3>
      </>
    );
  }
}

module.exports = JoinCredentialRevocationTask;
