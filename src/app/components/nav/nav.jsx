import m from 'mithril';
import { Auth, KERI, Notify, Profile, Tasks } from '../../services';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import Popover from '../popover/popover.jsx';

import githubLogo from '../../../assets/img/github-logo.png';
import keepLogo from '../../../assets/img/logo/keep.png';
import './nav.scss';

class Nav {
  constructor() {
    this.notificationsVisible = false;
    console.log(Notify.notifications);
  }

  get navLabel() {
    let label = '';
    let aid = Profile.getDefaultAID();
    if (aid !== undefined) {
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
    // KERI.participateGroupInception("GLEIF External", {
    //   aids: notification.data.aids,
    //   isith: notification.data.ked.kt,
    //   nsith: notification.data.ked.nt,
    //   toad: Number(notification.data.ked.bt),
    //   wits: notification.data.ked.b,
    // }).then(() => {
    //   console.log('inception complete');
    //   this.currentState = 'event-complete';
    // });
    Tasks.active = Tasks.find('join-multisig');
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
                    style={{ marginRight: '1rem' }}
                    onclick={(e) => {
                      this.notificationsVisible = !this.notificationsVisible;
                    }}
                  />
                  {Notify.notifications.length > 0 ? (
                    <span class="noti-badge">
                      <p>{Notify.notifications.length}</p>
                    </span>
                  ) : (
                    <></>
                  )}
                  <Popover
                    visible={this.notificationsVisible}
                    onClose={() => {
                      this.notificationsVisible = false;
                    }}
                    style={{
                      top: '88px',
                      left: '-100px',
                      width: '320px',
                    }}
                    padding={'16px'}
                  >
                    <p class="font-weight--bold font-color--blue">Notifications</p>
                    {Notify.notifications.map((notification) => {
                      if (notification.type === 'challenge') {
                        return (
                          <div
                            class="pointer font-weight--bold font-color--battleship flex flex-align-center flex-justify-between"
                            onclick={() => {
                              this.challengeNotificationClick(notification);
                            }}
                          >
                            <p>New Verified Contact</p>
                            <p>
                              <u>View</u>
                            </p>
                          </div>
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
                          <div
                            class="pointer font-weight--bold font-color--battleship flex flex-align-center flex-justify-between"
                            onclick={() => {
                              meta.clickHandler(notification);
                            }}
                          >
                            <p>{meta.title}</p>
                            <p>
                              <u>View</u>
                            </p>
                          </div>
                        );
                      }
                      return <p>Unhandled notification type</p>;
                    })}
                  </Popover>
                </div>
                <IconButton
                  icon="settings"
                  style={{ marginRight: '1rem' }}
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
                <div style={{ color: '#0cbc8b', paddingLeft: '2rem', fontWeight: 'bold', fontSize: '130%' }}>
                  {this.navLabel}
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Nav;
