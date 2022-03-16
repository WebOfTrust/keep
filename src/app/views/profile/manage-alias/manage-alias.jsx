import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.png';
import uploadImage from '../../../../assets/img/upload-image.png';
import { Button } from '../../../components';
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
            <p style={{ fontStyle: 'italic', color: '#3c64b1', fontSize: '80%' }}>External GAR </p>
          </div>
          <div>
            <input style={{ marginTop: '1rem' }} type="radio" name="aliasRadio" checked></input>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button button--no-transform" raised label="New Alias" />
          <Button class="button button--no-transform" raised label="Edit Alias" onclick={vnode.attrs.continue} />
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
            <p style={{ fontStyle: 'italic', color: '#3c64b1', fontSize: '80%' }}>External GAR </p>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button button--no-transform" raised label="New Alias" />
          <Button class="button button--no-transform" raised label="Edit Alias" onclick={vnode.attrs.continue} />
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
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '40%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>Octocat</h4>
            <h4 style={{ color: '#737374' }}>
              <u>External GAR</u>
            </h4>
          </div>
        </div>

        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button button--no-transform" raised label="Go Back" />
          <Button class="button button--no-transform" raised label="Submit" onclick={vnode.attrs.continue} />
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
        {this.currentState === 'review-and-confirm' && <ReviewAndConfirm />}
      </>
    );
  }
}

module.exports = ManageAlias;
