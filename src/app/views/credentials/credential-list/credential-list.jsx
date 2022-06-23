import m from 'mithril';

class CredentialList {
  // handleClick = () => {};
  view(vnode) {
    return (
      <>
        <div
          class="flex flex-justify-between row"
          style={{
            alignItems: 'center',
            margin: '.2rem 0 .2rem 0',
            padding: '25px 0 25px 0',
            cursor: 'pointer',
          }}
          onclick={() => {
            vnode.attrs.setCredential(vnode.attrs.credential);
          }}
        >
          <div class="flex" style={{ alignItems: 'center'}}>
            <div class="flex flex-column">
              <div style={{ margin: '0 0 0 1rem', fontSize: '90%' }} >
                  <div style={{ fontWeight: 'bold', color:'#6C7476', paddingBottom: '0.5rem' }}>{vnode.attrs.schema['title']}</div>
                  {vnode.attrs.type === 'issued' && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>Issued from: {vnode.attrs.identifiers.get(vnode.attrs.credential['sad']['i']).name}</div>
                      </>
                  )}
                  {vnode.attrs.type === 'issued' && vnode.attrs.credential['sad']['a'] !== undefined && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>Issued to: {vnode.attrs.contacts.get(vnode.attrs.credential['sad']['a']['i']).alias}</div>
                      </>
                  )}
                  {vnode.attrs.type === 'received' && (
                      <div style={{ paddingLeft: '0.5rem'}}>Issued to: {vnode.attrs.identifiers.get(vnode.attrs.credential['sad']['a']['i']).name}</div>
                  )}
                  {vnode.attrs.type === 'received' && vnode.attrs.credential['sad']['a'] !== undefined && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>Issued from: {vnode.attrs.contacts.get(vnode.attrs.credential['sad']['i']).alias}</div>
                      </>
                  )}
                  {vnode.attrs.schema['title'] === 'Qualified vLEI Issuer Credential' && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>LEI: {vnode.attrs.credential['sad']['a']['LEI']}</div>
                      </>
                  )}
                  {vnode.attrs.schema['title'] === 'Legal Entity Official Organizational Role vLEI Credential' && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>LEI: {vnode.attrs.credential['sad']['a']['LEI']}</div>
                          <div style={{ paddingLeft: '0.5rem'}}>Role: {vnode.attrs.credential['sad']['a']['officialRole']}</div>
                          <div style={{ paddingLeft: '0.5rem'}}>Name: {vnode.attrs.credential['sad']['a']['personLegalName']}</div>
                      </>
                  )}
                  {vnode.attrs.schema['title'] === 'Legal Entity Engagement Context Role vLEI Credential' && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>LEI: {vnode.attrs.credential['sad']['a']['LEI']}</div>
                          <div style={{ paddingLeft: '0.5rem'}}>Role: {vnode.attrs.credential['sad']['a']['engagementContextRole']}</div>
                          <div style={{ paddingLeft: '0.5rem'}}>Name: {vnode.attrs.credential['sad']['a']['personLegalName']}</div>
                      </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = CredentialList;
