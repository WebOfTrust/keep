import m from 'mithril';

class CredentialList {
  // handleClick = () => {};

    getIdentifierName(identifiers, aid) {
        try {
            return identifiers.get(aid).name
        }catch (e) {
            return "";
        }
    }

    getContactAlias(contacts, aid) {
        try {
            return contacts.get(aid).alias
        }catch (e) {
            return "";
        }
    }

    isSelfIssued(attrs, identifiers, aid) {
        return attrs !== undefined && attrs["i"] === undefined && identifiers.has(aid);
    }

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
                  {vnode.attrs.type === 'issued'
                      && this.isSelfIssued(vnode.attrs, vnode.attrs.identifiers, vnode.attrs.credential['sad']['i'])
                      && (
                          <>
                              <div style={{ paddingLeft: '0.5rem'}}>Issued by you</div>
                          </>
                      )}
                  {vnode.attrs.type === 'issued'
                      && !this.isSelfIssued(vnode.attrs, vnode.attrs.identifiers, vnode.attrs.credential['sad']['i'])
                      && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>Issued from: {
                              this.getIdentifierName(vnode.attrs.identifiers, vnode.attrs.credential['sad']['i'])
                          }</div>
                      </>
                  )}
                  {vnode.attrs.type === 'issued'
                      && !this.isSelfIssued(vnode.attrs, vnode.attrs.identifiers, vnode.attrs.credential['sad']['i'])
                      && vnode.attrs.credential['sad']['a'] !== undefined
                      && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>Issued to: {
                              this.getContactAlias(vnode.attrs.contacts, vnode.attrs.credential['sad']['a']['i'])
                          }</div>
                      </>
                  )}
                  {vnode.attrs.type === 'received' && (
                      <div style={{ paddingLeft: '0.5rem'}}>Issued to: {
                          this.getIdentifierName(vnode.attrs.identifiers, vnode.attrs.credential['sad']['a']['i'])
                      }</div>
                  )}
                  {vnode.attrs.type === 'received' && vnode.attrs.credential['sad']['a'] !== undefined && (
                      <>
                          <div style={{ paddingLeft: '0.5rem'}}>Issued from: {
                              this.getContactAlias(vnode.attrs.contacts, vnode.attrs.credential['sad']['i'])
                          }</div>
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
