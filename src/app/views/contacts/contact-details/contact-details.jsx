import m from 'mithril';
import { TextField, Button } from '../../../components';
class ContactDetails {
  view(vnode) {
    let contacts = vnode.attrs.contacts;
    let contactArray = contacts.filter((x) => x.id === vnode.attrs.contactId);
    let contact = contactArray[0];
    return (
      <>
        <h1>My Contacts</h1>
        <div class="flex flex-justify-between">
          <img src={contact.displayPic} style={{ width: '40%', borderRadius: '50%' }} />
          <div>
            <h3>{contact.name}</h3>
            <h3>{contact.role}</h3>
          </div>
        </div>
        <div class="flex flex-justify-between">
          <p class="p-tag">Name:</p>
          <TextField filled fluid placeholder={contact.name} style={{ width: '60%', height: '2.5rem' }} />
        </div>
        <div class="flex flex-justify-between">
          <p class="p-tag">Email:</p>
          <TextField filled fluid placeholder={contact.email} style={{ width: '60%', height: '2.5rem' }} />
        </div>
        <div class="flex flex-justify-between">
          <p class="p-tag">Company:</p>
          <TextField filled fluid placeholder={contact.company} style={{ width: '60%', height: '2.5rem' }} />
        </div>
        <div class="flex flex-justify-between">
          <p class="p-tag">Phone Number:</p>
          <TextField filled fluid placeholder={contact.phoneNumber} style={{ width: '60%', height: '2.5rem' }} />
        </div>
        <div class="flex flex-justify-between" style={{ marginTop: '3rem' }}>
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button class="button--big button--no-transform" raised label="Save" />
        </div>
      </>
    );
  }
}

module.exports = ContactDetails;
