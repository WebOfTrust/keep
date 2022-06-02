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
        <div class="flex flex-justify-between">
          <p class="p-tag">Name:</p>
          <TextField filled fluid placeholder={contact.alias} style={{ width: '60%', height: '2.5rem' }} />
        </div>
        {/* <div class="flex flex-justify-between">
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
        </div> */}
        <div class="flex flex-justify-between" style={{ marginTop: '3rem' }}>
          <Button class="button--gray-dk button--big button--no-transform" raised label="
          Go Back" />
          <Button class="button--big button--no-transform" raised label="Save" />
        </div>
      </>
    );
  }
}

module.exports = ContactDetails;
