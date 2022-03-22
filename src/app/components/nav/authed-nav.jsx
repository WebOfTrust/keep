import m from 'mithril';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import Popover from '../popover/popover.jsx';
import githubLogo from '../../../assets/img/github-logo.png';
import keepLogo from '../../../assets/img/logo/keep.png';
import './authed-nav.scss';

class AuthedNav {
  constructor() {
    this.notificationsVisible = false;
  }

  view() {
    return (
      <div class="authedNav">
        <Container>
          <div class="authedNav__content">
            <h2 class="authedNav__title">
              <m.route.Link class="authedNav__link" href="/">
                <img src={keepLogo} />
              </m.route.Link>
            </h2>
            <div class="authedNav__spacer"></div>
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
                }}
                padding={'16px'}
              >
                <p>notification</p>
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
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = AuthedNav;
