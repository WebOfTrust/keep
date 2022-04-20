import m from 'mithril';
//Variables
import ExternalGarVariables from './variables';

// Tasks
import ConfigureMultiSigSet from '../generic/configure-multi-sig-set/configure-multi-sig-set';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import CreatePasscode from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
import CredentialRevocation from '../generic/credential-revocation/credential-revocation';
import IdentityAuthenticationIssue from '../generic/identity-authentication-issue/identity-authentication-issue';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import InitiateVideoCallTask from '../generic/initiate-video-call/initiate-video-call';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import JoinVideoCallTask from '../generic/join-video-call/join-video-call';
import JoinMultiSigGroup from '../generic/join-multi-sig-group/join-multi-sig-group';
import Login from '../generic/login/login';
import ManualKeyRotation from '../generic/manual-key-rotation/manual-key-rotation';
import ViewMultiSigEventLogs from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';
import ViewNewCredential from '../generic/view-new-credential/view-new-credential';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import secureMessaging from '../../src/assets/img/secure-messaging.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import declineRequest from '../../src/assets/img/decline-request.png';

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
      label: 'Create Your GLEIF AID',
      component: {
        view: (vnode) => {
          return (
            <CreateYourAID
              welcome={ExternalGarVariables.createYourAid.welcome}
              creatingAID={ExternalGarVariables.createYourAid.CreateYourAID}
              stepsToCreate={ExternalGarVariables.createYourAid.stepsToCreate}
              createYourAlias={ExternalGarVariables.createYourAid.createYourAlias}
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
              main={ExternalGarVariables.introToYourRole.main}
              steps={ExternalGarVariables.introToYourRole.steps}
              end={vnode.attrs.end}
            />
          );
        },
      },
    },
  ],
  'main': [
    // {
    //   imgSrc: addNewContacts,
    //   label: 'Identity Authentication (Participate)',
    //   component: {
    //     view: (vnode) => {
    //       return (
    //         <IdentityAuthenticationReceive
    //           steps={ExternalGarVariables.identityAuthentication.steps}
    //           acceptOobi={ExternalGarVariables.identityAuthentication.acceptOobi}
    //           end={vnode.attrs.end}
    //         />
    //       );
    //     },
    //   },
    // },
    new InitiateVideoCallTask(),
    new JoinVideoCallTask(),
    {
      imgSrc: secureMessaging,
      label: 'Initiate Multi-Sig Group',
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
      label: 'View Multi-Sig Event Logs',
      component: {
        view: (vnode) => {
          return <ViewMultiSigEventLogs end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Initiate Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Join Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
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
  ],
};

module.exports = tasks;
