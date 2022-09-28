import m from 'mithril';
import { Button, Modal, TextField } from '../../components';
import { KERI } from '../../services';
import './contacts.scss';

class AddFieldModal {
  constructor() {
    this.contact = null;
    this.key = '';
    this.value = '';
  }

  oninit(vnode) {
    this.key = '';
    this.value = '';
    this.contact = vnode.attrs.contact;
  }

  addField(vnode) {
    KERI.updateContact(this.contact.id, {
      [this.key]: this.value,
    }).then(() => {
      this.contact[this.key] = this.value;
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
                class="button--secondary"
                label="Cancel"
                onclick={() => {
                  vnode.attrs.onClose();
                }}
              />
              <Button raised type="submit" label="Add Field" disabled={!this.key || !this.value} />
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

module.exports = AddFieldModal;
