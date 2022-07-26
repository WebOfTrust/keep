import m from 'mithril';
import { Button, Modal, Select } from '../../../src/app/components';
import { Contacts } from '../../../src/app/services';

class AddSignerModal {
  constructor() {
    this.contactOptions = [];
    this.contactSelected = null;
  }

  oninit() {
    this.contactOptions = Contacts.list.map((contact) => {
      return {
        label: contact.alias,
        value: contact.id,
      };
    });
    this.contactSelected = null;
  }

  view(vnode) {
    return (
      <>
        <Modal
          isOpen={vnode.attrs.isOpen}
          onClose={vnode.attrs.onClose}
          header={<h3>Add Signer</h3>}
          style={{
            top: 'calc(50% - 150px)',
            width: '480px',
          }}
        >
          <Select
            outlined
            fluid
            options={this.contactOptions}
            onchange={(id) => {
              let contact = Contacts.filterById(id);
              this.contactSelected = contact;
            }}
          />
          <div class="flex flex-align-center flex-justify-between margin-top-4">
            <Button
              raised
              class="button--gray-dk button--big button--no-transform"
              label="Cancel"
              onclick={() => {
                vnode.attrs.onClose();
              }}
            />
            <Button
              raised
              class="button--big button--no-transform"
              label="Save"
              disabled={!this.contactSelected}
              onclick={() => {
                vnode.attrs.onSave(this.contactSelected);
              }}
            />
          </div>
        </Modal>
      </>
    );
  }
}

module.exports = AddSignerModal;
