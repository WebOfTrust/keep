import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.svg';
import { Button, Card, Checkbox, IconButton, Radio, TextField } from '../../../components';
import uploadPhoto from '../../../../assets/img/upload-image.svg';
import 'emoji-picker-element';
import { KERI, Notify, Profile } from '../../../services';
import ProfilePicture from '../../../components/profile/picture';
import AddFieldModal from './add-field-modal';
import EditAliasModal from './edit-alias-modal';

class Identifier {
  view(vnode) {
    return (
      <>
        <h1>{vnode.attrs.parent.selectedIdentifier.name}</h1>
        <div style={{ margin: '2rem 0 2rem 0', position: 'relative' }}>
          <ProfilePicture identifier={vnode.attrs.parent.selectedIdentifier} />
          <span
            className="material-icons-outlined md-24"
            style={{
              marginRight: '1rem',
              backgroundColor: '#494949',
              borderRadius: '50%',
              position: 'absolute',
              top: '50px',
              left: '50px',
              color: 'white',
              padding: '0.25rem',
            }}
            onclick={vnode.attrs.editImage}
          >
            photo_camera
          </span>
        </div>
        <div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Email:</p>
            <p class="p-tag">Octocat</p>
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Company:</p>
            <p class="p-tag">GLEIF</p>
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Phone Number:</p>
            <p class="p-tag">+ 1-801-888-8888</p>
          </div>
        </div>
        <div class="flex flex-justify-between" style={{ margin: '4rem 0 0 0' }}>
          <Button
            class="button--secondary"
            raised
            label="
                                 Go Back"
            onclick={vnode.attrs.back}
          />
          <Button raised label="Edit" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class IdentifierEditPage {
  view(vnode) {
    return (
      <>
        <h1>{vnode.attrs.parent.selectedIdentifier.name}</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          <img src={githubLogo} style={{ width: '35%', borderRadius: '50%' }} />
        </div>
        <div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Email:</p>
            <TextField filled fluid placeholder="octocat@gleif.org" style={{ width: '60%', height: '2.5rem' }} />
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Company:</p>
            <TextField filled fluid placeholder="GLEIF" style={{ width: '60%', height: '2.5rem' }} />
          </div>
          <div class="flex flex-justify-between">
            <p class="p-tag">Phone Number:</p>
            <TextField filled fluid placeholder="+ 1-801-888-8888" style={{ width: '60%', height: '2.5rem' }} />
          </div>
        </div>
        <div className="flex flex-justify-between" style={{ marginTop: '3rem' }}>
          <Button
            class="button--secondary"
            raised
            label="
                         Go Back"
            onclick={vnode.attrs.back}
          />
          <Button raised label="Save" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class EditImage {
  emojiShow = false;

  oncreate(vnode) {
    document.querySelector('emoji-picker').addEventListener('emoji-click', (e) => {
      console.log(e.detail.unicode);
    });
  }

  toggle() {
    console.log('toggle');
    this.emojiShow = !this.emojiShow;
    console.log('toggle', this.emojiShow);
    document.querySelector('emoji-container').style.display = this.emojiShow ? 'block' : 'none';
  }

  view(vnode) {
    return (
      <>
        <div style={{ margin: '2rem' }}>
          <img src={uploadPhoto} style={{ marginBottom: '1rem' }} />
          <h3>Select a Symbol or Photo for {vnode.attrs.parent.selectedIdentifier.alias}</h3>
          <p class="p-tag">This symbol or photo will be listed alongside your alias in your credentials wallet.</p>

          <div className="flex flex-align-center" style={{ color: '#494949' }}>
            <span className="material-icons md-48" style={{ marginRight: '1rem' }}>
              photo
            </span>
            <h4>Update picture</h4>
            <p />
            <input type="file" id="fileLoader" name="files" title="Load File" style={{ display: 'none' }} />
            <Button class="button--secondary" raised label="+" />
          </div>
          {/*<input type="file" style={{margin: '0 0 1rem 0'}}/>*/}
          <div className="flex flex-align-center" style={{ color: '#494949' }}>
            <span className="material-icons md-48" style={{ marginRight: '1rem' }}>
              mood
            </span>
            <h4>Use emoji</h4>
            <Button onclick={this.toggle} label="me" />
          </div>
          <div id="emoji-container" style={{ display: 'none' }}>
            <emoji-picker></emoji-picker>
          </div>
        </div>
      </>
    );
  }
}

class ListIdentifiers {
  constructor() {
    this.defaultKeys = ['first_name', 'last_name', 'email', 'organization', 'default'];
  }

  customKeys(aid) {
    return Object.keys(aid.metadata).filter((key) => {
      return !this.defaultKeys.includes(key);
    });
  }

  removeCustomKey(aid, key) {
    const keys = Object.keys(aid.metadata).filter((contactKey) => {
      return key !== contactKey && key !== 'id';
    });
    let body = {};
    keys.map((key) => {
      body[key] = aid.metadata[key];
    });
    KERI.replaceIdentifierMetadata(aid.name, body).then(() => {
      delete aid.metadata[key];
    });
  }

  saveMetadata(aid) {
    let { first_name, last_name, email, organization } = aid.metadata;
    let body = {
      first_name,
      last_name,
      email,
      organization,
    };
    this.customKeys(aid).map((key) => {
      body[key] = aid.metadata[key];
    });
    KERI.updateIdentifierMetadata(aid.name, body).then(() => {});
  }

  view(vnode) {
    return (
      <>
        <div className="flex flex-row flex-align-left flex-justify-between">
          <h3>Local Identifiers</h3>
        </div>
        {Profile.identifiers === undefined ||
          (Profile.identifiers.length === 0 && (
            <div className="font-weight--bold font-color--battleship flex flex-align-left" style={{ margin: '1rem 0' }}>
              <i style={{ marginLeft: '0.5rem' }}>No identifiers</i>
            </div>
          ))}

        {Profile.identifiers && (
          <div style={{ height: '640px', overflowY: 'auto', margin: '0 0 0 0' }}>
            {Profile.identifiers.map((aid) => {
              return (
                <Card style={{ margin: '10px 5px 10px 5px', padding: '0' }}>
                  <div class="flex flex-justify-between">
                    <div class="flex">
                      <ProfilePicture identifier={aid} />
                      <div class="font-weight--medium" style={{ marginLeft: '1rem', marginTop: '1.25rem' }}>
                        {aid.name}
                      </div>
                      <span
                        className="material-icons-outlined md-24"
                        style={{ cursor: 'pointer', marginBottom: '1.5rem', marginLeft: '1rem' }}
                        onclick={() => {
                          this.editAliasOpen = true;
                        }}
                      >
                        edit
                      </span>
                    </div>

                    <span className="material-icons-outlined md-24" style={{ marginTop: '1rem' }}>
                      {aid.hasOwnProperty('group') ? 'group' : 'person'}
                    </span>
                  </div>

                  <div>
                    <div style={{ margin: '2rem 0 2rem 0' }}>
                      <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                        AID:
                      </p>
                      <code style="margin: 0 0 0 0;">{aid.prefix}</code>
                    </div>

                    {aid.public_keys && (
                      <div>
                        <div style={{ margin: '0 0 2rem 0' }}>
                          <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                            Public Keys:
                          </p>
                          {aid.public_keys.map((pk) => {
                            return (
                              <div>
                                <code style="margin: 0 0 0 0;">{pk}</code>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {aid.delegated && (
                      <div>
                        <div style={{ margin: '0 0 2rem 0' }}>
                          <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                            Delegator:
                          </p>
                          <div>
                            <code style="margin: 0 0 0 0;">{aid.delegator}</code>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-justify-between" style={{ marginTop: '0', alignItems: 'center' }}>
                      <div className="flex">
                        <Radio
                          id="alias"
                          name="alias"
                          checked={'metadata' in aid && 'default' in aid.metadata && aid.metadata.default === 'true'}
                          onclick={() => {
                            Profile.setDefaultAID(aid).then(() => {
                              m.redraw();
                            });
                          }}
                          style={{ marginTop: '1rem' }}
                        />
                        <p className="p-tag">Use as default</p>
                      </div>
                    </div>

                    <div className="contacts-detail-fields">
                      <div className="contacts-detail-field">
                        <label className="contacts-detail-field-label">First Name:</label>
                        <div className="contacts-detail-field-input">
                          <TextField
                            outlined
                            fluid
                            style={{
                              height: '44px',
                            }}
                            value={aid.metadata.first_name}
                            oninput={(e) => {
                              aid.metadata.first_name = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="contacts-detail-field">
                        <label className="contacts-detail-field-label">Last Name:</label>
                        <div className="contacts-detail-field-input">
                          <TextField
                            outlined
                            fluid
                            style={{
                              height: '44px',
                            }}
                            value={aid.metadata.last_name}
                            oninput={(e) => {
                              aid.metadata.last_name = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="contacts-detail-field">
                        <label className="contacts-detail-field-label">Organization:</label>
                        <div className="contacts-detail-field-input">
                          <TextField
                            outlined
                            fluid
                            style={{
                              height: '44px',
                            }}
                            value={aid.metadata.organization}
                            oninput={(e) => {
                              aid.metadata.organization = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="contacts-detail-field">
                        <label className="contacts-detail-field-label">Email:</label>
                        <div className="contacts-detail-field-input">
                          <TextField
                            outlined
                            fluid
                            style={{
                              height: '44px',
                            }}
                            value={aid.metadata.email}
                            oninput={(e) => {
                              aid.metadata.email = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                      {this.customKeys(aid).map((key) => {
                        return (
                          <>
                            <div className="contacts-detail-field">
                              <label className="contacts-detail-field-label">{key}:</label>
                              <div className="contacts-detail-field-input">
                                <TextField
                                  outlined
                                  fluid
                                  style={{
                                    height: '44px',
                                  }}
                                  value={aid.metadata[key]}
                                  oninput={(e) => {
                                    aid.metadata[key] = e.target.value;
                                  }}
                                />
                                <IconButton
                                  class="margin-left-1"
                                  icon="close"
                                  onclick={() => {
                                    this.removeCustomKey(aid, key);
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    <div className="contacts-detail-buttons">
                      <Button
                        raised
                        class="button--secondary"
                        label="Add New Field"
                        onclick={() => {
                          this.addFieldOpen = true;
                        }}
                      />
                      <Button
                        raised
                        label="Save"
                        onclick={() => {
                          this.saveMetadata(aid);
                        }}
                      />
                    </div>
                    <EditAliasModal
                      isOpen={this.editAliasOpen}
                      onClose={() => {
                        this.editAliasOpen = false;
                      }}
                      aid={aid}
                    />
                    <AddFieldModal
                      isOpen={this.addFieldOpen}
                      onClose={() => {
                        this.addFieldOpen = false;
                      }}
                      aid={aid}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

class ManageIdentifiers {
  constructor() {
    this.currentState = 'list-identifiers';
  }

  selectedIdentifier = {};

  view(vnode) {
    return (
      <>
        {this.currentState === 'list-identifiers' && (
          <ListIdentifiers
            parent={this}
            continue={() => {
              this.currentState = 'identifier';
            }}
          />
        )}
        {this.currentState === 'identifier' && (
          <Identifier
            parent={this}
            editImage={() => {
              this.currentState = 'identifier-edit-image';
            }}
            back={() => {
              this.currentState = 'list-identifiers';
            }}
            continue={() => {
              this.currentState = 'identifier-edit-page';
            }}
          />
        )}
        {this.currentState === 'identifier-edit-page' && (
          <IdentifierEditPage
            parent={this}
            back={() => {
              this.currentState = 'identifier';
            }}
          />
        )}
        {this.currentState === 'identifier-edit-image' && (
          <EditImage
            parent={this}
            back={() => {
              this.currentState = 'identifier';
            }}
          />
        )}
      </>
    );
  }
}

module.exports = ManageIdentifiers;
