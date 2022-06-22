import m from 'mithril';
import keepLogo from '../../../assets/img/keep-logo.svg';
import Container from '../container/container.jsx';
import { Auth } from '../../services';

class Footer {
  view(vnode) {
    return (
      <div style={{ border: 'solid 1px #e2e5e6' }}>
        <Container class="flex flex-justify-end flex-align-center" style={{ padding: '1rem' }}>
          <img src={keepLogo} />
          <p style={{ color: '#3c64b1', fontWeight: '600', margin: '6px 0 0 10px' }}>
            {' '}
            The Keep for {Auth.title()}, v0.1.1. Built on 06/21/2022
          </p>
        </Container>
      </div>
    );
  }
}

module.exports = Footer;
