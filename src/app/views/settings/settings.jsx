import m from 'mithril';
import { Card, Container, IconButton, NavRail } from '../../components';
import AdvancedOptions from './advanced-options/advanced-options.jsx';
import EditWitnesses from './edit-witnesses/edit-witnesses.jsx';
import './settings.scss';

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
                    class={`card--fluid card--hover ${this.currentState === 'advanced-options' ? 'card--active' : ''}`}
                    padding="1.5rem"
                    style={{ marginBottom: '2.5rem' }}
                    onclick={() => {
                      this.currentState = 'advanced-options';
                    }}
                  >
                    <div class="flex flex-align-center">
                      {/* <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} /> */}
                      <h3>Configure Advanced Options</h3>
                    </div>
                  </Card>
                </Card>
              </div>
              <div class="flex-1">
                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  {this.currentState === 'advanced-options' && <AdvancedOptions />}
                  {this.currentState === 'edit-witnesses' && <EditWitnesses />}
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
