import m from 'mithril';
import { Button, Card, Container, IconButton, Select } from '../../components';
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
    this.flowSelected = 'create-passcode';
    this.tasks = tasks;
    this.taskSelected = null;
  }

  changeFlow(e) {
    this.flowSelected = e;
    this.taskSelected = null;
  }

  changeTask(task) {
    this.taskSelected = task;
  }

  view() {
    return (
      <>
        <div class="dashboard">
          <div class="nav-rail">
            <div class="nav-rail-item">
              <i class="material-icons md-48">dashboard</i>
              {/*<div class="nav-rail-item-text">Dashboard</div>*/}
            </div>
            <div class="nav-rail-item">
              <i class="material-icons md-48">assignment</i>
              {/*<div class="nav-rail-item-text">My Tasks</div>*/}
            </div>
            <div class="nav-rail-item">
              <span class="material-icons md-48">people</span>
              {/*<div class="nav-rail-item-text">My Contacts</div>*/}
            </div>
            <div class="nav-rail-item">
              <i class="material-icons md-48">lock</i>
              {/*<div class="nav-rail-item-text">My Credentials</div>*/}
            </div>
          </div>
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <div class="flex flex-align-center flex-justify-between">
                    <h1>Tasks</h1>
                    {/*<Button raised iconLeading="add" label="New Task" />*/}
                  </div>
                  <Select
                    label="Flow"
                    options={this.flowOptions}
                    initialSelection={this.flowSelected}
                    selectedChange={(e) => {
                      this.changeFlow(e);
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
                <Card
                  class={'card--fluid' + (this.taskSelected ? ' card--active' : null)}
                  style={{ position: 'relative' }}
                  padding="4rem"
                >
                  <IconButton
                    class="close-icon"
                    icon="close"
                    onclick={() => {
                      this.taskSelected = null;
                    }}
                  />
                  {this.taskSelected ? (
                    <this.taskSelected.component
                      end={(e, nextFlow = null) => {
                        if (nextFlow) {
                          this.changeFlow(nextFlow);
                          return;
                        }
                        this.taskSelected = null;
                      }}
                    />
                  ) : (
                    <>
                      <h3>About Your Tasks</h3>
                      <p class="font-color--battleship" style={{ lineHeight: '1.38', letterSpacing: '0.3px' }}>
                        This section is designed to help you navigate Keep and learn how to complete tasks required for
                        your role. Click on one of the tasks on the left and this panel will provide more information.
                        <br />
                        <br />
                        If you are already familiar with the software, feel free to select the “Dismiss” button.
                      </p>
                      <div class="flex flex-justify-end">
                        <Button class="button--no-transform button--big" raised label="Dismiss" />
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

module.exports = Dashboard;
