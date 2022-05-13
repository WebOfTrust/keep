import m from 'mithril';
// Variables
import RootGarVariables from './variables';

// Tasks
import ConfigureMultiSigSet from '../generic/configure-multi-sig-set/configure-multi-sig-set';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import CreatePasscode from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
import CredentialRevocation from '../generic/credential-revocation/credential-revocation';
import VideoCallTask from '../generic/video-call/video-call';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroup from '../generic/join-multi-sig-group/join-multi-sig-group';
import Login from '../generic/login/login';
import ManualKeyRotation from '../generic/manual-key-rotation/manual-key-rotation';
import ViewMultiSigEventLogs from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';

// Images
import createIdentifier from '../../src/assets/img/create-identifier.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import calendar from '../../src/assets/img/calendar.svg';
import loanApproved from '../../src/assets/img/loan-approved.svg';
import secureMessaging from "../../src/assets/img/secure-messaging.svg";

const multisigTask = {
  imgSrc: secureMessaging,
  label: 'Configure Multi-Sig Group',
  component: {
    view: (vnode) => {
      return <ConfigureMultiSigSet end={vnode.attrs.end} />;
    },
  },
};

const joinMultisigTask = {
  imgSrc: secureMessaging,
  label: 'Join Multi-Sig Group',
  component: {
    view: (vnode) => {
      return <JoinMultiSigGroup end={vnode.attrs.end} />;
    },
  },
};

const tasks = {
  'create-passcode': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your Passcode',
      component: {
        view: (vnode) => {
          return <CreatePasscode end={vnode.attrs.end} />;
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
      label: 'Incept Local GLEIF Single-Sig AID',
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
  'create-multisig': [
    new VideoCallTask(true, 'Lead GLEIF External Multi-Sig AID Inception', multisigTask),
    new VideoCallTask(false, 'Join GLEIF External Multi-Sig AID Inception'),
    {
      imgSrc: verifyCredentials,
      label: 'Perform Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'join-multisig': [joinMultisigTask],
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
      imgSrc: loanApproved,
      label: 'Initiate Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Join Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Initiate Credential Revocation',
      component: {
        view: (vnode) => {
          return <CredentialRevocation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Join Credential Revocation',
      component: {
        view: (vnode) => {
          return <CredentialRevocation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: verifyCredentials,
      label: 'Initiate Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: verifyCredentials,
      label: 'Join Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
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
      imgSrc: calendar,
      label: 'Initiate Delegation Approval',
      component: {
        view: (vnode) => {
          return <ViewMultiSigEventLogs end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: calendar,
      label: 'Join Delegation Approval',
      component: {
        view: (vnode) => {
          return <ViewMultiSigEventLogs end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
