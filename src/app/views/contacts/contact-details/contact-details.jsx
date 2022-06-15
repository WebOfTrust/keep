import m from 'mithril';
import { TextField, Button } from '../../../components';

class ContactDetails {
  view(vnode) {
    let contact = vnode.attrs.contact;

    return (
      <>
        <h1>My Contacts</h1>
        <div class="flex flex-justify-between" style={{ margin: '2rem 0 2rem 0' }}>
          {/* <img src={contact.displayPic} style={{ width: '40%', borderRadius: '50%' }} /> */}
          <div>
            <h4 style={{ color: '#3d63ae' }}>{contact.alias}</h4>
            {/* <h4 style={{ color: '#737374' }}>
              <u>{contact.role}</u>
            </h4> */}
          </div>
        </div>
        <div style={{ margin: '2rem 0 2rem 0' }}>
          <p class="p-tag-bold">Name:</p>
          <p>{contact.alias}</p>
        </div>
        <div style={{ margin: '2rem 0 2rem 0' }}>
          <p class="p-tag-bold">AID:</p>
          <code>{contact.id}</code>
        </div>
        <div class="flex flex-justify-end" style={{ marginTop: '3rem' }}>
          {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" /> */}
          <Button class="button--big button--no-transform" raised label="Close" />
        </div>
      </>
    );
  }
}

module.exports = ContactDetails;
