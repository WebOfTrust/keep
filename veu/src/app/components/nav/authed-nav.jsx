import m from 'mithril';
import { MDCRipple } from '@material/ripple';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import './authed-nav.scss';

class AuthedNav {
  constructor() {
    this.notificationsContainer = null;
    this.notificationsRipple = null;
  }

  oninit() {}

  oncreate() {
    // this.notificationsContainer = document.querySelector('.nav__notifications');
    // this.notificationsRipple = new MDCRipple(this.notificationsContainer);
  }

  onremove() {}

  view() {
    return (
      <div class="authedNav">
        <Container>
          <div class="authedNav__content">
            <h2 class="authedNav__title">
              <m.route.Link class="authedNav__link" href="/">
                vLEI Ecosystem
              </m.route.Link>
            </h2>
            <div class="authedNav__spacer"></div>
            <div class="authedNav__notifications">
              <div class="mdc-ripple-surface"></div>
              <span class="authedNav__notifications__count">1</span>
              <span class="material-icons">notifications</span>
            </div>
            <IconButton icon="settings" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = AuthedNav;
