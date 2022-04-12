import m from 'mithril';
import { Button, Card, Container, IconButton, NavRail, Select } from '../../components';
import { Auth, KERI, Mail } from '../../services';
import tasks from '../../../../tasks';
import './dashboard.scss';

class Dashboard {
  constructor() {
    this.aboutDismissed = false;
    this.identifiers = [];
    this.allTasks = tasks;
    this.taskSelected = null;
    this.userTypeOptions = [
      {
        label: 'Generic',
        value: 'generic',
      },
      {
        label: 'External GAR',
        value: 'external-gar',
      },
      {
        label: 'Internal GAR',
        value: 'internal-gar',
      },
      {
        label: 'Root GAR',
        value: 'root-gar',
      },
      {
        label: 'LAR',
        value: 'lar',
      },
      {
        label: 'Person',
        value: 'person',
      },
      {
        label: 'QAR',
        value: 'qar',
      },
    ];
    this.changeUserType(sessionStorage.getItem('userType') ? sessionStorage.getItem('userType') : 'generic');
    // this.portOptions = [
    //   {
    //     label: '5623',
    //     value: '5623',
    //   },
    //   {
    //     label: '5723',
    //     value: '5723',
    //   },
    // ];
    // this.portSelected = process.env.API_PORT;
    if (Auth.isLoggedIn()) {
      KERI.listIdentifiers()
        .then((ids) => {
          this.identifiers = ids;
        })
        .catch((err) => {
          console.log('listIdentifiers', err);
        });
    }
  }

  get tasksShown() {
    return this.allTasks[this.userTypeSelected][this.getTasksFlow()];
  }

  getTasksFlow() {
    if (!Auth.isLoggedIn()) {
      return 'create-passcode';
    } else {
      if (this.identifiers.length > 0) {
        if (sessionStorage.getItem('seenIntro')) {
          return 'main';
        }
        return 'intro-to-role';
      }
      return 'create-identifier';
    }
  }

  changeUserType(e) {
    this.userTypeSelected = e;
    sessionStorage.setItem('userType', this.userTypeSelected);
    this.taskSelected = null;

    let port = null;
    switch (this.userTypeSelected) {
      case 'generic':
        port = 5623;
        break;
      case 'external-gar':
        port = 5723;
        break;
      case 'internal-gar':
        port = 5823;
        break;
      case 'lar':
        port = 5923;
        break;
      case 'person':
        port = 6023;
        break;
      case 'qar':
        port = 6123;
        break;
      case 'root-gar':
        port = 6223;
        break;
      default:
        port = 5623;
        break;
    }
    KERI.port = port;
    Mail.port = port;
  }

  // changePort(e) {
  //   this.portSelected = e;
  //   KERI.port = e;
  //   Mail.port = e;
  // }

  changeTask(task) {
    this.taskSelected = task;
  }

  view() {
    return (
      <>
        <div style="position: relative">
          <div class="dashboard">
            {Auth.isLoggedIn() && <NavRail selected="dashboard"></NavRail>}
            <Container class="headspace" style={{ padding: '0 4rem' }}>
              <div class="flex flex-justify-between">
                <div class="flex-1" style={{ marginRight: '4rem' }}>
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
                    {/*<div class="flex flex-align-center flex-justify-between">
                    <h3>See More</h3>
                    <IconButton icon="arrow_drop_down" />
                  </div>*/}
                  </Card>
                </div>
                <div class="flex-1">
                  {(this.taskSelected || (Auth.isLoggedIn() && !this.aboutDismissed)) && (
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
          <Select
            label="User Type"
            options={this.userTypeOptions}
            initialSelection={this.userTypeSelected}
            selectedChange={(e) => {
              this.changeUserType(e);
            }}
            style="position: fixed; bottom: 1rem; right: 1rem;"
          />
          {/* <Select
            label="Port"
            options={this.portOptions}
            initialSelection={this.portSelected}
            selectedChange={(e) => {
              this.changePort(e);
            }}
            style="position: fixed; bottom: 1rem; right: 1rem;"
          /> */}
        </div>
      </>
    );
  }
}

module.exports = Dashboard;
