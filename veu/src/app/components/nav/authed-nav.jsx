import m from 'mithril';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import './authed-nav.scss';

class AuthedNav {
  constructor() {}

  oninit() {}

  onremove() {}

  view() {
    return (
      <div class="nav">
        <Container>
          <div class="nav__content">
            <h2 class="nav__title">
              <m.route.Link class="nav__link" href="/">
                vLEI Ecosystem
              </m.route.Link>
            </h2>
            <div class="nav__spacer"></div>
            <div class="nav__notifications">
              <span class="nav__notifications__count">1</span>
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
