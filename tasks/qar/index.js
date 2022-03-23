import m from 'mithril';

// Components
import { TextTooltip } from '../../src/app/components';

// Generic Tasks
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';

// Tasks
import QVIIdentityAssurance from './qvi-identity-assurance/qvi-identity-assurance';
import IssueOORvLEICredential from './issue-oor-vlei-credential/issue-oor-vlei-credential';
import RevokeQVIvLEICredential from './revoke-qvi-vlei-credential/revoke-qvi-vlei-credential';
import IdentityAuthOfQar from './identity-auth-of-qar/identity-auth-of-qar'

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
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
      imgSrc: createIdentifier,
      label: 'Create Your QAR AID',
      component: {
        view: (vnode) => {
          return (
            <CreateYourAID
              welcome={{
                title: (
                  <>
                    Welcome to your <TextTooltip label={<u>QVI</u>}>Qualified vLEI Issuer</TextTooltip> Software
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
                    <TextTooltip label={<u>QAR AID</u>}>
                      <u>QVI</u> is an acronym for Qualified vLEI Authorized Representative.
                      <br />
                      <u>AID</u> is your identifier for your QVI software.
                    </TextTooltip>
                  </>
                ),
                paragraph: (
                  <>
                    In order to provide authorization, you will first have to create your own AID within the software
                    and GLEIF will verify you as an authorized party to act on your QVI’s behalf.
                  </>
                ),
              }}
              stepsToCreate={{
                title: 'Steps to Create Your QAR AID',
              }}
              createYourAlias={{
                paragraph: (
                  <>
                    The alias should be an easy to remember name for your AID as a Qualified Authorized Representative
                    (e.g. My Qualified vLEI Authorized Representative Identifier).
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
                title: 'Intro to the QAR Role',
                paragraph: (
                  <>
                    You have now created your identifier! Before you start the a real time OOBI session with the GLEIF
                    Authorized Representative (GAR) and obtain your credentials, here is a brief introduction to some of
                    the tasks you will be able to complete in your role.
                  </>
                ),
              }}
              steps={[
                {
                  title: 'Complete Identity Assurance',
                  image: addNewContacts,
                  paragraph: (
                    <>
                      Once you are authorized to act on behalf of the QVI, you complete identity authentication with a
                      GAR . A GAR and the QAR will complete a real-time OOBI session in which the GAR and the QAR are
                      present to accomplish this.
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
      label: 'Identity Authentication',
      component: {
        view: (vnode) => {
          return <IdentityAuthOfQar end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Credential Issuance ',
      component: {
        view: (vnode) => {
          return <QVIIdentityAssurance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Triggered Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <IssueOORvLEICredential end={vnode.attrs.end} />
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Credential Revocation',
      component: {
        view: (vnode) => {
          return <RevokeQVIvLEICredential end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
