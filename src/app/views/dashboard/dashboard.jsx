import m from 'mithril';

import { Button, Card, Container, IconButton, NavRail, Progress } from '../../components';
import { Notify, Profile } from '../../services';
import { Tasks } from '../../services/tasks';
import Notifications from './notifications/notifications.jsx';
import './dashboard.scss';

class Dashboard {
  constructor() {
    this.resetTask();
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
  }

  oninit() {
    const u = new URL(m.route.get(), window.location);
    let name = u.searchParams.get('task');
    if (name !== null) {
      let task = Tasks.find('spot-check');
      if (task !== undefined) {
        task.reset();
        Tasks.active = task;
      }
    }
  }

  get tasksList() {
    return Tasks.tasksList;
  }

  get tasksSlice() {
    if (!this.tasksList) {
      return [];
    }
    return this.tasksList.slice(this.sliceStart, this.sliceEnd);
  }

  resetTask() {
    if (Tasks.active !== null) {
      Tasks.active.reset();
      Tasks.active = null;
    }
  }

  view() {
    return (
      <>
        <div class="dashboard">
          {Profile.isLoggedIn && Profile.identifiers === undefined && (
            <div>
              <H3>Loading...</H3>
            </div>
          )}
          {Profile.isLoggedIn && <NavRail selected="dashboard"></NavRail>}
          <Container class="margin-v-2">
            <div class="flex flex-justify-between">
              {/* Left Panel */}
              <div class="flex-1 margin-right-2">
                {/* Optional left component of active task (replaces task list) */}
                {Tasks.active && Tasks.active.lcomponent && (
                  <Card class={'relative card--fluid' + (Tasks.active ? ' card--active' : null)} padding="2.5rem">
                    {Tasks.active && (
                      <Tasks.active.lcomponent
                        end={() => {
                          this.resetTask();
                        }}
                      />
                    )}
                  </Card>
                )}
                {/* Task list */}
                {(!Tasks.active || !Tasks.active.lcomponent) && (
                  <Card class="card--fluid" padding="1.5rem">
                    <div class="flex flex-align-center flex-justify-between">
                      <h2>Tasks</h2>
                    </div>
                    {this.tasksSlice.map((task) => {
                      return (
                        <Card
                          id={task.id}
                          class={
                            'card--fluid card--hover margin-bottom-1' + (task === Tasks.active ? ' card--active' : '')
                          }
                          padding="1.5rem"
                          onclick={() => {
                            Notify.isOpen = false;
                            Profile.isLead = task.lead;
                            Tasks.active = task;
                          }}
                        >
                          <div class="flex flex-align-center">
                            <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} />
                            <h4>{task.label}</h4>
                          </div>
                        </Card>
                      );
                    })}
                    <div>
                      <div class="flex flex-align-center flex-justify-between">
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
                {(Notify.isOpen || Tasks.active || (Profile.isLoggedIn && !this.aboutDismissed)) && (
                  <Card
                    class={'relative card--fluid' + (!Notify.isOpen && Tasks.active ? ' card--active' : '')}
                    padding="2.5rem"
                  >
                    <IconButton
                      class="close-icon"
                      icon="close"
                      onclick={() => {
                        if (Notify.isOpen) {
                          Notify.isOpen = false;
                        } else if (Tasks.active) {
                          this.resetTask();
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
                          this.resetTask();
                        }}
                      />
                    )}
                    {/* About Your Tasks */}
                    {!Notify.isOpen && !Tasks.active && !this.aboutDismissed && (
                      <>
                        <h3 id="about-your-tasks">About Your Tasks</h3>
                        <p class="font-color--battleship" style={{ margin: '3rem 0 4rem 0' }}>
                          This section is designed to help you navigate Keep and learn how to complete tasks required
                          for your role. Click on one of the tasks on the left and this panel will provide more
                          information.
                          <br />
                          <br />
                          If you are already familiar with the software, feel free to select the “Dismiss” button.
                        </p>
                        <div class="flex flex-justify-end">
                          <Button
                            class="button--no-transform"
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
      </>
    );
  }
}

module.exports = Dashboard;
