import m from 'mithril';
import { Button, Select, TextField } from '../../../src/app/components';
import { KERI, Profile, Witnesses } from '../../../src/app/services';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import configureIdentifier from '../../../src/assets/img/configure-identifier.svg';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import uploadImage from '../../../src/assets/img/upload-image.svg';

class CreateYourAID {
  constructor() {
    this.currentState = 'welcome';
    this.alias = '';
    this.aliasPhoto = null;
    this.wits = 'local';
  }

  createAID(vnode) {
    let wits = Witnesses.witnesses[this.wits];
    KERI.createIdentifier(this.alias, wits)
      .then(() => {
        Profile.loadIdentifiers();
        KERI.listIdentifiers()
          .then((ids) => {
            if (ids.length === 1) {
              Profile.setDefaultAID(ids[0]);
              console.log(vnode.attrs);
              vnode.attrs.end();
            }
          })
          .catch((err) => {
            console.log('listIdentfiers', err);
          });
      })
      .catch((err) => {
        console.log('createIdentifier', err);
      });
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'welcome' && (
          <>
            <h3>{vnode.attrs.welcome ? vnode.attrs.welcome.title : 'Welcome To KEEP'}</h3>
            <img src={createIdentifier} style={{ display: 'block', margin: '5rem auto 0', width: '270px' }} />
            <p class="p-tag" style={{ margin: '4rem 0 4rem 0' }}>
              {vnode.attrs.welcome ? (
                vnode.attrs.welcome.paragraph
              ) : (
                <>
                  This software is designed to help you complete verification of authorized representatives and also as
                  a storage place for all of your credentials.
                  <br />
                  <br />
                  The first step will be to create your Delegated AID, then you will receive a short tutorial, you may
                  skip the tutorial by selecting the “skip” button.
                </>
              )}
            </p>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={() => {
                  this.currentState = 'create-your-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'creating-aid';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'creating-aid' && (
          <>
            <h3>{vnode.attrs.creatingAID ? vnode.attrs.creatingAID.title : 'Creating Your AID'}</h3>
            <img src={createIdentifier} style={{ display: 'block', margin: '5rem auto 0', width: '270px' }} />
            <p class="p-tag" style={{ margin: '4rem 0 4rem 0' }}>
              {vnode.attrs.creatingAID ? (
                vnode.attrs.creatingAID.paragraph
              ) : (
                <>
                  In order to provide authorization, you will first have to create your own AID within the software and
                  be verified as an authorized representative.
                </>
              )}
            </p>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={() => {
                  this.currentState = 'create-your-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'steps-to-create';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'steps-to-create' && (
          <>
            <h3>{vnode.attrs.stepsToCreate ? vnode.attrs.stepsToCreate.title : 'Steps to Create Your AID'}</h3>
            <img src={approveRequest} style={{ display: 'block', margin: '5rem auto 0', width: '244px' }} />
            <ol class="styled-ol" style={{ margin: '2rem 0 4rem 0' }}>
              <li>Configure your AID</li>
              <li>Create an Alias</li>
              <li>Select a photo for your Alias</li>
            </ol>
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={() => {
                  this.currentState = 'create-your-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  this.currentState = 'create-your-alias';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'create-your-alias' && (
          <>
            <h3>Create Your Alias</h3>
            <img src={configureIdentifier} style={{ display: 'block', margin: '5rem auto 0', width: '172px' }} />
            <p class="p-tag" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              {vnode.attrs.createYourAlias
                ? vnode.attrs.createYourAlias.paragraph
                : 'The alias should be an easy to remember name for your Delegated AID.'}
              <br />
              <br />
              <p className="p-tag-bold">What would you like your alias to be?</p>
            </p>
            <TextField
              outlined
              fluid
              style={{ margin: '0 0 0 0' }}
              oninput={(e) => {
                this.alias = e.target.value;
              }}
              value={this.alias}
            />
            <p className="p-tag-bold">Select your witness pool:</p>
            <Select
              outlined
              fluid
              value={this.wits}
              style={{ margin: '0 0 3.5rem 0' }}
              options={Witnesses.witnessPools}
              onchange={(wits) => {
                this.wits = wits;
              }}
            />
            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'steps-to-create';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={this.alias.length === 0}
                onclick={() => {
                  this.currentState = 'select-photo';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'select-photo' && (
          <>
            <img src={uploadImage} style={{ width: '172px' }} />
            <h3 style={{ margin: '2rem 0' }}>Select a Photo for the Alias</h3>
            <p class="p-tag" style={{ margin: '2rem 0 0 0' }}>
              If you would like your alias to have a photo instead of the default icon, please upload a photo.
            </p>
            <div class="flex flex-justify-evenly" style={{ alignItems: 'center', margin: '4rem 0 4rem 0' }}>
              <>
                <input
                  type="file"
                  style={{ margin: '4rem 0 4rem 0' }}
                  id="actual-upload"
                  onchange={(e) => {
                    this.aliasPhoto = URL.createObjectURL(e.target.files[0]);
                  }}
                  hidden
                />
                <label
                  for="actual-upload"
                  style={{
                    backgroundColor: '#c4c4c4',
                    padding: '5px 25px 0px 25px',
                    color: 'white',
                    // width: '81px',
                    fontSize: '250%',
                    cursor: 'pointer',
                  }}
                >
                  +
                </label>
              </>

              <p style={{ fontSize: '150%', color: '#737b7d' }}>Upload Photo</p>
            </div>

            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  this.currentState = 'create-your-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={!this.aliasPhoto}
                onclick={() => {
                  this.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}
        {this.currentState === 'review-and-confirm' && (
          <>
            <h3>Review and Confirm</h3>
            <div class="flex flex-justify-between" style={{ alignItems: 'baseline', margin: '2rem 0' }}>
              <p class="p-tag">Alias:</p>
              <Button
                class="button--gray button--small button--no-transform"
                raised
                label="Edit"
                onclick={() => {
                  this.currentState = 'create-your-alias';
                }}
              />
            </div>
            <div class="uneditable-value">{this.alias}</div>
            <div class="flex flex-justify-between" style={{ alignItems: 'baseline', margin: '2rem 0' }}>
              <p class="p-tag">Alias Photo:</p>
              <Button
                class="button--gray button--small button--no-transform"
                raised
                label="Edit"
                onclick={() => {
                  this.currentState = 'select-photo';
                }}
              />
            </div>
            <img src={this.aliasPhoto} style={{ height: '100px', marginBottom: '4rem', width: '100px' }} />
            <div class="flex flex-justify-end">
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={(e) => {
                  this.createAID(vnode);
                }}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

module.exports = CreateYourAID;
