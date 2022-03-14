import m from 'mithril';
import { Card, Container, IconButton, NavRail } from '../../components';
import './contacts.scss';

class Contacts {
  constructor() {}

  view(vnode) {
    return (
      <>
        <div class="contacts">
          <NavRail></NavRail>
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem"></Card>
              </div>
              <div class="flex-1">
                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  <h1>My Contacts</h1>
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

module.exports = Contacts;
