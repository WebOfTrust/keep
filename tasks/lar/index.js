import m from 'mithril';
// Variables
import LarVariables from './variables';

// Generic Tasks
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';
import JoinVideoCall from '../generic/join-video-call/join-video-call';
import InitiateVideoCall from '../generic/initiate-video-call/initiate-video-call';
import IdentityAuthenticationIssue from '../generic/identity-authentication-issue/identity-authentication-issue';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import ViewMultiSigEventLogs from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';
import ConfigureMultiSigSet from '../generic/configure-multi-sig-set/configure-multi-sig-set';

// Tasks
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
import ManualKeyRotation from '../generic/manual-key-rotation/manual-key-rotation';
import CredentialRevocation from '../generic/credential-revocation/credential-revocation';
import VerifyCredentials from '../generic/verify-credentials/verify-credentials';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import projectPlanning from '../../src/assets/img/project-planning.svg';
import createIdentifier from '../../src/assets/img/create-identifier.svg';
import uploadFile from '../../src/assets/img/upload-file.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import calendar from '../../src/assets/img/calendar.svg';
import loanApproved from '../../src/assets/img/loan-approved.svg';
import ExternalGarVariables from "../external-gar/variables";

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
                  steps={LarVariabless.introToYourRole.steps}
                  end={vnode.attrs.end}
              />
          );
        },
      },
    },
    {
      imgSrc: createIdentifier,
      label: 'Understanding Single-Sig or Multi-Sig for Your Legal Entity',
      component: {
        view: (vnode) => {
          return (
              <IntroToYourRole
                  main={LarVariables.introToYourRole.main}
                  steps={LarVariabless.introToYourRole.steps}
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
