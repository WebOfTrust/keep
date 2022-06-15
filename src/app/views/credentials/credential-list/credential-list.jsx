import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.svg';

class CredentialList {
  view(vnode) {
    return (
      <>
        <div
          class="flex flex-align-center"
          style={{
            backgroundColor: vnode.attrs.active ? '#f1f8ff' : 'transparent',
            borderBottom: '1px solid #b2b2b2',
            cursor: 'pointer',
            padding: '1rem',
          }}
          onclick={() => {
            vnode.attrs.setCredential(vnode.attrs.credential);
          }}
        >
          {/* <div class="flex" style={{ alignItems: 'center' }}>
            <div class="flex flex-column">

              <p style={{ margin: '0 0 0 1rem', fontSize: '90%' }}>{vnode.attrs.schema['title']}</p>
            </div>
          </div> */}
          <img src={githubLogo} style={{ borderRadius: '100%', height: '40px', width: '40px' }} />
          <div style={{ marginLeft: '1rem' }}>
            <p class="font-weight--medium" style={{ fontSize: '14px', margin: '0', lineHeight: '1.5' }}>
              Bob Smith - Personal
            </p>
            <p class="font-color--light font-weight--medium" style={{ fontSize: '14px', margin: '0' }}>
              {vnode.attrs.schema.title}
            </p>
          </div>
        </div>
      </>
    );
  }
}

module.exports = CredentialList;
