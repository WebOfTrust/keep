import m from 'mithril';
import { Button, Modal, TextField } from '../../components';

class ConfigureWitnesses {
  view(vnode) {
    return (
      <>
        <Modal
          isOpen={vnode.attrs.isOpen}
          onClose={vnode.attrs.onClose}
          style={{
            width: '680px',
          }}
          header={<h1>Add/Edit Witnesses</h1>}
        >
          <TextField fluid filled style={{ marginBottom: '1rem' }} />
          <TextField fluid filled style={{ marginBottom: '1rem' }} />
          <TextField fluid filled style={{ marginBottom: '1rem' }} />
          <Button raised label="Add More" />
        </Modal>
      </>
    );
  }
}

module.exports = ConfigureWitnesses;
