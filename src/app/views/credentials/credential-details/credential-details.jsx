import m from 'mithril';
import { KERI, Profile } from '../../../services';
import { Button, Card } from '../../../components';

class CredentialDetails {
  constructor() {}

  exportCredential(credential) {
    let alias = 'person';
    let said = credential['sad']['d'];

    KERI.exportCredential(alias, said).then((data) => {
      let b = new Blob([data], { type: 'application/json+cesr' });
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(b);
      a.download = 'credential.cesr';
      a.click();
    });
  }

  view(vnode) {
    let credential = vnode.attrs.credential;
    let sad = vnode.attrs.credential['sad'];
    let schema = vnode.attrs.schema.get(sad['s']);
    let attrs = sad['a'];
    let issuer = vnode.attrs.contacts.get(sad['i']);

    return (
      <>
        <h2>My Credentials</h2>
        <div style={{ height: '624px', overflowY: 'scroll', margin: '0 0 0 0' }}>
          <Card class="" style={{ margin: '1px', padding: '0' }}>
            <div class="flex flex-justify-between">
              <div class="flex">
                <div class="font-weight--medium" style={{ marginLeft: '1rem', marginTop: '1.25rem' }}>
                  {schema['title']}
                </div>
              </div>
            </div>

            <div>
              <div>
                <div style={{ margin: '0 0 2rem 0' }}>
                  <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    SAID:
                  </p>
                  <code style="margin: 0 0 0 0;">{sad['d']}</code>
                </div>
              </div>
              {'personLegalName' in attrs && (
                <div>
                  <div style={{ margin: '0 0 2rem 0' }}>
                    <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Person Legal Name:
                    </p>
                    <code style="margin: 0 0 0 0;">{attrs['personLegalName']}</code>
                  </div>
                </div>
              )}
              {'officialRole' in attrs && (
                <div>
                  <div style={{ margin: '0 0 2rem 0' }}>
                    <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Official Role:
                    </p>
                    <code style="margin: 0 0 0 0;">{attrs['officialRole']}</code>
                  </div>
                </div>
              )}
              {'engagementContextRole' in attrs && (
                <div>
                  <div style={{ margin: '0 0 2rem 0' }}>
                    <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                      Person Legal Name:
                    </p>
                    <code style="margin: 0 0 0 0;">{attrs['engagementContextRole']}</code>
                  </div>
                </div>
              )}

              {'LEI' in attrs && (
                <div style={{ margin: '2rem 0 2rem 0' }}>
                  <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    LEI:
                  </p>
                  <code style="margin: 0 0 0 0;">{attrs['LEI']}</code>
                </div>
              )}

              {issuer !== undefined ? (
                <div style={{ margin: '2rem 0 2rem 0' }}>
                  <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    Issued By:
                  </p>
                  <code style="margin: 0 0 0 0;">{issuer.alias}</code>
                </div>
              ) : (
                <div style={{ margin: '2rem 0 2rem 0' }}>
                  <p className="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                    Data Attestation on Report:
                  </p>
                  <code style="margin: 0 0 0 0;">{attrs['rd']}</code>
                </div>
              )}
            </div>
            <Button
              style={{ margin: '0 1rem 0 0' }}
              class="button button--no-transform"
              raised
              label="Export"
              onclick={() => {
                this.exportCredential(credential);
              }}
            />
          </Card>
        </div>
      </>
    );
  }
}

module.exports = CredentialDetails;
