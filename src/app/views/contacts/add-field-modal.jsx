import m from 'mithril';
import { Button, Modal, TextField } from '../../components';

class AddFieldModal {
  constructor() {
    this.key = '';
    this.value = '';
  }

  view(vnode) {
    return (
      <>
        <Modal
          isOpen={vnode.attrs.isOpen}
          onClose={vnode.attrs.onClose}
          header={<h3>Add New Field</h3>}
          style={{
            top: 'calc(50% - 150px)',
            width: '480px',
          }}
        >
          <label>Key:</label>
          <TextField
            fluid
            outlined
            value={this.key}
            oninput={(e) => {
              this.key = e.target.value;
            }}
          />
          <label>Value:</label>
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
              disabled={!this.key || !this.value}
              onclick={() => {
                vnode.attrs.onSave({
                  key: this.key,
                  value: this.value,
                });
              }}
            />
          </div>
        </Modal>
      </>
    );
  }
}

module.exports = AddFieldModal;
