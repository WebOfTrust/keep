import m from 'mithril';
import { Button, Container, IconButton, TextField } from '../../../src/app/components';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import { ConfigureWitnesses } from '../../../src/app/modals';
class CreateYourAvrAid {
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
  numberCount = {
    inceptSignThresh: 1,
    inceptKeyCount: 1,
    nextSignThresh: 1,
    nextKeyCount: 1,
    witnessThresh: 1,
  };

  view() {
    return (
      <>
        <Container style={{ margin: '0 2rem 0 0' }}>
          <img src={configureIdentifier} style={{ width: '176px', height: '145px' }} />

          <h3>Configure Advanced Options</h3>
          <p class="p-tag">Below is a default configuration. If you need to change, please customize below. </p>
          <>
            <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
              <label class="bold-label clear-margin flex-1" style={{ fontSize: '85%', fontWeight: 'bold' }}>
                Incepting Signing Threshold
              </label>
              <div
                class="flex flex-align-center"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                  height: '2rem',
                }}
              >
                <IconButton
                  icon="remove"
                  onclick={() => {
                    this.numberCount.inceptSignThresh--;
                  }}
                />
                <span style={{ margin: '0 1rem' }}>{this.numberCount.inceptSignThresh}</span>
                <IconButton
                  icon="add"
                  onclick={() => {
                    this.numberCount.inceptSignThresh++;
                  }}
                />
              </div>
            </div>
            <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
              <label class="bold-label clear-margin flex-1" style={{ fontSize: '85%', fontWeight: 'bold' }}>
                Incepting Key Count
              </label>
              <div
                class="flex flex-align-center"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                  height: '2rem',
                }}
              >
                <IconButton
                  icon="remove"
                  onclick={() => {
                    this.numberCount.inceptKeyCount--;
                  }}
                />
                <span style={{ margin: '0 1rem' }}>{this.numberCount.inceptKeyCount}</span>
                <IconButton
                  icon="add"
                  onclick={() => {
                    this.numberCount.inceptKeyCount++;
                  }}
                />
              </div>
            </div>
            <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
              <label class="bold-label clear-margin flex-1" style={{ fontSize: '85%', fontWeight: 'bold' }}>
                Next Signing Threshold
              </label>
              <div
                class="flex flex-align-center"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                  height: '2rem',
                }}
              >
                <IconButton
                  icon="remove"
                  onclick={() => {
                    this.numberCount.nextSignThresh--;
                  }}
                />
                <span style={{ margin: '0 1rem' }}>{this.numberCount.nextSignThresh}</span>
                <IconButton
                  icon="add"
                  onclick={() => {
                    this.numberCount.nextSignThresh++;
                  }}
                />
              </div>
            </div>
            <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
              <label class="bold-label clear-margin flex-1" style={{ fontSize: '85%', fontWeight: 'bold' }}>
                Next Key Count
              </label>
              <div
                class="flex flex-align-center"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                  height: '2rem',
                }}
              >
                <IconButton
                  icon="remove"
                  onclick={() => {
                    this.numberCount.nextKeyCount--;
                  }}
                />
                <span style={{ margin: '0 1rem' }}>{this.numberCount.nextKeyCount}</span>
                <IconButton
                  icon="add"
                  onclick={() => {
                    this.numberCount.nextKeyCount++;
                  }}
                />
              </div>
            </div>
            <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
              <label class="bold-label clear-margin flex-1" style={{ fontSize: '85%', fontWeight: 'bold' }}>
                Witness Threshold
              </label>
              <div
                class="flex flex-align-center"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                  height: '2rem',
                }}
              >
                <IconButton
                  icon="remove"
                  onclick={() => {
                    this.numberCount.witnessThresh--;
                  }}
                />
                <span style={{ margin: '0 1rem' }}>{this.numberCount.witnessThresh}</span>
                <IconButton
                  icon="add"
                  onclick={() => {
                    this.numberCount.witnessThresh++;
                  }}
                />
              </div>
            </div>
            <div class="flex flex-align-center" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
              <label class="bold-label clear-margin flex-1" style={{ fontSize: '85%', fontWeight: 'bold' }}>
                Witness Address
              </label>
              <TextField style={{ width: '8.5rem', height: '2rem' }} filled initialValue="HTTPS" placeholder="HTTPS" />
            </div>

            <div class="flex flex-justify-between">
              <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
              <Button class="button--big button--no-transform" raised label="Continue" />
            </div>
          </>
        </Container>
      </>
    );
  }
}

module.exports = CreateYourAvrAid;
