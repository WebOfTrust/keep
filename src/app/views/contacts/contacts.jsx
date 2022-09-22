import m from 'mithril';
import {
  Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  NavRail,
  ProfilePicture,
  TabBar,
  Tab,
  TextField,
} from '../../components';
import { KERI } from '../../services';
import AddFieldModal from './add-field-modal';
import EditContactModal from './edit-contact-modal';
import './contacts.scss';
import contactGroup from '../../../assets/img/contact-group.svg';

class Contacts {
  constructor() {
    this.params = {};
    this.selectedTab = '';
    this.showHelp = true;
    this.contactsSearch = '';
    this.contacts = [];
    this.activeContact = null;
    this.addFieldOpen = false;
    this.editDetailsOpen = false;
    this.defaultKeys = ['id', 'alias', 'first_name', 'last_name', 'email', 'phone', 'organization', 'verified'];
  }

  oninit() {
    this.params = m.parsePathname(m.route.get()).params;
    this.setSelectedTab('contacts');
  }

  setSelectedTab(tab) {
    this.selectedTab = tab;
    this.contactsSearch = '';
    this.contacts = [];

    if (this.selectedTab === 'company') {
      KERI.getContactsGrouped('organization', {})
        .then((contacts) => {
          this.contacts = contacts;
        })
        .catch((err) => {
          console.log('getContacts', err);
        });
    } else {
      KERI.getContactsFiltered({})
        .then((contacts) => {
          this.contacts = contacts;
          if (this.params && this.params.id) {
            this.activeContact = this.contacts.find((contact) => {
              return contact.id === this.params.id;
            });
          }
        })
        .catch((err) => {
          console.log('getContacts', err);
        });
    }
  }

  searchFilteredContact() {
    if (this.selectedTab === 'company') {
      KERI.getContactsGrouped('organization', {
        organization: this.contactsSearch,
      })
        .then((contacts) => {
          this.contacts = contacts;
        })
        .catch((err) => {
          console.log('getContacts', err);
        });
    } else {
      KERI.getContactsFiltered({
        alias: this.contactsSearch,
      })
        .then((contacts) => {
          this.contacts = contacts;
        })
        .catch((err) => {
          console.log('getContacts', err);
        });
    }
  }

  setActiveContact(contact) {
    this.activeContact = contact;
  }

  customKeys() {
    return Object.keys(this.activeContact).filter((key) => {
      return !this.defaultKeys.includes(key);
    });
  }

  removeCustomKey(key) {
    const keys = Object.keys(this.activeContact).filter((contactKey) => {
      return key !== contactKey && key !== 'id';
    });
    let body = {};
    keys.map((key) => {
      body[key] = this.activeContact[key];
    });
    KERI.overwriteContact(this.activeContact.id, body).then(() => {
      delete this.activeContact[key];
    });
  }

  saveContact() {
    let { first_name, last_name, email, phone } = this.activeContact;
    let body = {
      first_name,
      last_name,
      email,
      phone,
    };
    this.customKeys().map((key) => {
      body[key] = this.activeContact[key];
    });
    KERI.updateContact(this.activeContact.id, body).then(() => {});
  }

  view(vnode) {
    return (
      <>
        <div class="contacts">
          <NavRail selected="contacts" />
          <Container class="headspace">
            <div class="flex flex-justify-between">
              <div class="flex-1 margin-right-4">
                <Card class="card--fluid" padding="1rem">
                  <TabBar>
                    <Tab
                      label="Company (LEI)"
                      active={this.selectedTab === 'company'}
                      onclick={() => {
                        this.setSelectedTab('company');
                      }}
                    />
                    <Tab
                      label="Contacts"
                      active={this.selectedTab === 'contacts'}
                      onclick={() => {
                        this.setSelectedTab('contacts');
                      }}
                    />
                  </TabBar>
                  <div class="contacts-tab-content">
                    <TextField
                      class="margin-bottom-1"
                      filled
                      fluid
                      placeholder="Search for Contacts"
                      iconLeading={{
                        icon: 'search',
                      }}
                      oninput={(e) => {
                        this.contactsSearch = e.target.value;
                        this.searchFilteredContact();
                      }}
                      value={this.contactsSearch}
                    />
                    {this.selectedTab === 'company' &&
                      Object.keys(this.contacts).map((organization) => {
                        return (
                          <div class="contacts-company">
                            <p class="contacts-company-name">{organization}</p>
                            <div class="contacts-company-list">
                              {this.contacts[organization].map((contact) => {
                                return (
                                  <div
                                    class={`contacts-list-item ${
                                      this.activeContact === contact ? 'contacts-list-item--active' : ''
                                    }`}
                                    onclick={() => {
                                      this.setActiveContact(contact);
                                    }}
                                  >
                                    <ProfilePicture identifier={contact} />
                                    <p class="contacts-list-item-name">{contact.alias}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    {this.selectedTab === 'contacts' &&
                      this.contacts.map((contact) => {
                        return (
                          <div
                            class={`contacts-list-item ${
                              this.activeContact === contact && 'contacts-list-item--active'
                            }`}
                            onclick={() => {
                              this.setActiveContact(contact);
                            }}
                          >
                            <ProfilePicture identifier={contact} />
                            <div class="contacts-list-item-name">
                              <p>{contact.alias}</p>
                              <p>{contact.organization}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
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
                        <div class="contacts-detail">
                          <div class="contacts-detail-header">
                            <ProfilePicture identifier={this.activeContact} />
                            <div class="contacts-detail-name">
                              <p>{this.activeContact.alias}</p>
                              <p>{this.activeContact.organization}</p>
                            </div>
                            <span
                              className="material-icons-outlined md-24"
                              style={{ cursor: 'pointer', marginBottom: '1.5rem', marginLeft: '1rem' }}
                              onclick={() => {
                                console.log(this.editDetailsOpen);
                                this.editDetailsOpen = true;
                              }}
                            >
                              edit
                            </span>
                          </div>
                          <div class="contacts-detail-fields">
                            <div className="contacts-detail-field">
                              <label className="contacts-detail-field-label">AID:</label>
                              <div className="contacts-detail-field-input">
                                <code style="margin: 0 0 0 0;">{this.activeContact.id}</code>
                              </div>
                            </div>
                            <div class="contacts-detail-field">
                              <label class="contacts-detail-field-label">Authenticated:</label>
                              <div class="contacts-detail-field-input">
                                <Checkbox disabled checked={this.activeContact.verified === 'true'} />
                              </div>
                            </div>
                            <div class="contacts-detail-field">
                              <label class="contacts-detail-field-label">First Name:</label>
                              <div class="contacts-detail-field-input">
                                <TextField
                                  outlined
                                  fluid
                                  style={{
                                    height: '44px',
                                  }}
                                  value={this.activeContact.first_name}
                                  oninput={(e) => {
                                    this.activeContact.first_name = e.target.value;
                                  }}
                                />
                              </div>
                            </div>
                            <div class="contacts-detail-field">
                              <label class="contacts-detail-field-label">Last Name:</label>
                              <div class="contacts-detail-field-input">
                                <TextField
                                  outlined
                                  fluid
                                  style={{
                                    height: '44px',
                                  }}
                                  value={this.activeContact.last_name}
                                  oninput={(e) => {
                                    this.activeContact.last_name = e.target.value;
                                  }}
                                />
                              </div>
                            </div>
                            <div class="contacts-detail-field">
                              <label class="contacts-detail-field-label">Email:</label>
                              <div class="contacts-detail-field-input">
                                <TextField
                                  outlined
                                  fluid
                                  style={{
                                    height: '44px',
                                  }}
                                  value={this.activeContact.email}
                                  oninput={(e) => {
                                    this.activeContact.email = e.target.value;
                                  }}
                                />
                              </div>
                            </div>
                            <div class="contacts-detail-field">
                              <label class="contacts-detail-field-label">Phone:</label>
                              <div class="contacts-detail-field-input">
                                <TextField
                                  outlined
                                  fluid
                                  style={{
                                    height: '44px',
                                  }}
                                  value={this.activeContact.phone}
                                  oninput={(e) => {
                                    this.activeContact.phone = e.target.value;
                                  }}
                                />
                              </div>
                            </div>
                            {this.customKeys().map((key) => {
                              return (
                                <>
                                  <div class="contacts-detail-field">
                                    <label class="contacts-detail-field-label">{key}:</label>
                                    <div class="contacts-detail-field-input">
                                      <TextField
                                        outlined
                                        fluid
                                        style={{
                                          height: '44px',
                                        }}
                                        value={this.activeContact[key]}
                                        oninput={(e) => {
                                          this.activeContact[key] = e.target.value;
                                        }}
                                      />
                                      <IconButton
                                        class="margin-left-1"
                                        icon="close"
                                        onclick={() => {
                                          this.removeCustomKey(key);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div class="contacts-detail-buttons">
                            <Button
                              raised
                              class="button--gray button--no-transform"
                              label="Add New Field"
                              onclick={() => {
                                this.addFieldOpen = true;
                              }}
                            />
                            <Button
                              raised
                              class="button--no-transform"
                              label="Save"
                              onclick={() => {
                                this.saveContact();
                              }}
                            />
                          </div>
                        </div>
                        <EditContactModal
                          isOpen={this.editDetailsOpen}
                          onClose={() => {
                            this.editDetailsOpen = false;
                          }}
                          contact={this.activeContact}
                        />
                        <AddFieldModal
                          isOpen={this.addFieldOpen}
                          onClose={() => {
                            this.addFieldOpen = false;
                          }}
                          contact={this.activeContact}
                        />
                      </>
                    )}
                    {!this.activeContact && this.showHelp && (
                      <div class="contacts-help">
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
