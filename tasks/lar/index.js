import m from 'mithril';
// Variables
import LarVariables from './variables';

// Generic Tasks
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';
import JoinVideoCall from '../generic/join-video-call/join-video-call';
import InitiateVideoCall from '../generic/initiate-video-call/initiate-video-call';
import IdentityAuthenticationIssue from '../generic/identity-authentication-issue/identity-authentication-issue';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
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
import VerifyCredentials from '../generic/verify-credentials/verify-credentials';
// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import projectPlanning from '../../src/assets/img/project-planning.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import secureMessaging from '../../src/assets/img/secure-messaging.png';
import uploadFile from '../../src/assets/img/upload-file.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import calendar from '../../src/assets/img/calendar.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
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
          return (
            <CreateYourAid
              welcome={LarVariables.createYourAid.welcome}
              creatingAID={LarVariables.createYourAid.CreateYourAID}
              stepsToCreate={LarVariables.createYourAid.stepsToCreate}
              createYourAlias={LarVariables.createYourAid.createYourAlias}
              end={vnode.attrs.end}
            />
          );
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
          return (
            <IntroToYourRole
              main={LarVariables.introToYourRole.main}
              steps={LarVariables.introToYourRole.steps}
              end={vnode.attrs.end}
            />
          );
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
      imgSrc: uploadFile,
      label: 'Presentation Request',
      component: {
        view: (vnode) => {
          return <VerifyCredentials end={vnode.attrs.end} />;
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
