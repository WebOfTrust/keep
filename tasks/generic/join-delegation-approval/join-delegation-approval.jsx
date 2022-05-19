import m from 'mithril';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';

class JoinDelegationApprovalTask {
  constructor(config) {
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <JoinDelegationApproval end={vnode.attrs.end} parent={this} />;
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

class JoinDelegationApproval {
  view(vnode) {
    return (
      <>
        <h3>Join delegation approval</h3>
      </>
    );
  }
}

module.exports = JoinDelegationApprovalTask;
