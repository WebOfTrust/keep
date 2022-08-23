import m from 'mithril';

import { Button, Card, Container, IconButton, NavRail } from '../../components';
import { Auth, Contacts, Keep, KERI, Notify, Profile, Tasks } from '../../services';
import Notifications from './notifications/notifications.jsx';
import './dashboard.scss';

class Dashboard {
  constructor() {
    this.aboutDismissed = false;
    this.sliceStart = 0;
    this.sliceEnd = 4;
    this.changeSliceNext = () => {
      this.sliceStart += 4;
      this.sliceEnd += 4;
    };
    this.changeSliceBack = () => {
      this.sliceStart -= 4;
      this.sliceEnd -= 4;
    };

    this.existingKeystore = false;
    KERI.status(Keep.getName()).then(() => {
      this.existingKeystore = true;
    }).catch((err) => {
      // todo: add API error pop up
      console.log("err", err)
    });

    this.createTask = Tasks.all['create-passcode'][0];
  }

  get tasksList() {
    if (!Auth.isLoggedIn) {
      if (this.existingKeystore || this.createTask.currentState === 'initialized') {
        return Tasks.all['enter-passcode'];
      }
      return [this.createTask];
    }

    if (Profile.identifiers.length === 0) {
      return Tasks.all['create-identifier'];
    } else if (Profile.identifiers.length === 1 && 'create-multisig' in Tasks.all) {
      return Tasks.all['create-multisig'];
    } else {
      return Tasks.all['main'];
    }
  }

  get tasksSlice() {
    if (!this.tasksList) {
      return [];
    }
    return this.tasksList.slice(this.sliceStart, this.sliceEnd);
  }

  view() {
    return (
      <>
        <div style="position: relative">
          <div class="dashboard">
            {Auth.isLoggedIn && <NavRail selected="dashboard"></NavRail>}
            <Container class="headspace" style={{ marginBottom: '5rem', padding: '0 4rem' }}>
              <div class="flex flex-justify-between">
                {/* Left Panel */}
                <div class="flex-1" style={{ marginRight: '4rem' }}>
                  {/* Optional left component of active task (replaces task list) */}
                  {Tasks.active && Tasks.active.lcomponent && (
                    <Card
                      class={'card--fluid' + (Tasks.active ? ' card--active' : null)}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      {Tasks.active && (
                        <Tasks.active.lcomponent
                          end={() => {
                            Tasks.active = null;
                          }}
                        />
                      )}
                    </Card>
                  )}
                  {/* Task list */}
                  {(!Tasks.active || !Tasks.active.lcomponent) && (
                    <Card class="card--fluid" padding="1.5rem">
                      <div class="flex flex-align-center flex-justify-between">
                        <h1>Tasks</h1>
                      </div>
                      {this.tasksSlice.map((task) => {
                        return (
                          <Card
                            id={task.id}
                            class={'card--fluid card--hover' + (task === Tasks.active ? ' card--active' : '')}
                            padding="1.5rem"
                            style={{ marginBottom: '2.5rem' }}
                            onclick={() => {
                              Profile.isLead = task.lead;
                              Tasks.active = task;
                            }}
                          >
                            <div class="flex flex-align-center">
                              <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} />
                              <h3>{task.label}</h3>
                            </div>
                          </Card>
                        );
                      })}
                      <div>
                        <div class="flex flex-justify-between" style={{ alignItems: 'center' }}>
                          {this.sliceStart != 0 && (
                            <Button
                              class="button--white"
                              iconLeading="arrow_back_ios"
                              label="Previous Tasks"
                              onclick={() => {
                                this.changeSliceBack();
                              }}
                            />
                          )}
                          {this.sliceStart === 0 && <div></div>}
                          {this.sliceEnd < this.tasksList.length && (
                            <Button
                              class="button--white"
                              iconTrailing="arrow_forward_ios"
                              label="Next Tasks"
                              onclick={() => {
                                this.changeSliceNext();
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
                {/* Right Panel */}
                <div class="flex-1">
                  {(Notify.isOpen || Tasks.active || (Auth.isLoggedIn && !this.aboutDismissed)) && (
                    <Card
                      class={'card--fluid' + (!Notify.isOpen && Tasks.active ? ' card--active' : '')}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      <IconButton
                        class="close-icon"
                        icon="close"
                        onclick={() => {
                          if (Notify.isOpen) {
                            Notify.isOpen = false;
                          } else if (Tasks.active) {
                            Tasks.active = null;
                          } else {
                            this.aboutDismissed = true;
                          }
                        }}
                      />
                      {/* Notifications */}
                      {Notify.isOpen && <Notifications />}
                      {/* Active task */}
                      {!Notify.isOpen && Tasks.active && (
                        <Tasks.active.component
                          end={() => {
                            Tasks.active = null;
                            Profile.loadIdentifiers();
                            Contacts.requestList();
                          }}
                        />
                      )}
                      {/* About Your Tasks */}
                      {!Notify.isOpen && !Tasks.active && !this.aboutDismissed && (
                        <>
                          <h3 id="about-your-tasks">About Your Tasks</h3>
                          <p
                            class="font-color--battleship"
                            style={{ lineHeight: '1.38', letterSpacing: '0.3px', margin: '3rem 0 4rem 0' }}
                          >
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
