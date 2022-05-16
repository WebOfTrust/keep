import m from 'mithril';
//Variables
import QARVariables from './variables';

// Tasks
import ConfigureMultiSigSet from '../generic/configure-multi-sig-set/configure-multi-sig-set';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import CreatePasscode from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
import CredentialRevocation from '../generic/credential-revocation/credential-revocation';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import VideoCallTask from '../generic/video-call/video-call';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroup from '../generic/join-multi-sig-group/join-multi-sig-group';
import Login from '../generic/login/login';
import ManualKeyRotation from '../generic/manual-key-rotation/manual-key-rotation';
import ViewMultiSigEventLogs from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import secureMessaging from '../../src/assets/img/secure-messaging.svg';
import loanApproved from '../../src/assets/img/loan-approved.svg';
import createYourPasscode from '../../src/assets/img/create-your-passcode.svg';
import createIdentifier from '../../src/assets/img/create-identifier.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';
import calendar from '../../src/assets/img/calendar.svg';
import passcode from '../../src/assets/img/calendar.svg';

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
      imgSrc: createYourPasscode,
      label: 'Create Your Passcode',
      component: {
        view: (vnode) => {
          return <CreatePasscode end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: passcode,
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
      label: 'Intro to Your Role',
      component: {
        view: (vnode) => {
          return (
            <IntroToYourRole
              main={QARVariables.introToYourRole.main}
              steps={QARVariables.introToYourRole.steps}
              end={vnode.attrs.end}
            />
          );
        },
      },
    },
    {
      imgSrc: createIdentifier,
      label: 'Incept Local QAR Single-Sig AID',
      component: {
        view: (vnode) => {
          return (
            <CreateYourAID
              welcome={QARVariables.createYourAid.welcome}
              creatingAID={QARVariables.createYourAid.CreateYourAID}
              stepsToCreate={QARVariables.createYourAid.stepsToCreate}
              createYourAlias={QARVariables.createYourAid.createYourAlias}
              end={vnode.attrs.end}
            />
          );
        },
      },
    },
  ],
  'create-multisig': [
    {
      imgSrc: addNewContacts,
      label: 'Join One Way OOBI/Challenge with Lead External GAR',
      component: {
        view: (vnode) => {
          return <IdentityAuthenticationReceive end={vnode.attrs.end} />;
        },
      },
    },
    new VideoCallTask(true, 'Lead QAR Multi-Sig AID Inception', multisigTask),
    new VideoCallTask(false, 'Join QAR Multi-Sig AID Inception'),
  ],
  'join-multisig': [joinMultisigTask],
  'main': [
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
      imgSrc: loanApproved,
      label: 'Initiate LE Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Join LE Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Initiate OOR Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Join OOR Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Initiate ECR Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Join ECR Credential Issuance',
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
      label: 'Accept Credential',
      component: {
        view: (vnode) => {
          return <ViewMultiSigEventLogs end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
