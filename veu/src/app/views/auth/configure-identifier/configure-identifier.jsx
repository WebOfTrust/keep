import m from 'mithril';
import { Button, Container, Select, TextField } from '../../../components';
import { ConfigureWitnesses } from '../../../modals';
import configureIdentifier from '../../../../assets/img/configure-identifier.png';

class ConfigureIdentifier {
  constructor() {
    this.showAdvanced = false;
    this.showConfigureWitnesses = false;
  }

  toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
  }

  openConfigureWitnesses() {
    this.showConfigureWitnesses = true;
  }

  view() {
    return (
      <>
        <ConfigureWitnesses
          isOpen={this.showConfigureWitnesses}
          onClose={() => {
            this.showConfigureWitnesses = false;
          }}
        />
        <Container class="headspace flex">
          <div class="flex-2">
            <img src={configureIdentifier} />
          </div>
          <div class="flex-3" style="padding: 0 1rem">
            <h1>Configure Identifier</h1>
            <label class="label">Witnesses</label>
            <TextField fluid filled placeholder="GLEIF Witness Network" />
            <div class="flex flex-justify-between" style={{ marginTop: '2rem' }}>
              <Button
                class="button__gray"
                raised
                iconTrailing={this.showAdvanced ? 'arrow_drop_up' : 'arrow_drop_down'}
                label="Advanced Options"
                onclick={() => {
                  this.toggleAdvanced();
                }}
              />
              <Button
                raised
                label="Continue"
                onclick={() => {
                  m.route.set('/');
                }}
              />
            </div>
            {this.showAdvanced && (
              <>
                <div class="flex flex-align-center" style={{ marginTop: '2rem' }}>
                  <label class="label flex-1">Add/Edit Witnesses</label>
                  <Button
                    class="flex-1 button__gray"
                    raised
                    label="Add/Edit"
                    onclick={() => {
                      this.openConfigureWitnesses();
                    }}
                  />
                </div>
                <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
                  <label class="label flex-1">Incepting Signing Threshold</label>
                  <Select class="flex-1" />
                </div>
                <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
                  <label class="label flex-1">Incepting Key Count</label>
                  <Select class="flex-1" />
                </div>
                <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
                  <label class="label flex-1">Next Signing Threshold</label>
                  <Select class="flex-1" />
                </div>
                <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
                  <label class="label flex-1">Next Key Count</label>
                  <Select class="flex-1" />
                </div>
                <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
                  <label class="label flex-1">Witness Threshold</label>
                  <Select class="flex-1" />
                </div>
                <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
                  <label class="label flex-1">Witness Address</label>
                  <TextField filled initialValue="HTTPS" class="flex-1" />
                </div>
              </>
            )}
          </div>
        </Container>
      </>
    );
  }
}

module.exports = ConfigureIdentifier;
