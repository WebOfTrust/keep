import m from 'mithril';
import { Card, Container, IconButton, NavRail, Button } from '../../components';
import EditWatchers from './edit-watchers/edit-watchers.jsx';
import EditWitnesses from './edit-witnesses/edit-witnesses.jsx';
import './settings.scss';
import configureIdentifier from '../../../assets/img/configure-identifier.png';
class Settings {
  constructor() {
    this.currentState = null;
  }

  view(vnode) {
    return (
      <>
        <div class="settings">
          <NavRail></NavRail>
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <Card
                    class={`card--fluid card--hover ${this.currentState === 'edit-witnesses' ? 'card--active' : ''}`}
                    padding="1.5rem"
                    style={{ marginBottom: '2.5rem' }}
                    onclick={() => {
                      this.currentState = 'edit-witnesses';
                    }}
                  >
                    <div class="flex flex-align-center">
                      {/* <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} /> */}
                      <h3>Edit Witness URLs</h3>
                    </div>
                  </Card>
                  <Card
                    class={`card--fluid card--hover ${this.currentState === 'edit-watchers' ? 'card--active' : ''}`}
                    padding="1.5rem"
                    style={{ marginBottom: '2.5rem' }}
                    onclick={() => {
                      this.currentState = 'edit-watchers';
                    }}
                  >
                    <div class="flex flex-align-center">
                      {/* <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} /> */}
                      <h3>Edit Watcher URLs</h3>
                    </div>
                  </Card>
                </Card>
              </div>
              <div class="flex-1">
                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  {this.currentState === 'edit-witnesses' && <EditWitnesses />}
                  {this.currentState === 'edit-watchers' && <EditWatchers />}
                  {this.currentState === null && (
                    <>
                      <img src={configureIdentifier} style={{ width: '50%' }} />
                      <br></br>
                      <h3>Enter Witness and Watcher URLs</h3>
                      <br></br>
                      <p class="p-tag">
                        Your URLs were set up at the start but can be edited at any time. Click on one of the buttons to
                        the left to edit your Witness and Watcher URLs.
                      </p>
                      <br></br>

                      <div class="flex flex-justify-end">
                        <Button class="button--big button--no-transform" raised label="Close" />
                      </div>
                    </>
                  )}
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

module.exports = Settings;
