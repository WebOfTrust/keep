import m from 'mithril';

// Tasks
import CreateYourGleifAID from './create-your-gleif-aid/create-your-gleif-aid';
import GracIntroToYourRole from './grac-intro-to-your-role/grac-intro-to-your-role';
import JoinVideoCall from './join-video-call/join-video-call';
import InitiateVideoCall from './initiate-video-call/inititate-video-call';
import ConfigureMultiSig from './configure-multi-sig-set/configure-mutli-sig-set';
import ViewMultiSig from './view-multi-sig-set/view-multi-sig-set';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import secureMessaging from '../../src/assets/img/secure-messaging.png';

const tasks = {
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your GLEIF AID',
      component: {
        view: (vnode) => {
          return <CreateYourGleifAID end={vnode.attrs.end} />;
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
          return <GracIntroToYourRole end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'oobi': [
    {
      imgSrc: addNewContacts,
      label: 'Initiate Video Call with GLEIF Controllers',
      component: {
        view: (vnode) => {
          return <InitiateVideoCall end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Join Video Call with GLEIF Genesis Controllers',
      component: {
        view: (vnode) => {
          return <JoinVideoCall end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: secureMessaging,
      label: 'Configure Multi-Sig Set as GLEIF Genesis Controller',
      component: {
        view: (vnode) => {
          return <ConfigureMultiSig end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'View Multi-Sig Verification Event Logs',
      component: {
        view: (vnode) => {
          return <ViewMultiSig end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
