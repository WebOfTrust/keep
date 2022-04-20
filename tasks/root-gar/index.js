import m from 'mithril';
// Variables
import RootGarVariables from './variables';

// Components
import { TextTooltip } from '../../src/app/components';

import ConfigureMultiSigSet from '../generic/configure-multi-sig-set/configure-multi-sig-set';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
import CredentialRevocation from '../generic/credential-revocation/credential-revocation';
import IdentityAuthenticationIssue from '../generic/identity-authentication-issue/identity-authentication-issue';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import InitiateVideoCall from '../generic/initiate-video-call/initiate-video-call';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import JoinVideoCall from '../generic/join-video-call/join-video-call';
import Login from '../generic/login/login';
import ManualKeyRotation from '../generic/manual-key-rotation/manual-key-rotation';
import ViewMultiSigEventLogs from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';
import ViewNewCredential from '../generic/view-new-credential/view-new-credential';
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
      imgSrc: createIdentifier,
      label: 'Create Your GLEIF AID',
      component: {
        view: (vnode) => {
          return (
            <CreateYourAID
              welcome={RootGarVariables.createYourAid.welcome}
              creatingAID={RootGarVariables.createYourAid.CreateYourAID}
              stepsToCreate={RootGarVariables.createYourAid.stepsToCreate}
              createYourAlias={RootGarVariables.createYourAid.createYourAlias}
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
              main={RootGarVariables.introToYourRole.main}
              steps={RootGarVariables.introToYourRole.steps}
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
      imgSrc: loanApproved,
      label: 'Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
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
      label: 'View Multi-Sig Group',
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
      label: 'Triggered Manual Key Rotation',
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
