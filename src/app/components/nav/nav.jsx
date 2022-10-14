import m from 'mithril';
import { Tasks, KERI, Notify, Profile } from '../../services';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import ProfilePicture from '../profile/picture.jsx';

import gleifLogo from '../../../assets/img/logo/gleif.svg';
import './nav.scss';

class Nav {
  constructor() {}

  get navLabel() {
    let label = '';
    if (Profile.getDefaultAID()) {
      label = '(' + Profile.getDefaultAID().name + ') ';
    }
    label += Profile.title();
    return label;
  }

  view() {
    return (
      <div class="nav">
        <Container>
          <div class="nav__content">
            <div class="nav__logo">
              <m.route.Link href="/" class="nav__logo__link">
                <img src={gleifLogo} />
                <h1>Keep</h1>
              </m.route.Link>
            </div>
            <div class="nav__spacer"></div>
            {Profile.isLoggedIn && (
              <>
                <div class="relative" style={{ marginRight: '2rem' }}>
                  <IconButton
                    icon="notifications"
                    iconOutlined={true}
                    onclick={() => {
                      Notify.open();
                    }}
                  />
                  {Notify.unread.length > 0 && (
                    <span class="notification-badge">
                      <p>{Notify.unread.length}</p>
                    </span>
                  )}
                </div>
                {Profile.getDefaultAID() && (
                  <div
                    class="nav__profile-image"
                    onclick={() => {
                      m.route.set('/profile');
                    }}
                  >
                    <ProfilePicture size="s" identifier={Profile.getDefaultAID()} />
                  </div>
                )}
                <div
                  class="nav__label"
                  onclick={() => {
                    m.route.set('/profile');
                  }}
                >
                  {this.navLabel}
                </div>
                <IconButton
                  icon="lock"
                  iconOutlined={true}
                  onclick={() => {
                    KERI.lockAgent().then(() => {
                      if (Tasks.active !== null) {
                        Tasks.active.reset();
                        Tasks.active = null;
                      }
                      Profile.locked = true;
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
