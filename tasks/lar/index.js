// Variables
import LarVariables from './variables';

// Generic Tasks
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import ViewMultiSigEventLogs from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';
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
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import createIdentifier from '../../src/assets/img/create-identifier.svg';
import secureMessaging from '../../src/assets/img/secure-messaging.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import calendar from '../../src/assets/img/calendar.svg';
import loanApproved from '../../src/assets/img/loan-approved.svg';
import VideoCallTask from "../generic/video-call/video-call";
import JoinMultiSigGroup from "../generic/join-multi-sig-group/join-multi-sig-group";

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
    },    {
      imgSrc: createIdentifier,
      label: 'Understanding Single-Sig or Multi-Sig for Your Legal Entity',
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
    {
      imgSrc: verifyCredentials,
      label: 'Incept Local LAR Single-Sig AID',
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
    new VideoCallTask(true, 'Lead LAR Multi-Sig AID Inception', multisigTask),
    new VideoCallTask(false, 'Join LAR Multi-Sig AID Inception'),
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
      label: 'Initiate ECR Credential Revocation',
      component: {
        view: (vnode) => {
          return <CredentialRevocation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Join ECR Credential Revocation',
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
  ],
};

module.exports = tasks;
