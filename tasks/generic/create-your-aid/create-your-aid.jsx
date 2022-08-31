import m from 'mithril';
import {Button, Select, TextField, Checkbox} from '../../../src/app/components';
import {KERI, Profile, Witnesses} from '../../../src/app/services';
import createIdentifier from '../../../src/assets/img/create-identifier.svg';
import configureIdentifier from '../../../src/assets/img/configure-identifier.svg';
import approveRequest from '../../../src/assets/img/approve-request.svg';
import uploadImage from '../../../src/assets/img/upload-image.svg';

class CreateYourAIDTask {
  constructor(config) {
    this._id = config.id;
    this._label = config.label;
    this._component = {
      view: (vnode) => {
        return <CreateYourAID end={vnode.attrs.end} parent={this} variables={config.variables}/>;
      },
    };
    this.currentState = 'welcome';
  }

  get imgSrc() {
    return createIdentifier;
  }

  get id() {
    return this._id;
  }

  get label() {
    return this._label;
  }

  get component() {
    return this._component;
  }
}

class CreateYourAID {
  constructor() {
    this.alias = '';
    this.setDefault = (Profile.identifiers === undefined || Profile.identifiers.length === 0);
    this.aliasPhoto = null;
    this.wits = 'local';
  }

  createAID(vnode) {
    let wits = Witnesses.witnesses[this.wits];
    Profile.createIdentifier(this.alias, wits)
      .then((aid) => {
        if(this.setDefault) {
          Profile.setDefaultAID(aid).then(() => {
            vnode.attrs.end();
          })
        } else {
          vnode.attrs.end();
        }
      })
      .catch((err) => {
        console.log('listIdentfiers', err);
      });
  }

  view(vnode) {
    return (
      <>
        {vnode.attrs.parent.currentState === 'welcome' && (
          <>
            <h3 id="welcome">
              {vnode.attrs.variables.welcome ? vnode.attrs.variables.welcome.title : 'Welcome To KEEP'}
            </h3>
            <img src={createIdentifier} style={{display: 'block', margin: '5rem auto 0', width: '270px'}}/>
            <p class="p-tag" style={{margin: '4rem 0 4rem 0'}}>
              {vnode.attrs.variables.welcome ? (
                vnode.attrs.variables.welcome.paragraph
              ) : (
                <>
                  This software is designed to help you complete verification of authorized representatives and also as
                  a storage place for all of your credentials.
                  <br/>
                  <br/>
                  The first step will be to create your Delegated AID, then you will receive a short tutorial, you may
                  skip the tutorial by selecting the “skip” button.
                </>
              )}
            </p>
            <div class="flex flex-justify-between">
              <Button
                id="skip"
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
              <Button
                id="continue"
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'creating-aid';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'creating-aid' && (
          <>
            <h3 id="creating-your-aid">
              {vnode.attrs.variables.creatingAID ? vnode.attrs.variables.creatingAID.title : 'Creating Your AID'}
            </h3>
            <img src={createIdentifier} style={{display: 'block', margin: '5rem auto 0', width: '270px'}}/>
            <p class="p-tag" style={{margin: '4rem 0 4rem 0'}}>
              {vnode.attrs.variables.creatingAID ? (
                vnode.attrs.variables.creatingAID.paragraph
              ) : (
                <>
                  In order to provide authorization, you will first have to create your own AID within the software and
                  be verified as an authorized representative.
                </>
              )}
            </p>
            <div class="flex flex-justify-between">
              <Button
                id="skip"
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
              <Button
                id="continue"
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'steps-to-create';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'steps-to-create' && (
          <>
            <h3 id="steps-to-create">
              {vnode.attrs.variables.stepsToCreate
                ? vnode.attrs.variables.stepsToCreate.title
                : 'Steps to Create Your AID'}
            </h3>
            <img src={approveRequest} style={{display: 'block', margin: '5rem auto 0', width: '244px'}}/>
            <ol class="styled-ol" style={{margin: '2rem 0 4rem 0'}}>
              <li>Configure your AID</li>
              <li>Create an Alias</li>
              {/* <li>Select a photo for your Alias</li> */}
            </ol>
            <div class="flex flex-justify-between">
              <Button
                id="skip"
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Skip"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
              <Button
                id="continue"
                class="button--big button--no-transform"
                raised
                label="Continue"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'create-your-alias' && (
          <>
            <h3>Create Your Alias</h3>
            <img src={configureIdentifier} style={{display: 'block', margin: '5rem auto 0', width: '172px'}}/>
            <p class="p-tag" style={{marginTop: '2rem', marginBottom: '2rem'}}>
              {vnode.attrs.variables.createYourAlias
                ? vnode.attrs.variables.createYourAlias.paragraph
                : 'The alias should be an easy to remember name for your Delegated AID.'}
              <br/>
              <br/>
              <p className="p-tag-bold">What would you like your alias to be?</p>
            </p>
            <TextField
              id="alias"
              outlined
              fluid
              style={{margin: '0 0 0 0'}}
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
              style={{margin: '0 0 1.5rem 0'}}
              options={Witnesses.witnessPools}
              onchange={(wits) => {
                this.wits = wits;
              }}
            />
            <div className="flex flex-justify-start" style={{margin: '0 0 3.5rem 0'}}>
              <Checkbox
                outlined
                fluid
                disabled={(Profile.identifiers === undefined || Profile.identifiers.length === 0)}
                checked={this.setDefault}
                style={{margin: '0 0 3.5rem 0'}}
                onchange={(_default) => {
                  this.setDefault = _default;
                }}
              />
              <p className="p-tag-bold">Set new AID as Keep Default?</p>
            </div>
            <div class="flex flex-justify-between">
              <Button
                id="skip"
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'steps-to-create';
                }}
              />
              <Button
                id="continue"
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={this.alias.length === 0}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}

        {/* TO DO: SKIPPED SELECT PHOTO FOR NOW, FUNCTIONAL */}
        {vnode.attrs.parent.currentState === 'select-photo' && (
          <>
            <img src={uploadImage} style={{width: '172px'}}/>
            <h3 style={{margin: '2rem 0'}}>Select a Photo for the Alias</h3>
            <p class="p-tag" style={{margin: '2rem 0 0 0'}}>
              If you would like your alias to have a photo instead of the default icon, please upload a photo.
            </p>
            <div class="flex flex-justify-evenly" style={{alignItems: 'center', margin: '4rem 0 4rem 0'}}>
              <>
                <input
                  type="file"
                  style={{margin: '4rem 0 4rem 0'}}
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

              <p style={{fontSize: '150%', color: '#737b7d'}}>Upload Photo</p>
            </div>

            <div class="flex flex-justify-between">
              <Button
                class="button--gray-dk button--big button--no-transform"
                raised
                label="Go Back"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
              <Button
                class="button--big button--no-transform"
                raised
                label="Continue"
                disabled={!this.aliasPhoto}
                onclick={() => {
                  vnode.attrs.parent.currentState = 'review-and-confirm';
                }}
              />
            </div>
          </>
        )}
        {vnode.attrs.parent.currentState === 'review-and-confirm' && (
          <>
            <h3>Review and Confirm</h3>
            <div class="flex flex-justify-between" style={{alignItems: 'baseline', margin: '2rem 0'}}>
              <p class="p-tag">Alias:</p>
              <Button
                class="button--gray button--small button--no-transform"
                raised
                label="Edit"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'create-your-alias';
                }}
              />
            </div>
            <div id="review-alias" class="uneditable-value">
              {this.alias}
            </div>
            {/* <div class="flex flex-justify-between" style={{ alignItems: 'baseline', margin: '2rem 0' }}>
              <p class="p-tag">Alias Photo:</p>
              <Button
                class="button--gray button--small button--no-transform"
                raised
                label="Edit"
                onclick={() => {
                  vnode.attrs.parent.currentState = 'select-photo';
                }}
              />
            </div>
            <img src={this.aliasPhoto} style={{ height: '100px', marginBottom: '4rem', width: '100px' }} /> */}
            <div class="flex flex-justify-end" style={{marginTop: '4rem'}}>
              <Button
                id="create-aid"
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

module.exports = CreateYourAIDTask;
