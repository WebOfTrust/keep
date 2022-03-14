import m from 'mithril';
import { Card, Container, IconButton, NavRail } from '../../components';
// import AdvancedOptions from './advanced-options/advanced-options.jsx';
// import EditWitnesses from './edit-witnesses/edit-witnesses.jsx';
import EditProfile from './edit-profile/edit-profile.jsx';
import ManageAlias from './manage-alias/manage-alias.jsx';
import ManagePasscode from './manage-passcode/manage-passcode.jsx';
import './profile.scss';

class Profile {
  constructor() {
    this.currentState = null;
  }

  view(vnode) {
    return (
      <>
        <div class="profile">
          <NavRail></NavRail>
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <Card
                    class={`card--fluid card--hover ${this.currentState === 'edit-profile' ? 'card--active' : ''}`}
                    padding="1.5rem"
                    style={{ marginBottom: '2.5rem' }}
                    onclick={() => {
                      this.currentState = 'edit-profile';
                    }}
                  >
                    <div class="flex flex-align-center">
                      {/* <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} /> */}
                      <h3>Edit Profile Information</h3>
                    </div>
                  </Card>
                  <Card
                    class={`card--fluid card--hover ${this.currentState === 'manage-passcode' ? 'card--active' : ''}`}
                    padding="1.5rem"
                    style={{ marginBottom: '2.5rem' }}
                    onclick={() => {
                      this.currentState = 'manage-passcode';
                    }}
                  >
                    <div class="flex flex-align-center">
                      {/* <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} /> */}
                      <h3>Manage Passcode</h3>
                    </div>
                  </Card>
                  <Card
                    class={`card--fluid card--hover ${this.currentState === 'manage-alias' ? 'card--active' : ''}`}
                    padding="1.5rem"
                    style={{ marginBottom: '2.5rem' }}
                    onclick={() => {
                      this.currentState = 'manage-alias';
                    }}
                  >
                    <div class="flex flex-align-center">
                      {/* <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} /> */}
                      <h3>Manage Alias</h3>
                    </div>
                  </Card>
                </Card>
              </div>
              <div class="flex-1">
                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  {this.currentState === 'edit-profile' && <EditProfile />}
                  {this.currentState === 'manage-alias' && <ManageAlias />}
                  {this.currentState === 'manage-passcode' && <ManagePasscode />}
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

module.exports = Profile;
