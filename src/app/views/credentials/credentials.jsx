import m from 'mithril';
import { Card, Container, IconButton, NavRail, Tab, TabBar, TextField, Button } from '../../components';
import CredentialList from '../credentials/credential-list/credential-list';
import CredentialDetails from './credential-details/credential-details';

import { KERI, Profile } from '../../services';
import credentialGroup from '../../../assets/img/contact-group.svg';
import './credentials.scss';

class Credentials {
  constructor(vnode) {
    this.credentials = [];
    this.activeCredential = null;
    this.schema = {};
    this.credentials = [];
    this.contacts = [];
    this.identifiers = [];
    this.type = vnode.attrs.type;
    this.activeTab = 'received';

    KERI.listIdentifiers().then((identifiers) => {
      this.identifiers = new Map(
        identifiers.map((i) => {
          return [i.prefix, i];
        })
      );
    });

    KERI.listSchema().then((schema) => {
      this.schema = new Map(
        schema.map((s) => {
          return [s['$id'], s];
        })
      );
      KERI.getContacts().then((contacts) => {
        this.contacts = new Map(
          contacts.map((c) => {
            return [c.id, c];
          })
        );
        this.listCredentials('received');
      });
    });
  }

  listCredentials(type) {
    this.activeCredential = null;
    KERI.listCredentials(Profile.getDefaultAID().name, type)
      .then((credentials) => {
        this.credentials = credentials;
      })
      .catch((err) => {
        this.credentials = [];
        console.log('listCredentials', err);
      });
  }

  setCredential = (credential) => {
    this.activeCredential = credential;
  };

  view(vnode) {
    return (
      <>
        <div class="credentials">
          <NavRail selected="credentials" />
          <Container class="margin-v-2">
            <div class="flex flex-justify-between">
              <div class="flex-1 margin-right-2">
                <Card class="card--fluid" padding="1.5rem">
                  <TabBar style={{ marginBottom: '1rem' }}>
                    <Tab
                      label="Received"
                      active={this.activeTab === 'received'}
                      onclick={() => {
                        this.activeTab = 'received';
                        this.listCredentials(this.activeTab);
                      }}
                    />
                    <Tab
                      label="Issued"
                      active={this.activeTab === 'issued'}
                      onclick={() => {
                        this.activeTab = 'issued';
                        this.listCredentials(this.activeTab);
                      }}
                    />
                  </TabBar>
                  {this.credentials.map((credential) => {
                    let sad = credential['sad'];
                    let schema = this.schema.get(sad['s']);
                    return (
                      <CredentialList
                        credential={credential}
                        schema={schema}
                        contacts={this.contacts}
                        identifiers={this.identifiers}
                        setCredential={this.setCredential}
                        type={this.activeTab}
                      />
                    );
                  })}
                </Card>
              </div>
              <div class="flex-1">
                <Card class={'card--fluid'} style={{ position: 'relative' }} padding="4rem">
                  <IconButton class="close-icon" icon="close" />
                  {this.activeCredential !== null ? (
                    <CredentialDetails
                      credential={this.activeCredential}
                      schema={this.schema}
                      contacts={this.contacts}
                      identifiers={this.identifiers}
                      type={this.activeTab}
                    />
                  ) : (
                    <>
                      <h2>My Credentials</h2>
                      <img src={credentialGroup} style={{ width: '50%', margin: '2rem 0 2rem 0' }} />
                      <h3>View Your Credentials</h3>
                      <p class="p-tag">
                        Click on any of your credentials on the sidebar to update or edit information about them or
                        their credentials.
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

module.exports = Credentials;
