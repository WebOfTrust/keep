import m from 'mithril';
import { Card, Container, IconButton, NavRail, TextField, Button } from '../../components';
import { KERI } from '../../services';
import './contacts.scss';
import contactGroup from '../../../assets/img/contact-group.svg';

class Contacts {
  constructor() {
    this.showHelp = true;
    this.contactsSearch = '';
    this.contacts = [];
    this.activeContact = null;
  }

  oninit() {
    KERI.getContacts()
      .then((contacts) => {
        this.contacts = contacts;
      })
      .catch((err) => {
        console.log('getContacts', err);
      });
  }

  filteredContacts() {
    return this.contacts.filter((contact) => {
      let aliasLower = contact.alias.toLowerCase();
      let searchLower = this.contactsSearch.toLowerCase();
      return aliasLower.includes(searchLower);
    });
  }

  setContact(contact) {
    this.activeContact = contact;
  }

  view(vnode) {
    return (
      <>
        <div class="contacts">
          <NavRail selected="contacts" />
          <Container class="headspace margin-h-4">
            <div class="flex flex-justify-between">
              <div class="flex-1 margin-right-4">
                <Card class="card--fluid" padding="3rem">
                  <TextField
                    style={{ marginBottom: '2rem' }}
                    filled
                    fluid
                    placeholder="Search for Contacts"
                    iconTrailing={{
                      icon: 'search',
                    }}
                    oninput={(e) => {
                      this.contactsSearch = e.target.value;
                    }}
                    value={this.contactsSearch}
                  />
                  {this.filteredContacts().length < 1 && (
                    <>
                      <h3>You have no contacts</h3>
                      <p class="p-tag">
                        Click the button below to start the process of adding a contact. You will need to exchange
                        identifying information on a short Video Call.
                      </p>
                    </>
                  )}
                  {this.filteredContacts().map((contact) => {
                    return (
                      <div
                        class={`contacts-list-item ${this.activeContact === contact && 'contacts-list-item--active'}`}
                        onclick={() => {
                          this.setContact(contact);
                        }}
                      >
                        <p class="contacts-list-item-name">{contact.alias}</p>
                      </div>
                    );
                  })}
                </Card>
              </div>
              <div class="flex-1">
                {(this.activeContact || this.showHelp) && (
                  <Card class="card--fluid relative" padding="4rem">
                    <IconButton
                      class="close-icon"
                      icon="close"
                      onclick={() => {
                        if (this.activeContact) {
                          this.activeContact = null;
                        } else if (this.showHelp) {
                          this.showHelp = false;
                        }
                      }}
                    />
                    {this.activeContact && (
                      <>
                        <div class="margin-v-2">
                          <p class="p-tag-bold">Alias:</p>
                          <p>{this.activeContact.alias}</p>
                        </div>
                        <div class="margin-v-2">
                          <p class="p-tag-bold">AID:</p>
                          <code>{this.activeContact.id}</code>
                        </div>
                        <div class="flex flex-justify-end margin-top-4">
                          <Button
                            class="button--big button--no-transform"
                            raised
                            label="Close"
                            onclick={() => {
                              this.activeContact = null;
                            }}
                          />
                        </div>
                      </>
                    )}
                    {!this.activeContact && this.showHelp && (
                      <div class="help">
                        <h2>My Contacts</h2>
                        <img src={contactGroup} />
                        <h3>View Your Contacts</h3>
                        <p class="p-tag">
                          Click on any of your contacts on the sidebar to update or edit information about them or their
                          credentials.
                        </p>
                        <div class="flex flex-justify-end margin-top-4">
                          <Button
                            class="button--big button--no-transform"
                            raised
                            label="Dismiss"
                            onclick={() => {
                              this.showHelp = false;
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

module.exports = Contacts;
