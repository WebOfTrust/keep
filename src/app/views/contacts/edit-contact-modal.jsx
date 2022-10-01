import m from 'mithril';
import { Button, Modal, TextField } from '../../components';
import { KERI } from '../../services';
import './contacts.scss';

class EditContactModal {
  constructor() {
    this.contact = null;
  }

  oninit(vnode) {
    this.contact = vnode.attrs.contact;
  }

  updateContact(vnode) {
    KERI.updateContact(this.contact.id, { alias: this.contact.alias, organization: this.contact.organization }).then(
      () => {
        vnode.attrs.onClose();
      }
    );
  }

  view(vnode) {
    return (
      <>
        <Modal
          isOpen={vnode.attrs.isOpen}
          onClose={vnode.attrs.onClose}
          header={<h3>Edit Contact</h3>}
          style={{
            top: '8rem',
            width: '480px',
          }}
        >
          <form
            onsubmit={(e) => {
              e.preventDefault();
              this.updateContact(vnode);
            }}
          >
            <label class="contacts-modal-label">Alias:</label>
            <TextField
              fluid
              outlined
              value={this.contact.alias}
              oninput={(e) => {
                this.contact.alias = e.target.value;
              }}
            />
            <label class="contacts-modal-label">Organization:</label>
            <TextField
              fluid
              outlined
              value={this.contact.organization}
              oninput={(e) => {
                this.contact.organization = e.target.value;
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
              <Button raised type="submit" label="Save" disabled={!this.contact.alias} />
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

module.exports = EditContactModal;
