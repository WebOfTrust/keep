import m from 'mithril';
import Container from '../container/container.jsx';
import keepLogo from '../../../assets/img/logo/keep.png';
import './unauthed-nav.scss';

class UnauthedNav {
  view() {
    return (
      <div class="unauthedNav">
        <Container>
          <div class="unauthedNav__content">
            <h2 class="unauthedNav__title">
              <m.route.Link class="unauthedNav__link" href="/">
                <img src={keepLogo} />
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
