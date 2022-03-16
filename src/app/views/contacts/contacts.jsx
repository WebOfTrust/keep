import m from 'mithril';
import { Card, Container, IconButton, NavRail, TextField, Button } from '../../components';
import './contacts.scss';
import ContactList from './contact-list/contact-list';
import ContactDetails from './contact-details/contact-details';
import contactGroup from '../../../assets/img/contact-group.png';
import tempProfPic from '../../../assets/img/temp-prof-pic.jpg';
class Contacts {
  tempContactArray = [
    {
      id: '1',
      name: 'Quentin Tarantino',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '2',
      name: 'Bill',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '3',
      name: 'Jackie Brown',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '4',
      name: 'Cliff Booth',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '5',
      name: 'Vincent Vega',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '6',
      name: 'Calvin Candie',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '7',
      name: 'Lt. Aldo Raine',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '8',
      name: 'Mia Wallace',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '9',
      name: 'Rick Dalton',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
    {
      id: '10',
      name: 'Mj. Marquis Warrren',
      displayPic: tempProfPic,
      description: 'GLEIF Authorized Representative',
      email: '10epics@redapple.com',
      phoneNumber: '1-555-555-5555',
      company: 'GLEIF',
      role: 'External GAR',
    },
  ];
  constructor() {
    this.activeContact = 0;
  }
  setContact = (id) => {
    this.activeContact = id;
    console.log(this.activeContact);
  };

  view(vnode) {
    return (
      <>
        <div class="contacts">
          <NavRail></NavRail>
          <Container class="headspace" style={{ padding: '0 4rem' }}>
            <div class="flex flex-justify-between">
              <div class="flex-1" style={{ marginRight: '4rem' }}>
                <Card class="card--fluid" padding="1.5rem">
                  <TextField
                    style={{ backgroundColor: 'white', height: '3rem', margin: '0 0 1.5rem 0', width: '75%' }}
                    filled
                    fluid
                    placeholder="Search for Contacts"
                    // oninput={(e) => {
                    //   this.passcode = e.target.value;
                    // }}
                    iconTrailing={{
                      icon: 'search',
                    }}
                  />
                  {this.tempContactArray.map((contact) => {
                    return <ContactList contact={contact} setContact={this.setContact} />;
                  })}
                </Card>
              </div>
              <div class="flex-1">
                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  {this.activeContact !== 0 ? (
                    <ContactDetails contactId={this.activeContact} contacts={this.tempContactArray} />
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
