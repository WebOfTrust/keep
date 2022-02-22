import m from 'mithril';
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import CreatePasscode from './create-passcode/create-passcode';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';
import MultiSigSet from './multi-sig-set/multi-sig-set';
import IntroToQDACRole from './intro-to-your-qdac-role/intro-to-your-qdac-role';
import CreateYourQdacAid from './create-your-qdac-aid/create-your-qdac-aid';
import JoinVideoCall from './join-video-call/join-video-call';
import InitiateVideoCall from './initiate-video-call/initiate-video-call';
const tasks = {
  'create-passcode': [
    {
      imgSrc: addNewContacts,
      label: 'Create Passcode',
      component: {
        view: (vnode) => {
          return <CreatePasscode end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your QDAC AID',
      component: {
        view: (vnode) => {
          return <CreateYourQdacAid end={vnode.attrs.end} />;
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
          return <IntroToQDACRole end={vnode.attrs.end} />;
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
      imgSrc: addNewContacts,
      label: 'Multi Sig Set Temp Location',
      component: {
        view: (vnode) => {
          return <MultiSigSet end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
