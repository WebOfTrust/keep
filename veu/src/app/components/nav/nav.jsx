import m from 'mithril';
import Container from '../container/container.jsx';
import './nav.scss';

class Nav {
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
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Nav;
