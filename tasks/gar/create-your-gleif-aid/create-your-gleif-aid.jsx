import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import createIdentifier from '../../../src/assets/img/create-identifier.png';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import approveRequest from '../../../src/assets/img/approve-request.png';
import uploadImage from '../../../src/assets/img/upload-image.png';
import githubLogo from '../../../src/assets/img/github-logo.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';

class CreateYourGleifAID {
  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <h3>
          Welcome to your <u>GAR</u> Software
        </h3>
        <img src={createIdentifier} style={{ width: '70%', margin: '3rem 0 0 2rem' }} />
        <p class="p-tag" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br />
          <br />
          The first step will be to create your Delegated AID, then you will receive a short tutorial, you may skip the
          tutorial by selecting the “skip” button.
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={() => {
              this.step = 3;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>
          Creating your <u>AID</u>
        </h3>
        <img src={createIdentifier} style={{ width: '70%', margin: '4rem 0 0 2rem' }} />
        <p class="p-tag" style={{ margin: '4rem 0 5rem 0' }}>
          In order to provide authorization, you will first have to create your own GLEIF Delegated AID within the
          software and GLEIF will verify you as an authorized representative (GAR) to act on their behalf.
          <br />
          <br />
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={() => {
              this.step = 3;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>
          Steps to Create Your <u>GLEIF AID</u>
        </h3>
        <img src={approveRequest} style={{ width: '60%', margin: '4rem 0 0 4rem' }} />
        <p class="p-tag">
          <div class="flex flex-column">
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag">Configure your AID</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag">Create Your Alias</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag">Select a photo for your Alias</p>
            </div>
          </div>
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={() => {
              this.step = 3;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>Create Your Alias</h3>
        <img src={configureIdentifier} style={{ width: '40%', margin: '1.5rem 0 0 6rem' }} />
        <p class="p-tag" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          The alias should be an easy to remember name for your GLEIF Delegated AID as a member of the GLEIF Root AID
          signing group (e.g. My Qualified vLEI Authorized Representative Identifier).
          <br />
          <br />
          What would you like your alias to be?
        </p>
        <TextField outlined style={{ height: '3rem', width: '100%', margin: '0 0 4rem 0' }} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={uploadImage} style={{ width: '50%', margin: '4rem 0 0 0' }} />
        <h3>Select a Photo for the Alias</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          If you would like your alias to have a photo instead of the default icon, please upload a photo.
        </p>
        <input
          type="file"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '4rem', marginBottom: '8rem' }}
        />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>Review and Confirm</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p class="p-tag" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
            Alias:
          </p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            style={{ padding: '0 2rem 0 2rem', height: '2rem' }}
            onclick={() => {
              this.step = 3;
            }}
          />
        </div>
        <TextField outlined style={{ height: '3rem', width: '100%' }} />
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p class="p-tag" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
            Alias Photo:
          </p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            style={{ padding: '0 2rem 0 2rem', height: '2rem' }}
          />
        </div>
        <img src={githubLogo} style={{ width: '20%', margin: '0 0 0 0' }} />
        <div class="flex flex-justify-end">
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = CreateYourGleifAID;
