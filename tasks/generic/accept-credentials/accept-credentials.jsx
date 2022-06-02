import m from 'mithril';
import { Button } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import uploadFile from "../../../src/assets/img/upload-file.svg";

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
          <img src={uploadFile} style={{ width: '240px', margin: '1.5rem 0 2rem 0' }} />
          <h3>Waiting for Credential Issuance</h3>
          <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
            You will be notified when the Issuer of your credential sends you the signed credential data. Clicking on the
            notification will allow you to view your newly received credential.
          </p>
          <div class="flex flex-justify-end">

            <Button class="button--big button--no-transform" raised label="Close" onclick={vnode.attrs.end} />
          </div>
        </>
    );
  }
}

module.exports = AcceptCredentialsTask;
