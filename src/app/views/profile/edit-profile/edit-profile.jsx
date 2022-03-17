import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.png';
import { Button, Select, TextField } from '../../../components';

class MyProfile {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '35%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>
              Default Alias: <u>Octocat</u>
            </h4>
            <h4 style={{ color: '#737374' }}>
              Default Credential: <u>External GAR</u>
            </h4>
          </div>
        </div>
        <div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Name:</p>
            <p class="p-tag">Octocat</p>
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Email:</p>
            <p class="p-tag">Octocat</p>
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Company:</p>
            <p class="p-tag">GLEIF</p>
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Phone Number:</p>
            <p class="p-tag">+ 1-801-888-8888</p>
          </div>
        </div>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--big button--no-transform" raised label="Edit Profile" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class ProfileEditPage {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '35%', borderRadius: '50%' }} />
          <div style={{ width: '50%' }}>
            <h4 style={{ color: '#3d63ae' }}>
              Default Alias: <u>Octocat</u>
            </h4>
            <h4 style={{ color: '#737374' }}>
              Default Credential: <u>External GAR</u>
            </h4>
          </div>
        </div>
        <div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Name:</p>
            <TextField filled fluid placeholder="Octocat" style={{ width: '60%', height: '2.5rem' }} />
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Email:</p>
            <TextField filled fluid placeholder="octocat@gleif.org" style={{ width: '60%', height: '2.5rem' }} />
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Company:</p>
            <TextField filled fluid placeholder="GLEIF" style={{ width: '60%', height: '2.5rem' }} />
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Phone Number:</p>
            <TextField filled fluid placeholder="+ 1-801-888-8888" style={{ width: '60%', height: '2.5rem' }} />
          </div>
        </div>
        <div class="flex flex-justify-end" style={{ margin: '4rem 0 0 0' }}>
          <Button class="button--big button--no-transform" raised label="Save" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class EditProfile {
  constructor() {
    this.currentState = 'my-profile';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'my-profile' && (
          <MyProfile
            continue={() => {
              this.currentState = 'profile-edit-page';
            }}
          />
        )}
        {this.currentState === 'profile-edit-page' && <ProfileEditPage />}
      </>
    );
  }
}

module.exports = EditProfile;
