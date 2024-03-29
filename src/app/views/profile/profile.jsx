import m from 'mithril';
import { Card, Container, IconButton, NavRail } from '../../components';
import ManagePasscode from './manage-passcode/manage-passcode.jsx';
import ManageIdentifiers from './manage-identifiers/manage-identifiers';
import './profile.scss';

class Profile {
  constructor() {
    this.currentState = 'manage-identifiers';
  }

  view(vnode) {
    return (
      <>
        <div class="profile">
          <NavRail></NavRail>
          <Container class="margin-v-2">
            <div class="flex flex-justify-between">
              <div class="flex-1 margin-right-2">
                <Card class="card--fluid" padding="1.5rem">
                  <Card
                    class={`card--fluid card--hover ${
                      this.currentState === 'manage-identifiers' ? 'card--active' : ''
                    }`}
                    padding="1.5rem"
                    style={{ marginBottom: '2.5rem' }}
                    onclick={() => {
                      this.currentState = 'manage-identifiers';
                    }}
                  >
                    <div class="flex flex-align-center" style={{ color: '#494949' }}>
                      <span className="material-icons md-48" style={{ marginRight: '1rem' }}>
                        people
                      </span>
                      <h3>Manage Identifiers</h3>
                    </div>
                  </Card>
                  <Card
                    class={`margin-bottom-1 card--fluid card--hover ${
                      this.currentState === 'manage-passcode' ? 'card--active' : ''
                    }`}
                    padding="1.5rem"
                    onclick={() => {
                      this.currentState = 'manage-passcode';
                    }}
                  >
                    <div class="flex flex-align-center" style={{ color: '#494949' }}>
                      <span className="material-icons md-48" style={{ marginRight: '1rem' }}>
                        key
                      </span>
                      <h3>Manage Passcode</h3>
                    </div>
                  </Card>
                </Card>
              </div>
              <div class="flex-1">
                <Card class={'relative card--fluid'} padding="2rem">
                  {this.currentState === 'manage-identifiers' && <ManageIdentifiers />}
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
