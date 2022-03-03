import m from 'mithril';

// Tasks
import CreateYourAID from './create-your-aid/create-your-aid';
import CreatePasscode from './create-your-passcode/create-your-passcode';
import IdentityAuthenticationReceive from './identity-authentication-receive/identity-authentication-receive';
import IdentityAuthenticationSend from './identity-authentication-send/identity-authentication-send';
import IntroToYourRole from './intro-to-your-role/intro-to-your-role';
import Login from './login/login';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';

const tasks = {
  'create-passcode': [
    {
      imgSrc: createYourPasscode,
      label: 'Create Your Passcode',
      component: {
        view: (vnode) => {
          return <CreatePasscode end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: createYourPasscode,
      label: 'Enter Your Passcode',
      component: {
        view: (vnode) => {
          return <Login end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your AID',
      component: {
        view: (vnode) => {
          return <CreateYourAID end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'intro-to-role': [
    {
      imgSrc: createIdentifier,
      label: 'Intro to Your Role',
      component: {
        view: (vnode) => {
          return <IntroToYourRole end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'main': [
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication (Receive)',
      component: {
        view: (vnode) => {
          return <IdentityAuthenticationReceive end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication (Send)',
      component: {
        view: (vnode) => {
          return <IdentityAuthenticationSend end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
