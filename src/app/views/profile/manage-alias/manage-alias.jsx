import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.svg';
import uploadImage from '../../../../assets/img/upload-image.svg';
import { Button, Select } from '../../../components';
class AliasToEdit {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '40%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>Default Alias: Octocat</h4>
            <h4 style={{ color: '#737374' }}>
              <u>Default Credential: External GAR</u>
            </h4>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <h4>Aliases:</h4>
          <h4 style={{ color: '#3d63ae' }}>Default</h4>
        </div>
        <div class="flex flex-justify-between">
          <div>
            <p class="p-tag">Octocat - Home</p>
            <p style={{ fontStyle: 'italic', color: '#c62828', fontSize: '80%' }}>No linked credentials</p>
          </div>
          <div>
            <input style={{ marginTop: '1rem' }} type="radio" name="aliasRadio"></input>
          </div>
        </div>
        <div class="divider"></div>

        <div class="flex flex-justify-between" style={{ margin: '0 0 2rem 0' }}>
          <div>
            <p class="p-tag">Octocat</p>
            <p class="font-color--blue font-style--italic font-size--12">External GAR </p>
          </div>
          <div>
            <input style={{ marginTop: '1rem' }} type="radio" name="aliasRadio" checked></input>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <Button class="button--secondary" raised label="New Alias" />
          <Button raised label="Edit Alias" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class AliasToUpdate {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '40%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>Default Alias: Octocat</h4>
            <h4 style={{ color: '#737374' }}>
              <u>Default Credential: External GAR</u>
            </h4>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <h4>Select the Alias You Wish to Update</h4>
        </div>
        <div class="flex flex-justify-between">
          <div>
            <p class="p-tag">Octocat - Home</p>
            <p style={{ fontStyle: 'italic', color: '#c62828', fontSize: '80%' }}>No linked credentials</p>
          </div>
        </div>
        <div class="divider"></div>

        <div class="flex flex-justify-between" style={{ margin: '0 0 2rem 0' }}>
          <div>
            <p class="p-tag">Octocat</p>
            <p class="font-color--blue font-style--italic font-size--12">External GAR </p>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <Button class="button--secondary" raised label="New Alias" />
          <Button raised label="Edit Alias" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ReviewAndConfirm {
  view(vnode) {
    return (
      <>
        <img src={uploadImage} style={{ width: '50%' }} />
        <h3>Review and Confrim</h3>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 4rem 0' }}>
          <img src={githubLogo} style={{ width: '40%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>Octocat</h4>
            <h4 style={{ color: '#737374' }}>
              <u>External GAR</u>
            </h4>
          </div>
        </div>

        <div class="flex flex-justify-between">
          <Button class="button--secondary" raised label="Go Back" />
          <Button raised label="Submit" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}
class SelectAliasCred {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '40%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>Default Alias: Octocat</h4>
            <h4 style={{ color: '#737374' }}>
              <u>Default Credential: External GAR</u>
            </h4>
          </div>
        </div>
        <h3>Select Default Credential:</h3>
        <Select options={[{ label: 'External GAR', value: 'External GAR' }]} value={'External GAR'} />
        <h3>Edit Alias</h3>
        <Select options={[{ label: 'Octocat', value: 'Octocat' }]} value={'Octocat'} />

        <div class="flex flex-justify-between" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--secondary" raised label="Go Back" />
          <Button raised label="Submit" onclick={vnode.attrs.continue} />
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
          <Button class="button--secondary" raised label="Go Back" onclick={vnode.attrs.back} />
          <Button
            raised
            label="Continue"
            // disabled={!vnode.attrs.aliasPhoto}
            onclick={vnode.attrs.continue}
          />
        </div>
      </>
    );
  }
}

class EditProfileAlias {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '40%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>Default Alias: Octocat</h4>
            <h4 style={{ color: '#737374' }}>
              <u>Default Credential: External GAR</u>
            </h4>
          </div>
        </div>
        <h3>Default Credential:</h3>
        <p class="p-tag">External GAR</p>
        <h3>Edit Alias</h3>
        <p class="p-tag">Octocat</p>

        <div class="flex flex-justify-between" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--secondary" raised label="New Alias" />
          <Button raised label="Edit Alias" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ManageAlias {
  constructor() {
    this.currentState = 'select-alias-to-edit';
  }

  view(vnode) {
    return (
      <>
        {this.currentState === 'select-alias-to-edit' && (
          <AliasToEdit
            continue={() => {
              this.currentState = 'alias-to-update';
            }}
          />
        )}
        {this.currentState === 'alias-to-update' && (
          <AliasToUpdate
            continue={() => {
              this.currentState = 'review-and-confirm';
            }}
          />
        )}
        {this.currentState === 'review-and-confirm' && (
          <ReviewAndConfirm
            back={() => {
              this.currentState = 'alias-to-update';
            }}
            continue={() => {
              this.currentState = 'select-alias-cred';
            }}
          />
        )}
        {this.currentState === 'select-alias-cred' && (
          <SelectAliasCred
            back={() => {
              this.currentState = 'review-and-confirm';
            }}
            continue={() => {
              this.currentState = 'select-photo';
            }}
          />
        )}
        {this.currentState === 'select-photo' && (
          <SelectPhoto
            back={() => {
              this.currentState = 'select-alias-cred';
            }}
            continue={() => {
              this.currentState = 'edit-profile-alias';
            }}
          />
        )}
        {this.currentState === 'edit-profile-alias' && <EditProfileAlias />}
      </>
    );
  }
}

module.exports = ManageAlias;
