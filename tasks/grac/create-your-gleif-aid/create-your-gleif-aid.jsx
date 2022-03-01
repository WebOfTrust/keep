import m from 'mithril';
import { Button, Popover, TextField } from '../../../src/app/components';
import { KERI } from '../../../src/app/services';
import createIdentifier from '../../../src/assets/img/create-identifier.png';
import configureIdentifier from '../../../src/assets/img/configure-identifier.png';
import approveRequest from '../../../src/assets/img/approve-request.png';
import uploadImage from '../../../src/assets/img/upload-image.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';

class WelcomeToSoftware {
  constructor(vnode) {
    this.GRACPopoverOpen = false;
  }

  view(vnode) {
    return (
      <>
        <h3>
          <span class="relative">
            Welcome to your{' '}
            <u
              onmouseover={() => {
                this.GRACPopoverOpen = true;
              }}
            >
              GRAC
            </u>{' '}
            Software
            <Popover
              visible={this.GRACPopoverOpen}
              onClose={() => {
                this.GRACPopoverOpen = false;
              }}
              padding={'16px'}
              style={{
                backgroundColor: '#eaeaea',
                fontSize: '14px',
                top: '-100px',
                right: '0',
                width: '134px',
              }}
            >
              GLEIF Root AID Controller
            </Popover>
          </span>
        </h3>
        <img src={createIdentifier} style={{ width: '70%', margin: '3rem 0 0 2rem' }} />
        <p class="p-tag" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br />
          <br />
          The first step will be to create your Delegated AID, then you will receive a short tutorial, You may skip the
          tutorial by selecting the “skip” button.
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
        <h3>
          <span class="relative">
            Creating your{' '}
            <u
              onmouseenter={() => {
                this.AIDPopoverOpen = true;
              }}
            >
              AID
            </u>
            <Popover
              visible={this.AIDPopoverOpen}
              onClose={() => {
                this.AIDPopoverOpen = false;
              }}
              padding={'16px'}
              style={{
                backgroundColor: '#eaeaea',
                fontSize: '14px',
                top: '-100px',
                right: '0',
                width: '162px',
              }}
            >
              AID is your identifier for your GRAC software.
            </Popover>
          </span>
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
        <h3>Steps to Create Your GLEIF AID</h3>
        <img src={approveRequest} style={{ width: '60%', margin: '4rem 0 0 4rem' }} />
        <p class="p-tag">
          <div class="flex flex-column">
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Configure your AID</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Create an Alias</p>
            </div>
            <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 2rem' }}>
              <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
              <p class="p-tag-bold">Select a photo for your Alias</p>
            </div>
          </div>
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

class CreateYourAlias {
  view(vnode) {
    return (
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
        <TextField
          outlined
          style={{ height: '3rem', width: '100%', margin: '0 0 4rem 0' }}
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
        <img src={uploadImage} style={{ width: '50%', margin: '4rem 0 0 0' }} />
        <h3>Select a Photo for the Alias</h3>
        <p class="p-tag" style={{ margin: '2rem 0 2rem 0' }}>
          If you would like your alias to have a photo instead of the default icon, please upload a photo.
        </p>
        <input
          type="file"
          style={{ letterSpacing: '.15px', lineHeight: '1.38', marginTop: '4rem', marginBottom: '8rem' }}
          onchange={vnode.attrs.aliasPhotoChange}
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
              vnode.attrs.switchTo('create-your-alias');
            }}
          />
        </div>
        <TextField outlined style={{ height: '3rem', width: '100%' }} value={vnode.attrs.alias} />
        <div class="flex flex-justify-between" style={{ alignItems: 'baseline' }}>
          <p class="p-tag" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
            Alias Photo:
          </p>
          <Button
            class="button--gray button--small button--no-transform"
            raised
            label="Edit"
            style={{ padding: '0 2rem 0 2rem', height: '2rem' }}
            onclick={() => {
              vnode.attrs.switchTo('select-photo');
            }}
          />
        </div>
        <img src={vnode.attrs.aliasPhoto} style={{ width: '20%', margin: '0 0 0 0' }} />
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

class CreateYourGleifAID {
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

module.exports = CreateYourGleifAID;
