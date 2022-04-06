import m from 'mithril';

// Components
import { TextTooltip } from '../../src/app/components';

import ConfigureMultiSigSet from '../generic/configure-multi-sig-set/configure-multi-sig-set';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import CreatePasscode from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
import CredentialRevocation from '../generic/credential-revocation/credential-revocation';
import IdentityAuthenticationIssue from '../generic/identity-authentication-issue/identity-authentication-issue';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import InitiateVideoCall from '../generic/initiate-video-call/initiate-video-call';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import JoinVideoCall from '../generic/join-video-call/join-video-call';
import Login from '../generic/login/login';
import ManualKeyRotation from '../generic/manual-key-rotation/manual-key-rotation';
import ViewMultiSigSet from '../generic/view-multi-sig-set/view-multi-sig-set';
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
              welcome={{
                title: (
                  <>
                    Welcome to your <TextTooltip label={<u>GRAC</u>}>GLEIF Root AID Controller</TextTooltip> Software
                  </>
                ),
                paragraph: (
                  <>
                    This software is designed to help you complete verification of authorized representatives on behalf
                    of GLEIF and also as a storage place for all of your credentials.
                    <br />
                    <br />
                    The first step will be to create your Delegated AID, then you will receive a short tutorial, You may
                    skip the tutorial by selecting the “skip” button.
                  </>
                ),
              }}
              creatingAID={{
                title: (
                  <>
                    Creating your{' '}
                    <TextTooltip label={<u>AID</u>}>AID is your identifier for your GRAC software.</TextTooltip>
                  </>
                ),
                paragraph: (
                  <>
                    In order to provide authorization, you will first have to create your own GLEIF Delegated AID within
                    the software and GLEIF will verify you as an authorized representative (GAR) to act on their behalf.
                  </>
                ),
              }}
              stepsToCreate={{
                title: 'Steps to Create Your GLEIF AID',
              }}
              createYourAlias={{
                paragraph: (
                  <>
                    The alias should be an easy to remember name for your GLEIF Delegated AID as a member of the GLEIF
                    Root AID signing group (e.g. My Qualified vLEI Authorized Representative Identifier).
                  </>
                ),
              }}
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
              main={{
                title: 'Intro to the GRAC Role',
                paragraph: (
                  <>
                    You have now created your GLEIF Delegated AID! While you are waiting for your GLEIF credentials,
                    here is a brief introduction to some of the tasks you can complete in your role.
                  </>
                ),
              }}
              steps={[
                {
                  title: 'Complete Identity Assurance',
                  image: addNewContacts,
                  paragraph: (
                    <>
                      Once you are authorized to act on behalf of GLEIF, you perform identity assurance of a person
                      serving in the role of QAR. A GAR and the QAR will complete a real-time OOBI session in which the
                      GAR and the QAR are present.
                    </>
                  ),
                },
                {
                  title: 'Grant Credentials',
                  image: verifyCredentials,
                  paragraph: (
                    <>
                      The GAR approves the issuance of the QVI vLEI Credential and the QVI receives the credential in
                      its credential wallet. The QVI vLEI Credential may be added or revoked at any time.
                    </>
                  ),
                },
              ]}
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
      label: 'View Multi-Sig Set',
      component: {
        view: (vnode) => {
          return <ViewMultiSigSet end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: secureMessaging,
      label: 'Configure Multi-Sig Set',
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
