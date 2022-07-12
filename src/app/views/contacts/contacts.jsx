import m from 'mithril';
import { Card, Container, IconButton, NavRail, TextField, Button } from '../../components';
import { KERI } from '../../services';
import './contacts.scss';
import ContactList from './contact-list/contact-list';
import ContactDetails from './contact-details/contact-details';
import contactGroup from '../../../assets/img/contact-group.svg';
import tempProfPic from '../../../assets/img/temp-prof-pic.jpg';

class Contacts {
  constructor() {
    this.contacts = [];
    this.activeContact = null;
    KERI.getContacts()
      .then((contacts) => {
        this.contacts = contacts;
      })
      .catch((err) => {
        console.log('getContacts', err);
      });
  }

  setContact = (contact) => {
    this.activeContact = contact;
  };

  view(vnode) {
    return (
      <>
        <div class="contacts">
          <NavRail selected="contacts" />
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <TextField
                    style={{ backgroundColor: 'white', height: '3rem', margin: '0 0 1.5rem 0' }}
                    filled
                    fluid
                    placeholder="Search for Contacts"
                    iconTrailing={{
                      icon: 'search',
                    }}
                  />
                  {this.contacts.map((contact) => {
                    return <ContactList contact={contact} setContact={this.setContact} />;
                  })}
                </Card>
              </div>
              <div class="flex-1">
                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  {this.activeContact !== null ? (
                    <ContactDetails contact={this.activeContact} />
                  ) : (
                    <>
                      <h2>My Contacts</h2>
                      <img src={contactGroup} style={{ width: '50%', margin: '2rem 0 2rem 0' }} />
                      <h3>View Your Contacts</h3>
                      <p class="p-tag">
                        Click on any of your contacts on the sidebar to update or edit information about them or their
                        credentials.{' '}
                      </p>
                      <br />
                      <br />
                      <div class="flex flex-justify-end">
                        {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
                        <Button class="button--big button--no-transform" raised label="Dismiss" />
                      </div>
                    </>
                  )}
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
