import m from 'mithril';
import Container from '../container/container.jsx';
import './unauthed-nav.scss';

class UnauthedNav {
  constructor() {}

  oninit() {}

  onremove() {}

  view() {
    return (
      <div class="unauthedNav">
        <Container>
          <div class="unauthedNav__content">
            <h2 class="unauthedNav__title">
              <m.route.Link class="unauthedNav__link" href="/">
                vLEI Ecosystem
              </m.route.Link>
            </h2>
            <div class="unauthedNav__spacer"></div>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = UnauthedNav;
