import m from 'mithril';
import configureIdentifier from '../../../../assets/img/configure-identifier.png';
import { Button, Container, IconButton, TextField } from '../../../components';
class AdvancedOptions {
  view(vnode) {
    return (
      <>
        <img src={configureIdentifier} style={{ width: '40%' }} />
        <h3>Configure Advanced Options</h3>
        <p class="p-tag">Below is a default configuration. If you need to change, please customize below.</p>
        {/* create-your-avr-aid has a more style accurate & functional version of this */}
        <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
          <label class="bold-label clear-margin flex-1">Incepting Signing Threshold</label>
          <div class="flex flex-align-center">
            <IconButton icon="remove" />
            <span style={{ margin: '0 1rem' }}>1</span>
            <IconButton icon="add" />
          </div>
        </div>
        <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
          <label class="bold-label clear-margin flex-1">Incepting Key Count</label>
          <div class="flex flex-align-center">
            <IconButton icon="remove" />
            <span style={{ margin: '0 1rem' }}>1</span>
            <IconButton icon="add" />
          </div>
        </div>
        <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
          <label class="bold-label clear-margin flex-1">Next Signing Threshold</label>
          <div class="flex flex-align-center">
            <IconButton icon="remove" />
            <span style={{ margin: '0 1rem' }}>1</span>
            <IconButton icon="add" />
          </div>
        </div>
        <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
          <label class="bold-label clear-margin flex-1">Next Key Count</label>
          <div class="flex flex-align-center">
            <IconButton icon="remove" />
            <span style={{ margin: '0 1rem' }}>1</span>
            <IconButton icon="add" />
          </div>
        </div>
        <div class="flex flex-align-center" style={{ marginTop: '1rem' }}>
          <label class="bold-label clear-margin flex-1">Witness Threshold</label>
          <div class="flex flex-align-center">
            <IconButton icon="remove" />
            <span style={{ margin: '0 1rem' }}>1</span>
            <IconButton icon="add" />
          </div>
        </div>
        <div class="flex flex-align-center" style={{ margin: '1rem 0 2rem 0' }}>
          <label class="bold-label clear-margin flex-1">Witness Address</label>
          <TextField style={{ width: '35%' }} filled initialValue="HTTPS" placeholder="HTTPS" />
        </div>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button class="button--big button--no-transform" raised label="Continue" />
        </div>
      </>
    );
  }
}

module.exports = AdvancedOptions;
