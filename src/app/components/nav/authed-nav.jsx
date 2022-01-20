import m from 'mithril';
import Container from '../container/container.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import githubLogo from '../../../assets/img/github-logo.png';
import keepLogo from '../../../assets/img/logo/keep.png';
import './authed-nav.scss';

class AuthedNav {
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
            <IconButton icon="notifications" style={{ marginRight: '2rem' }} />
            <IconButton icon="settings" style={{ marginRight: '2rem' }} />
            <img src={githubLogo} style={{ height: '40px', width: '40px' }} />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = AuthedNav;
