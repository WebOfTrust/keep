import m from 'mithril';
import { Auth, KERI, Notify, Profile, Tasks } from '../../services';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import Popover from '../popover/popover.jsx';
import ProfilePicture from '../profile/picture';

import keepLogo from '../../../assets/img/logo/keep.png';
import './nav.scss';

class Nav {
  constructor() {
    this.notificationsVisible = false;
  }

  get navLabel() {
    let label = '';
    if (Profile.getDefaultAID()) {
      label = '(' + Profile.getDefaultAID().name + ') ';
    }
    if (Profile.isLead) {
      label += 'Lead ';
    }
    label += Auth.title();
    return label;
  }

  challengeNotificationClick() {
    m.route.set('/contacts');
  }

  multisigCompleteClick() {
    m.route.set('/profile');
  }

  multisigInitClick() {
    Tasks.active = Tasks.find('join-multisig');
  }

  multisigIssueClick(notification) {
    Notify.selected = notification;
    Tasks.active = Tasks.find('join-multisig-issue');
    m.redraw();
  }

  issueCompleteClick() {
    m.route.set('/credentials/issued');
  }

  credentialReceivedClick() {
    m.route.set('/credentials');
  }

  delegationRequestClick(notification) {
    Notify.selected = notification;
    Tasks.active = Tasks.find('approve-delegation');
    m.redraw();
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
                      top: '45px',
                      left: '0px',
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
                          title: '',
                          clickHandler: null,
                        };
                        if (rType === '/icp/complete') {
                          meta.title = `Multi-Sig Inception Complete`;
                          meta.clickHandler = this.multisigCompleteClick;
                        } else if (rType === '/ixn/complete') {
                          meta.title = 'Delegated Identifier Created';
                          meta.clickHandler = this.challengeNotificationClick;
                        } else if (rType.includes('/init')) {
                          meta.title = 'Multi-Sig Verification Request';
                          meta.clickHandler = this.multisigInitClick;
                        } else if (rType === '/issue') {
                          meta.title = 'Credential Issuance Request';
                          meta.clickHandler = this.multisigIssueClick;
                        } else if (rType === '/iss/complete') {
                          meta.title = 'Credential Issuance Complete';
                          meta.clickHandler = this.issueCompleteClick;
                        } else {
                          return undefined;
                        }
                        return (
                          <div
                            class="pointer font-weight--bold font-color--battleship flex flex-align-center flex-justify-between"
                            onclick={() => {
                              this.notificationsVisible = false;
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
                      if (notification.type === 'credential') {
                        let rType = notification.data.r;
                        let meta = {
                          title: '',
                          clickHandler: null,
                        };
                        if (rType === '/credential/issue') {
                          meta.title = `Credential Recieved`;
                          meta.clickHandler = this.credentialReceivedClick;
                        } else if (rType === '/iss/complete') {
                          meta.title = 'Credential Issuance Complete';
                          meta.clickHandler = this.issueCompleteClick;
                        } else {
                          return undefined;
                        }
                        return (
                          <div
                            class="pointer font-weight--bold font-color--battleship flex flex-align-center flex-justify-between"
                            onclick={() => {
                              this.notificationsVisible = false;
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
                      if (notification.type === 'delegate') {
                        let rType = notification.data.r;
                        let meta = {
                          title: '',
                          clickHandler: null,
                        };
                        if (rType.includes('/request')) {
                          meta.title = `Delegation Request`;
                          meta.clickHandler = this.delegationRequestClick;
                        }
                        return (
                          <div
                            class="pointer font-weight--bold font-color--battleship flex flex-align-center flex-justify-between"
                            onclick={() => {
                              this.notificationsVisible = false;
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
                      return <p>Unhandled notification type {notification.type}</p>;
                    })}
                  </Popover>
                </div>
                <IconButton
                  icon="settings"
                  onclick={() => {
                    m.route.set('/settings');
                  }}
                />
                <div
                  style={{ cursor: 'pointer', marginRight: '0.5rem', marginLeft: '1rem' }}
                  onclick={() => {
                    m.route.set('/profile');
                  }}
                >
                  <ProfilePicture size="s" identifier={Profile.getDefaultAID()} />
                </div>
                <div
                  style={{
                    color: '#0cbc8b',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    fontWeight: 'bold',
                    fontSize: '100%',
                  }}
                >
                  {this.navLabel}
                </div>

                <IconButton
                  icon="lock"
                  onclick={() => {
                    KERI.lockAgent().then(() => {
                      Auth.removeAgent();
                      m.route.set('/dashboard');
                    });
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
