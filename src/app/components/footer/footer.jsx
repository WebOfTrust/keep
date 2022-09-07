import m from 'mithril';
import keepLogo from '../../../assets/img/keep-logo.svg';
import Container from '../container/container.jsx';
import { Profile } from '../../services';
import './footer.scss';

class Footer {
  view(vnode) {
    return (
      <div class="footer">
        <span class="footer-build">The Keep for {Profile.title()}, v0.1.1. Built on 06/21/2022</span>
      </div>
    );
  }
}

module.exports = Footer;
