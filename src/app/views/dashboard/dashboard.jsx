import m from 'mithril';
import { Button, Card, Container, IconButton, NavRail, Select } from '../../components';
import { API, KERI } from '../../services';
import tasks from '../../../../tasks';
import './dashboard.scss';

class Dashboard {
  constructor() {
    this.flowOptions = [
      {
        label: 'Create Your Passcode',
        value: 'create-passcode',
      },
      {
        label: 'Create Identifier',
        value: 'create-identifier',
      },
      {
        label: 'Intro to Role',
        value: 'intro-to-role',
      },
      {
        label: 'Main',
        value: 'main',
      },
    ];
    this.aboutDismissed = false;
    this.loggedIn = sessionStorage.getItem('loggedIn');
    if (!this.loggedIn) {
      this.flowSelected = 'create-passcode';
    } else {
      this.flowSelected = 'create-identifier';
    }
    this.tasks = tasks;
    this.taskSelected = null;
    this.portOptions = [
      {
        label: '5623',
        value: '5623',
      },
      {
        label: '5723',
        value: '5723',
      },
    ];
    this.portSelected = process.env.API_PORT;
  }

  changeFlow(e) {
    this.flowSelected = e;
    this.taskSelected = null;
  }

  changePort(e) {
    this.portSelected = e;
    API.port = e;
    KERI.port = e;
  }

  changeTask(task) {
    this.taskSelected = task;
  }

  view() {
    return (
      <>
        <div class="dashboard">
          <NavRail selected="dashboard"></NavRail>
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <div class="flex flex-align-center flex-justify-between">
                    <h1>Tasks</h1>
                    {/* <Button raised iconLeading="add" label="New Task" /> */}
                  </div>
                  <Select
                    label="Flow"
                    options={this.flowOptions}
                    initialSelection={this.flowSelected}
                    selectedChange={(e) => {
                      this.changeFlow(e);
                    }}
                    style={{
                      marginRight: '1rem',
                    }}
                  />
                  <Select
                    label="Port"
                    options={this.portOptions}
                    initialSelection={this.portSelected}
                    selectedChange={(e) => {
                      this.changePort(e);
                    }}
                  />
                  {this.tasks[this.flowSelected].map((task, i) => {
                    return (
                      <Card
                        class={'card--fluid card--hover' + (task === this.taskSelected ? ' card--active' : '')}
                        padding="1.5rem"
                        style={{ marginBottom: '2.5rem' }}
                        onclick={() => {
                          this.changeTask(this.tasks[this.flowSelected][i]);
                        }}
                      >
                        <div class="flex flex-align-center">
                          <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} />
                          <h3>{task.label}</h3>
                        </div>
                      </Card>
                    );
                  })}
                  {/*<div class="flex flex-align-center flex-justify-between">
                    <h3>See More</h3>
                    <IconButton icon="arrow_drop_down" />
                  </div>*/}
                </Card>
              </div>
              <div class="flex-1">
                {(this.taskSelected || !this.aboutDismissed) && (
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
                        end={(e, nextFlow = null) => {
                          if (nextFlow) {
                            this.changeFlow(nextFlow);
                            return;
                          }
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
      </>
    );
  }
}

module.exports = Dashboard;
