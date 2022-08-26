import m from 'mithril';
import { Auth, KERI, Notify, Profile } from '../../services';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import ProfilePicture from '../profile/picture.jsx';

import keepLogo from '../../../assets/img/logo/keep.png';
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
            <h2 class="nav__title">
              <m.route.Link class="nav__link" href="/">
                <img src={keepLogo} />
              </m.route.Link>
            </h2>
            <div class="nav__spacer"></div>
            {Profile.isLoggedIn && (
              <>
                <div class="relative">
                  <IconButton
                    icon="notifications"
                    style={{ marginRight: '1rem' }}
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
                    cursor: 'pointer',
                    color: '#0cbc8b',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    fontWeight: 'bold',
                    fontSize: '100%',
                  }}
                  onclick={() => {
                    m.route.set('/profile');
                  }}
                >
                  {this.navLabel}
                </div>

                <IconButton
                  icon="lock"
                  onclick={() => {
                    KERI.lockAgent().then(() => {
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
