import m from 'mithril';
import { Button, TextField } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import createIdentifier from '../../../src/assets/img/create-identifier.png';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import approveRequest from '../../../src/assets/img/approve-request.png';
import uploadImage from '../../../src/assets/img/upload-image.png';

class WelcomeToSoftware {
  constructor(vnode) {}

  view(vnode) {
    return (
      <>
        <h3>{vnode.attrs.welcome ? vnode.attrs.welcome.title : 'Welcome To KEEP'}</h3>
        <img src={createIdentifier} style={{ display: 'block', margin: '5rem auto 0', width: '270px' }} />
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          {vnode.attrs.welcome ? (
            vnode.attrs.welcome.paragraph
          ) : (
            <>
              This software is designed to help you complete verification of authorized representatives and also as a
              storage place for all of your credentials.
              <br />
              <br />
              The first step will be to create your Delegated AID, then you will receive a short tutorial, you may skip
              the tutorial by selecting the “skip” button.
            </>
          )}
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={vnode.attrs.skip}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class CreatingAID {
  constructor() {
    this.AIDPopoverOpen = false;
  }

  view(vnode) {
    return (
      <>
        <h3>{vnode.attrs.creatingAID ? vnode.attrs.creatingAID.title : 'Creating Your AID'}</h3>
        <img src={createIdentifier} style={{ display: 'block', margin: '5rem auto 0', width: '270px' }} />
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          {vnode.attrs.creatingAID ? (
            vnode.attrs.creatingAID.paragraph
          ) : (
            <>
              In order to provide authorization, you will first have to create your own Delegated AID within the
              software and be verified as an authorized representative.
            </>
          )}
        </p>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={vnode.attrs.skip}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class StepsToCreate {
  view(vnode) {
    return (
      <>
        <h3>{vnode.attrs.stepsToCreate ? vnode.attrs.stepsToCreate.title : 'Steps to Create Your AID'}</h3>
        <img src={approveRequest} style={{ display: 'block', margin: '5rem auto 0', width: '244px' }} />
        <ol class="styled-ol" style={{ margin: '2rem 0 2rem 0' }}>
          <li>Configure your AID</li>
          <li>Create an Alias</li>
          <li>Select a photo for your Alias</li>
        </ol>
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Skip"
            onclick={vnode.attrs.skip}
          />
          <Button class="button--big button--no-transform" raised label="Continue" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class CreateYourAlias {
  view(vnode) {
    return (
      <>
        <h3>Create Your Alias</h3>
        <img src={configureIdentifier} style={{ display: 'block', margin: '5rem auto 0', width: '172px' }} />
        <p class="p-tag" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {vnode.attrs.createYourAlias
            ? vnode.attrs.createYourAlias.paragraph
            : 'The alias should be an easy to remember name for your Delegated AID.'}
          <br />
          <br />
          What would you like your alias to be?
        </p>
        <TextField
          outlined
          fluid
          style={{ margin: '0 0 6.5rem 0' }}
          oninput={(e) => {
            vnode.attrs.aliasChange(e.target.value);
          }}
          value={vnode.attrs.alias}
        />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            disabled={vnode.attrs.alias.length === 0}
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}

class SelectPhoto {
  view(vnode) {
    return (
      <>
        <img src={uploadImage} style={{ width: '172px' }} />
        <h3 style={{ margin: '2rem 0' }}>Select a Photo for the Alias</h3>
        <p class="p-tag" style={{ margin: '2rem 0' }}>
          If you would like your alias to have a photo instead of the default icon, please upload a photo.
        </p>
        <input type="file" style={{ margin: '0 0 10rem 0' }} onchange={vnode.attrs.aliasPhotoChange} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={vnode.attrs.back}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            disabled={!vnode.attrs.aliasPhoto}
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}

class ReviewAndConfirm {
  createAID(vnode) {
    const witnesses = [
      'BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo',
      'BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw',
      'Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c',
    ];
    KERI.createIdentifier(vnode.attrs.alias, witnesses).then(() => {
      vnode.attrs.end(null, 'intro-to-role');
    });
  }

  view(vnode) {
    return (
      <>
        <h3>Review and Confirm</h3>
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline', margin: '2rem 0' }}>
          <p class="p-tag">Alias:</p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            onclick={() => {
              vnode.attrs.switchTo('create-your-alias');
            }}
          />
        </div>
        <TextField outlined fluid value={vnode.attrs.alias} />
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline', margin: '6rem 0 2rem' }}>
          <p class="p-tag">Alias Photo:</p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            onclick={() => {
              vnode.attrs.switchTo('select-photo');
            }}
          />
        </div>
        <img src={vnode.attrs.aliasPhoto} style={{ height: '100px', marginBottom: '10rem', width: '100px' }} />
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
    );
  }
}

class CreateYourAID {
  constructor() {
    this.currentState = 'welcome';
    this.alias = '';
    this.aliasPhoto = null;
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'welcome' && (
          <WelcomeToSoftware
            welcome={vnode.attrs.welcome}
            skip={() => {
              this.currentState = 'create-your-alias';
            }}
            continue={() => {
              this.currentState = 'creating-aid';
            }}
          />
        )}
        {this.currentState === 'creating-aid' && (
          <CreatingAID
            creatingAID={vnode.attrs.creatingAID}
            skip={() => {
              this.currentState = 'create-your-alias';
            }}
            continue={() => {
              this.currentState = 'steps-to-create';
            }}
          />
        )}
        {this.currentState === 'steps-to-create' && (
          <StepsToCreate
            stepsToCreate={vnode.attrs.stepsToCreate}
            skip={() => {
              this.currentState = 'create-your-alias';
            }}
            continue={() => {
              this.currentState = 'create-your-alias';
            }}
          />
        )}
        {this.currentState === 'create-your-alias' && (
          <CreateYourAlias
            alias={this.alias}
            aliasChange={(value) => {
              this.alias = value;
            }}
            back={() => {
              this.currentState = 'steps-to-create';
            }}
            continue={() => {
              this.currentState = 'select-photo';
            }}
          />
        )}
        {this.currentState === 'select-photo' && (
          <SelectPhoto
            aliasPhoto={this.aliasPhoto}
            aliasPhotoChange={(e) => {
              this.aliasPhoto = URL.createObjectURL(e.target.files[0]);
            }}
            back={() => {
              this.currentState = 'create-your-alias';
            }}
            continue={() => {
              this.currentState = 'review-and-confirm';
            }}
          />
        )}
        {this.currentState === 'review-and-confirm' && (
          <ReviewAndConfirm
            end={vnode.attrs.end}
            alias={this.alias}
            aliasPhoto={this.aliasPhoto}
            switchTo={(state) => {
              this.currentState = state;
            }}
          />
        )}
      </>
    );
  }
}

module.exports = CreateYourAID;
