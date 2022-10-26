import m from 'mithril';
import keepLogo from '../../../assets/img/keep-logo.svg';
import Container from '../container/container.jsx';
import { Profile } from '../../services';
import './footer.scss';

class Footer {
  view(vnode) {
    return (
      <div class="footer">
        <span class="footer-build">
          The Keep for {Profile.title()}, v{process.env.BUILD_VERSION}. Built on {process.env.BUILD_DATE}
        </span>
      </div>
    );
  }
}

module.exports = Footer;
