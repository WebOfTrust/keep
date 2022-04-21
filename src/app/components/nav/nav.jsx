import m from 'mithril';
import { Auth, Notify, Profile, Tasks } from '../../services';
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

  get navLabel() {
    let label = '';
    let aid = Profile.getDefaultAID();
    if (aid !== null) {
      label = '(' + aid.name + ') ';
    }
    if (Profile.isLead) {
      label += 'Lead ';
    }

    label += Auth.title();
    return label;
  }

  challengeNotificationClick(notification) {
    m.route.set('/contacts');
  }

  multisigCompleteClick(notification) {
    console.log('Multisig complete', notification);
  }

  multisigInitClick(notification) {
    console.log('Multisig init', notification);
    Tasks.active = Tasks.all['main'][3];
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
            {Auth.isLoggedIn && (
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
                        let rType = notification.data.r;
                        let meta = {
                          title: 'New Credential Registry',
                          clickHandler: null,
                        };
                        if (rType.includes('/complete')) {
                          meta.title = 'New Credential Registry';
                          meta.clickHandler = this.multisigCompleteClick;
                        } else if (rType.includes('/init')) {
                          meta.title = 'New Multi-Sig Verification';
                          meta.clickHandler = this.multisigInitClick;
                        }
                        return (
                          <a
                            style={{ display: 'block' }}
                            onclick={() => {
                              meta.clickHandler(notification);
                            }}
                          >
                            {meta.title}
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
                <div style={{ color: 'green', paddingRight: '5px', fontWeight: 'bold' }}>{this.navLabel}</div>
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
