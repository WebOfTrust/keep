import m from 'mithril';

// Tasks
import ConfigureMultiSigSet from './configure-multi-sig-set/configure-multi-sig-set';
import CreateYourAID from './create-your-aid/create-your-aid';
import CreatePasscode from './create-your-passcode/create-your-passcode';
import CredentialIssuance from './credential-issuance/credential-issuance';
import CredentialRevocation from './credential-revocation/credential-revocation';
import IdentityAuthenticationReceive from './identity-authentication-receive/identity-authentication-receive';
import IdentityAuthenticationSend from './identity-authentication-send/identity-authentication-send';
import InitiateVideoCall from './initiate-video-call/initiate-video-call';
import IntroToYourRole from './intro-to-your-role/intro-to-your-role';
import JoinVideoCall from './join-video-call/join-video-call';
import Login from './login/login';
import ManualKeyRotation from './manual-key-rotation/manual-key-rotation';
import ViewMultiSigSet from './view-multi-sig-set/view-multi-sig-set';
import ViewNewCredential from './view-new-credential/view-new-credential';

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
    {
      imgSrc: addNewContacts,
      label: 'Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Credential Revocation',
      component: {
        view: (vnode) => {
          return <CredentialRevocation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Trigger Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Initiate Video Call',
      component: {
        view: (vnode) => {
          return <InitiateVideoCall end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Join Video Call',
      component: {
        view: (vnode) => {
          return <JoinVideoCall end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'View Multi-Sig Set',
      component: {
        view: (vnode) => {
          return <ViewMultiSigSet end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Configure Multi-Sig Set',
      component: {
        view: (vnode) => {
          return <ConfigureMultiSigSet end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'View New Credential',
      component: {
        view: (vnode) => {
          return <ViewNewCredential end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
