import m from 'mithril';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class AcceptCredentialsTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <AcceptCredentials end={vnode.attrs.end} parent={this} />;
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

class AcceptCredentials {
  view(vnode) {
    return (
      <>
        <h3>Accept Credentials Task</h3>
      </>
    );
  }
}

module.exports = AcceptCredentialsTask;
