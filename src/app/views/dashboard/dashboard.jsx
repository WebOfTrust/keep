import m from 'mithril';

import { Button, Card, Container, IconButton, NavRail, Select } from '../../components';
import { Auth, Contacts, KERI, Mail, Profile } from '../../services';

import tasks from '../../../../tasks';
import './dashboard.scss';

class Dashboard {
  constructor() {
    this.aboutDismissed = false;
    this.allTasks = tasks;
    this.tasksShown = [];
    this.taskSelected = null;

        this.userTypeOptions = [
            {
                label: 'External GAR',
                value: 'external-gar',
            },
        ];
        this.changeUserType(process.env.USER_TYPE);
        this.getTasksFlow()
        Profile.loadIdentifiers();
    }

  getTasksFlow() {
    KERI.listIdentifiers()
      .then((ids) => {
        Auth.isLoggedIn = true;
        if (ids.length > 0) {
          if (sessionStorage.getItem('seenIntro')) {
            this.tasksShown = this.allTasks[this.userTypeSelected]['main'];
          } else {
            this.tasksShown = this.allTasks[this.userTypeSelected]['intro-to-role'];
          }

          if (Profile.getDefaultAID() === null) {
            Profile.setDefaultAID(ids[0]);
          }
        } else {
          this.tasksShown = this.allTasks[this.userTypeSelected]['create-identifier'];
        }
      })
      .catch((err) => {
        Auth.isLoggedIn = false;
        Profile.clearDefaultAID();
        this.tasksShown = this.allTasks[this.userTypeSelected]['create-passcode'];
      });
  }

  changeUserType(e) {
    this.userTypeSelected = e;
    this.taskSelected = null;
  }

  changeTask(task) {
    this.taskSelected = task;
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
                  {this.taskSelected && this.taskSelected.lcomponent !== undefined && (
                    <Card
                      class={'card--fluid' + (this.taskSelected ? ' card--active' : null)}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      <IconButton
                        class="close-icon"
                        icon="close"
                        onclick={() => {
                          if (this.taskSelected) {
                            this.taskSelected = null;
                          } else {
                            this.aboutDismissed = true;
                          }
                        }}
                      />
                      {this.taskSelected && (
                        <this.taskSelected.lcomponent
                          end={() => {
                            this.taskSelected = null;
                          }}
                        />
                      )}
                    </Card>
                  )}
                  {(!this.taskSelected || this.taskSelected.lcomponent === undefined) && (
                    <Card class="card--fluid" padding="1.5rem">
                      <div class="flex flex-align-center flex-justify-between">
                        <h1>Tasks</h1>
                        {/* <Button raised iconLeading="add" label="New Task" /> */}
                      </div>
                      {this.tasksShown.map((task, i) => {
                        return (
                          <Card
                            class={'card--fluid card--hover' + (task === this.taskSelected ? ' card--active' : '')}
                            padding="1.5rem"
                            style={{ marginBottom: '2.5rem' }}
                            onclick={() => {
                              this.changeTask(this.tasksShown[i]);
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
                  {(this.taskSelected || (Auth.isLoggedIn && !this.aboutDismissed)) && (
                    <Card
                      class={'card--fluid' + (this.taskSelected ? ' card--active' : null)}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      <IconButton
                        class="close-icon"
                        icon="close"
                        onclick={() => {
                          if (this.taskSelected) {
                            this.taskSelected = null;
                          } else {
                            this.aboutDismissed = true;
                          }
                        }}
                      />
                      {this.taskSelected && (
                        <this.taskSelected.component
                          end={() => {
                            this.taskSelected = null;
                          }}
                        />
                      )}
                      {!this.aboutDismissed && !this.taskSelected && (
                        <>
                          <h3>About Your Tasks</h3>
                          <p class="font-color--battleship" style={{ lineHeight: '1.38', letterSpacing: '0.3px' }}>
                            This section is designed to help you navigate Keep and learn how to complete tasks required
                            for your role. Click on one of the tasks on the left and this panel will provide more
                            information.
                            <br />
                            <br />
                            If you are already familiar with the software, feel free to select the “Dismiss” button.
                          </p>
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
