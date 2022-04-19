import m from 'mithril';
import { Auth, Notify } from '../../services';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import Popover from '../popover/popover.jsx';
import githubLogo from '../../../assets/img/github-logo.png';
import keepLogo from '../../../assets/img/logo/keep.png';
import './nav.scss';

class Nav {
  constructor() {
    this.notificationsVisible = false;
  }

  challengeNotificationClick(notification) {
    m.route.set('/contacts');
  }

  multisigNotificationClick(notification) {
    console.log('Click multisig notification', notification);
  }

  view() {
    return (
      <div class="nav">
        <Container>
          <div class="nav__content">
            <h2 class="nav__title">
              <m.route.Link class="nav__link" href="/">
                <img src={keepLogo} />
              </m.route.Link>
            </h2>
            <div class="nav__spacer"></div>
            {Auth.isLoggedIn() && (
              <>
                <div class="relative">
                  <IconButton
                    icon="notifications"
                    style={{ marginRight: '2rem' }}
                    onclick={(e) => {
                      this.notificationsVisible = !this.notificationsVisible;
                    }}
                  />
                  <Popover
                    visible={this.notificationsVisible}
                    onClose={() => {
                      this.notificationsVisible = false;
                    }}
                    style={{
                      top: '88px',
                      left: '-100px',
                      width: '280px',
                    }}
                    padding={'16px'}
                  >
                    {Notify.notifications.map((notification) => {
                      if (notification.type === 'challenge') {
                        return (
                          <a
                            style={{ display: 'block' }}
                            onclick={() => {
                              this.challengeNotificationClick(notification);
                            }}
                          >
                            New Verified Contact
                          </a>
                        );
                      }
                      if (notification.type === 'multisig') {
                        return (
                          <a
                            style={{ display: 'block' }}
                            onclick={() => {
                              this.multisigNotificationClick(notification);
                            }}
                          >
                            New Multi-Sig Verification
                          </a>
                        );
                      }
                      return <p>Unhandled notification type</p>;
                    })}
                  </Popover>
                </div>
                <IconButton
                  icon="settings"
                  style={{ marginRight: '2rem' }}
                  onclick={() => {
                    m.route.set('/settings');
                  }}
                />
                <img
                  src={githubLogo}
                  style={{ height: '40px', width: '40px', cursor: 'pointer' }}
                  onclick={() => {
                    m.route.set('/profile');
                  }}
                />
              </>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Nav;
