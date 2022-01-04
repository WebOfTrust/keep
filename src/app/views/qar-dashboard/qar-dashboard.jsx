import m from 'mithril';
import { Button, Card, Container, IconButton } from '../../components';
import './qar-dashboard.scss';

class QARDashboard {
  view() {
    return (
      <>
        <div class="dashboard">
          <div class="nav-rail">
            <div class="nav-rail-item">
              <i class="material-icons md-48">dashboard</i>
              <div class="nav-rail-item-text">Dashboard</div>
            </div>
            <div class="nav-rail-item">
              <i class="material-icons md-48">assignment</i>
              <div class="nav-rail-item-text">My Tasks</div>
            </div>
            <div class="nav-rail-item">
              <span class="material-icons md-48">people</span>
              <div class="nav-rail-item-text">My Contacts</div>
            </div>
            <div class="nav-rail-item">
              <i class="material-icons md-48">lock</i>
              <div class="nav-rail-item-text">My Credentials</div>
            </div>
          </div>
          <Container class="headspace">
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '3rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <div class="flex flex-align-center flex-justify-between">
                    <h1>Frequent Tasks</h1>
                    <Button raised iconLeading="add" label="New Task" />
                  </div>
                  <Card class="card--fluid" padding="1.5rem" style={{ marginBottom: '2.5rem' }}>
                    <h3>Create an Identifier</h3>
                  </Card>
                  <Card class="card--fluid" padding="1.5rem" style={{ marginBottom: '2.5rem' }}>
                    <h3>Issue Credentials</h3>
                  </Card>
                  <Card class="card--fluid" padding="1.5rem" style={{ marginBottom: '2.5rem' }}>
                    <h3>Verify Credentials</h3>
                  </Card>
                  <Card class="card--fluid" padding="1.5rem">
                    <h3>Share Credentials</h3>
                  </Card>
                  <div class="flex flex-align-center flex-justify-between">
                    <h3>See More</h3>
                    <IconButton icon="arrow_drop_down" />
                  </div>
                </Card>
              </div>
              <div class="flex-1">
                <Card class="card--fluid" style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  <h3>Frequent Tasks</h3>
                  <p>
                    This section is designed to help you navigate Keep and learn how to complete tasks required for your
                    role. Click on one of the tasks on the left and this panel will provide more information.
                    <br />
                    <br />
                    If you are already familiar with the software, feel free to select the “Dismiss” button.
                  </p>
                  <div class="flex flex-justify-end">
                    <Button raised class="button__extraPadding" label="Dismiss" />
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

module.exports = QARDashboard;
