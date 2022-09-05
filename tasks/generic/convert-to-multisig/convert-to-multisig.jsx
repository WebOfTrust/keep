import m from 'mithril';
import { Button } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import uploadFile from "../../../src/assets/img/upload-file.svg";

class ConvertToMultisigTask {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this._label = this.config.label;
    this._component = {
      view: (vnode) => {
        return <ConvertToMultisig end={vnode.attrs.end} parent={this} />;
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

class ConvertToMultisig {
  view(vnode) {
    return (
        <>
          <img src={uploadFile} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
          <h3>Convert Single Signature AID to a MultiSig Group</h3>
          <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
            Not yet supported.
          </p>
        </>
    );
  }
}

module.exports = ConvertToMultisigTask;
