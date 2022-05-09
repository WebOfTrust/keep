import m from 'mithril';

// Tasks
import ConfigureMultiSigSet from './configure-multi-sig-set/configure-multi-sig-set';
import JoinMultiSigGroup from './join-multi-sig-group/join-multi-sig-group';
import CreateYourAID from './create-your-aid/create-your-aid';
import CreatePasscode from './create-your-passcode/create-your-passcode';
import CredentialIssuance from './credential-issuance/credential-issuance';
import CredentialRevocation from './credential-revocation/credential-revocation';
import IdentityAuthenticationIssue from './identity-authentication-issue/identity-authentication-issue';
import IdentityAuthenticationReceive from './identity-authentication-receive/identity-authentication-receive';
import InitiateVideoCall from './initiate-video-call/initiate-video-call';
import IntroToYourRole from './intro-to-your-role/intro-to-your-role';
import JoinVideoCall from './join-video-call/join-video-call';
import Login from './login/login';
import ManualKeyRotation from './manual-key-rotation/manual-key-rotation';
import ViewMultiSigEventLogs from './view-multi-sig-event-logs/view-multi-sig-event-logs';
import ViewNewCredential from './view-new-credential/view-new-credential';
import VerifyCredentials from './verify-credentials/verify-credentials';
// Images
import createYourPasscode from '../../src/assets/img/create-your-passcode.svg';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import projectPlanning from '../../src/assets/img/project-planning.svg';
import createIdentifier from '../../src/assets/img/create-identifier.svg';
import secureMessaging from '../../src/assets/img/secure-messaging.svg';
import uploadFile from '../../src/assets/img/upload-file.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import calendar from '../../src/assets/img/calendar.svg';
import loanApproved from '../../src/assets/img/loan-approved.svg';

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
      label: 'Identity Authentication (Issue)',
      component: {
        view: (vnode) => {
          return <IdentityAuthenticationIssue end={vnode.attrs.end} />;
        },
      },
    },
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
      imgSrc: loanApproved,
      label: 'Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
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
    {
      imgSrc: verifyCredentials,
      label: 'Trigger Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: projectPlanning,
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
      imgSrc: calendar,
      label: 'View Multi-Sig Event Logs',
      component: {
        view: (vnode) => {
          return <ViewMultiSigEventLogs end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: secureMessaging,
      label: 'Configure Multi-Sig Group',
      component: {
        view: (vnode) => {
          return <ConfigureMultiSigSet end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: secureMessaging,
      label: 'Join Multi-Sig Group',
      component: {
        view: (vnode) => {
          return <JoinMultiSigGroup end={vnode.attrs.end} />;
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
    {
      imgSrc: uploadFile,
      label: 'Presentation Request',
      component: {
        view: (vnode) => {
          return <VerifyCredentials end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
