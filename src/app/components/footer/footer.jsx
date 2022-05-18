import m from 'mithril';
import keepLogo from '../../../assets/img/keep-logo.svg';
import Container from '../container/container.jsx';
import { Auth } from '../../services';

class Footer {
  view(vnode) {
    return (
      <div class="flex" style={{ border: 'solid 1px #e2e5e6', height: '50px' }}>
        <Container class="flex flex-justify-end" style={{ alignItems: 'center' }}>
          <div class="flex flex-justify-evenly" style={{ marginRight: '60px', alignItems: 'center' }}>
            <img src={keepLogo} />
            <p style={{ color: '#3c64b1', fontWeight: '600', margin: '6px 0 0 10px' }}>
              {' '}
              The Keep for {Auth.title()}, v0.1.0. Built on 05/16/2022
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Footer;
