import m from 'mithril';
import { KERI, Profile } from '../../../services';
import { Button, Card } from '../../../components';
import githubLogo from '../../../../assets/img/github-logo.svg';

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
        <div class="flex" style={{ marginBottom: '2rem' }}>
          <img src={githubLogo} style={{ height: '100px', width: '100px', marginRight: '2rem' }} />
          <div>
            <h4 style={{ margin: '0 0 1rem 0' }}>Bob Smith</h4>
            <p style={{ margin: '0 0 1rem 0' }}>
              QAR for <u>VeriTech</u>
            </p>
            <p style={{ margin: '0' }}>Credentials issued 12/7/21</p>
          </div>
        </div>
        <div style={{ maxHeight: '512px', overflowY: 'scroll' }}>
          <p class="p-tag-bold">Issuee Alias:</p>
          <p>
            <u>Bob S. - VeriTech</u>
          </p>
          <p class="p-tag-bold">Issued By:</p>
          <p>LAR Corp.</p>
          <p class="p-tag-bold">Credential Type:</p>
          <p>Legal Entity vLEI Credential</p>
          <p class="p-tag-bold">Legal Entity Identifier:</p>
          <p>38439512746538294385</p>
          <p class="p-tag-bold">Issued on:</p>
          <p>12/7/21 at 2:46pm</p>
          <p class="p-tag font-size--20" style={{ marginTop: '2rem' }}>
            Provenance Chain:
          </p>
          <div class="flex flex-column">
            <div class="flex flex-align-center">
              <img
                src={githubLogo}
                style={{ borderRadius: '100%', height: '50px', marginRight: '1rem', width: '50px' }}
              />
              <p class="p-tag">
                <b>
                  <u>VeriTech</u>
                </b>{' '}
                granted QAR credentials to{' '}
                <b>
                  <u>Rose Chavez</u>
                </b>{' '}
                on 11/2/20
              </p>
            </div>
            <div
              style={{ height: '30px', borderLeft: '1px solid black', marginLeft: '1.5rem', marginTop: '-15px' }}
            ></div>
            <div class="flex flex-align-center">
              <img
                src={githubLogo}
                style={{ borderRadius: '100%', height: '50px', marginRight: '1rem', width: '50px' }}
              />
              <p class="p-tag">
                <b>
                  <u>Rose Chavez</u>
                </b>{' '}
                requested credentials for{' '}
                <b>
                  <u>Jane Smith</u>
                </b>{' '}
                on 12/1/21
              </p>
            </div>
            <div
              style={{ height: '30px', borderLeft: '1px solid black', marginLeft: '1.5rem', marginTop: '-15px' }}
            ></div>
            <div class="flex flex-align-center">
              <img
                src={githubLogo}
                style={{ borderRadius: '100%', height: '50px', marginRight: '1rem', width: '50px' }}
              />
              <p class="p-tag">
                <b>
                  <u>Octocat</u>
                </b>{' '}
                approved credentials for{' '}
                <b>
                  <u>Bob Smith</u>
                </b>{' '}
                on 12/7/21
              </p>
            </div>
            <div
              style={{ height: '30px', borderLeft: '1px solid black', marginLeft: '1.5rem', marginTop: '-16px' }}
            ></div>
            <div class="flex flex-align-center">
              <img
                src={githubLogo}
                style={{ borderRadius: '100%', height: '50px', marginRight: '1rem', width: '50px' }}
              />
              <p class="p-tag">
                <b>
                  <u>Credentials issued on 12/7/21</u>
                </b>
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
          <Button
            class="button button--big button--no-transform"
            raised
            label="Export"
            onclick={() => {
              this.exportCredential(credential);
            }}
          />
        </div>
        {/* <div style={{ maxHeight: '624px', overflowY: 'scroll', margin: '0 0 0 0' }}>
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
                <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
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
                <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
                  Issued By:
                </p>
                <code style="margin: 0 0 0 0;">{issuer.alias}</code>
              </div>
            ) : (
              <div style={{ margin: '2rem 0 2rem 0' }}>
                <p class="p-tag-bold" style={{ margin: '1rem 0 0 0' }}>
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
        </div> */}
      </>
    );
  }
}

module.exports = CredentialDetails;
