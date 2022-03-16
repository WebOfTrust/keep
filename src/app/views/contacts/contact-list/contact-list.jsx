import m from 'mithril';
import { TextField, Button } from '../../../components';

class ContactList {
  // handleClick = () => {};
  view(vnode) {
    return (
      <>
        <div
          class="flex flex-justify-between divider"
          style={{
            alignItems: 'center',
            margin: '.2rem 0 .2rem 0',
            height: '40px',
            padding: '25px 0 25px 0',
            cursor: 'pointer',
          }}
          onclick={() => {
            vnode.attrs.setContact(vnode.attrs.contact.id);
          }}
        >
          <div class="flex" style={{ alignItems: 'center' }}>
            <img src={vnode.attrs.contact.displayPic} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
            <div class="flex flex-column">
              <p style={{ margin: '0 0 0 1rem', fontSize: '90%' }}>{vnode.attrs.contact.name}</p>
              <p style={{ margin: '0 0 0 1rem', fontSize: '70%' }}>{vnode.attrs.contact.description}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = ContactList;
