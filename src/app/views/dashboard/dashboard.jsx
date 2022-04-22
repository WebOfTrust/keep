import m from 'mithril';

import { Button, Card, Container, IconButton, NavRail } from '../../components';
import { Auth, Contacts, KERI, Mail, Profile, Tasks } from '../../services';
import './dashboard.scss';

class Dashboard {
  constructor() {
    this.aboutDismissed = false;
    this.tasksShown = [];
    this.getTasksFlow();
    Profile.loadIdentifiers();
    Contacts.requestList();
  }

  getTasksFlow() {
    KERI.listIdentifiers()
      .then((ids) => {
        Auth.isLoggedIn = true;
        Mail.initEventSource();
        if (ids.length === 0) {
          this.tasksShown = Tasks.all['create-identifier'];
        } else if (ids.length === 1) {
          this.tasksShown = Tasks.all['create-multisig'];
        } else {
          if (sessionStorage.getItem('seenIntro')) {
            this.tasksShown = Tasks.all['main'];
          } else {
            this.tasksShown = Tasks.all['intro-to-role'];
          }

          if (Profile.getDefaultAID() === null) {
            Profile.setDefaultAID(ids[0]);
          }
        }
      })
      .catch((err) => {
        Auth.isLoggedIn = false;
        Profile.clearDefaultAID();
        this.tasksShown = Tasks.all['create-passcode'];
      });
  }

  view() {
    return (
      <>
        <div style="position: relative">
          <div class="dashboard">
            {Auth.isLoggedIn && <NavRail selected="dashboard"></NavRail>}
            <Container class="headspace" style={{ padding: '0 4rem' }}>
              <div class="flex flex-justify-between">
                <div class="flex-1" style={{ marginRight: '4rem' }}>
                  {Tasks.active && Tasks.active.lcomponent !== undefined && (
                    <Card
                      class={'card--fluid' + (Tasks.active ? ' card--active' : null)}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      <IconButton
                        class="close-icon"
                        icon="close"
                        onclick={() => {
                          if (Tasks.active) {
                            Tasks.active = null;
                          } else {
                            this.aboutDismissed = true;
                          }
                        }}
                      />
                      {Tasks.active && (
                        <Tasks.active.lcomponent
                          end={() => {
                            Tasks.active = null;
                          }}
                        />
                      )}
                    </Card>
                  )}
                  {(!Tasks.active || Tasks.active.lcomponent === undefined) && (
                    <Card class="card--fluid" padding="1.5rem">
                      <div class="flex flex-align-center flex-justify-between">
                        <h1>Tasks</h1>
                        {/* <Button raised iconLeading="add" label="New Task" /> */}
                      </div>
                      {this.tasksShown.map((task, i) => {
                        return (
                          <Card
                            class={'card--fluid card--hover' + (task === Tasks.active ? ' card--active' : '')}
                            padding="1.5rem"
                            style={{ marginBottom: '2.5rem' }}
                            onclick={() => {
                              Profile.isLead = this.tasksShown[i].lead;
                              Tasks.active = this.tasksShown[i];
                            }}
                          >
                            <div class="flex flex-align-center">
                              <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} />
                              <h3>{task.label}</h3>
                            </div>
                          </Card>
                        );
                      })}
                    </Card>
                  )}
                </div>
                <div class="flex-1">
                  {(Tasks.active || (Auth.isLoggedIn && !this.aboutDismissed)) && (
                    <Card
                      class={'card--fluid' + (Tasks.active ? ' card--active' : null)}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      <IconButton
                        class="close-icon"
                        icon="close"
                        onclick={() => {
                          if (Tasks.active) {
                            Tasks.active = null;
                          } else {
                            this.aboutDismissed = true;
                          }
                        }}
                      />
                      {Tasks.active && (
                        <Tasks.active.component
                          end={() => {
                            Tasks.active = null;
                          }}
                        />
                      )}
                      {!this.aboutDismissed && !Tasks.active && (
                        <>
                          <h3>About Your Tasks</h3>
                          <br></br>
                          <p class="font-color--battleship" style={{ lineHeight: '1.38', letterSpacing: '0.3px' }}>
                            This section is designed to help you navigate Keep and learn how to complete tasks required
                            for your role. Click on one of the tasks on the left and this panel will provide more
                            information.
                            <br />
                            <br />
                            If you are already familiar with the software, feel free to select the “Dismiss” button.
                          </p>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <div class="flex flex-justify-end">
                            <Button
                              class="button--no-transform button--big"
                              raised
                              label="Dismiss"
                              onclick={() => {
                                this.aboutDismissed = true;
                              }}
                            />
                          </div>
                        </>
                      )}
                    </Card>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

module.exports = Dashboard;
