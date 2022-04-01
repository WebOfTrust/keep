import m from 'mithril';

// Generic Tasks
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';
import JoinVideoCall from '../generic/join-video-call/join-video-call';
import InitiateVideoCall from '../generic/initiate-video-call/initiate-video-call';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import IdentityAuthenticationSend from '../generic/identity-authentication-send/identity-authentication-send';
import ViewMultiSigSet from '../generic/view-multi-sig-set/view-multi-sig-set';
import ConfigureMultiSigSet from '../generic/configure-multi-sig-set/configure-multi-sig-set';
// Tasks
// import IntroToAVRRole from './intro-you-the-avr-role/intro-to-the-avr-role';
// import IDAssuranceOfOOR from './identity-assurance-of-oor/identity-assurance-of-oor';
// import CreateYourAvrAid from './create-your-avr-aid/create-your-avr-aid';
// import QVIIdentityAssurance from './qvi-identity-assurance/qvi-identity-assurance';
// import IssueOORvLEICredential from './issue-oor-vlei-credential/issue-oor-vlei-credential';
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
// import TriggerManualKeyRotation from './trigger-manual-key-rotation/trigger-manual-key-rotation';
import ManualKeyRotation from '../generic/manual-key-rotation/manual-key-rotation';
import CredentialRevocation from '../generic/credential-revocation/credential-revocation';
// import RevokeAVRvLEICredential from './revoke-avr-vlei-credential/revoke-avr-vlei-credential';

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
      imgSrc: verifyCredentials,
      label: 'Create my AVR AID',
      component: {
        view: (vnode) => {
          return <CreateYourAid end={vnode.attrs.end} />;
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
      label: 'Identity Authentication (receive)',
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
      imgSrc: loanApproved,
      label: 'Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: verifyCredentials,
      label: 'Manual Key Rotation (not yet triggered) ',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Credential Revocation',
      component: {
        view: (vnode) => {
          return <CredentialRevocation end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;