import m from 'mithril';
import { Button, Modal, TextField } from '../../../components';
import { KERI } from '../../../services';
import '../../contacts/contacts.scss';

class EditAliasModal {
  constructor() {
    this.aid = null;
    this.alias = ""
  }

  oninit(vnode) {
    this.aid = vnode.attrs.aid;
    this.alias = this.aid.name
  }

  updateContact(vnode) {
    KERI.updateIdentifierMetadata(this.aid.name, { alias: this.alias }).then(
      () => {
        this.aid.name = this.alias;
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
          header={<h3>Edit Alias</h3>}
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
              value={this.alias}
              oninput={(e) => {
                this.alias = e.target.value;
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
                label="Save"
                disabled={!this.alias}
              />
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

module.exports = EditAliasModal;
