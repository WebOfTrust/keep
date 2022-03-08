import m from 'mithril';

// Generic Tasks
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';

// Tasks
import IntroToAVRRole from './intro-you-the-avr-role/intro-to-the-avr-role';
// import IDAssuranceOfOOR from './identity-assurance-of-oor/identity-assurance-of-oor';
import CreateYourAvrAid from './create-your-avr-aid/create-your-avr-aid';
// import QVIIdentityAssurance from './qvi-identity-assurance/qvi-identity-assurance';
import IssueOORvLEICredential from './issue-oor-vlei-credential/issue-oor-vlei-credential';
import TriggerManualKeyRotation from './trigger-manual-key-rotation/trigger-manual-key-rotation';
import RevokeAVRvLEICredential from './revoke-avr-vlei-credential/revoke-avr-vlei-credential';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';

const tasks = {
  'create-passcode': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your Passcode',
      component: {
        view: (vnode) => {
          return <CreateYourPasscode end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: createIdentifier,
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
      label: 'Create my QAR ID',
      component: {
        view: (vnode) => {
          return '<CreateYourQarAID end={vnode.attrs.end} />';
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
          return '<IntroToAVRRole end={vnode.attrs.end} />';
        },
      },
    },
  ],
  'main': [
    {
      imgSrc: verifyCredentials,
      label: 'Create my AVR AID',
      component: {
        view: (vnode) => {
          return <CreateYourAvrAid end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication',
      component: {
        view: (vnode) => {
          return '<QVIIdentityAssurance end={vnode.attrs.end} />';
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Issue the OOR vLEI Credential',
      component: {
        view: (vnode) => {
          return <IssueOORvLEICredential end={vnode.attrs.end} />;
        },
      },
    },

    {
      imgSrc: declineRequest,
      label: 'Revoke OOR vLEI Credential',
      component: {
        view: (vnode) => {
          return <RevokeAVRvLEICredential end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
