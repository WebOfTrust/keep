import m from 'mithril';
import { Button, Modal, TextField } from '../../../components';
import { KERI } from '../../../services';
import '../../contacts/contacts.scss';

class AddFieldModal {
  constructor() {
    this.aid = null;
    this.key = '';
    this.value = '';
  }

  oninit(vnode) {
    this.key = '';
    this.value = '';
    this.aid = vnode.attrs.aid;
  }

  addField(vnode) {
    KERI.updateIdentifierMetadata(this.aid.name, {
      [this.key]: this.value,
    }).then(() => {
      this.aid.metadata[this.key] = this.value;
      vnode.attrs.onClose();
    });
  }

  view(vnode) {
    return (
      <>
        <Modal
          isOpen={vnode.attrs.isOpen}
          onClose={vnode.attrs.onClose}
          header={<h3>Add New Field</h3>}
          style={{
            top: '8rem',
            width: '480px',
          }}
        >
          <form
            onsubmit={(e) => {
              e.preventDefault();
              this.addField(vnode);
            }}
          >
            <label class="contacts-modal-label">Key:</label>
            <TextField
              fluid
              outlined
              value={this.key}
              oninput={(e) => {
                this.key = e.target.value;
              }}
            />
            <label class="contacts-modal-label">Value:</label>
            <TextField
              fluid
              outlined
              value={this.value}
              oninput={(e) => {
                this.value = e.target.value;
              }}
            />
            <div class="flex flex-align-center flex-justify-between margin-top-4">
              <Button
                raised
                type="button"
                class="button--gray-dk button--big button--no-transform"
                label="Cancel"
                onclick={() => {
                  vnode.attrs.onClose();
                }}
              />
              <Button
                raised
                type="submit"
                class="button--big button--no-transform"
                label="Add Field"
                disabled={!this.key || !this.value}
              />
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

module.exports = AddFieldModal;
