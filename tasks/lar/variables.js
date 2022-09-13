import m from 'mithril';
import { TextTooltip } from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import projectPlanning from '../../src/assets/img/project-planning.svg';
import createIdentifier from '../../src/assets/img/create-identifier.svg';
import secureMessaging from '../../src/assets/img/secure-messaging.svg';
import uploadFile from '../../src/assets/img/upload-file.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import calendar from '../../src/assets/img/calendar.svg';
import loanApproved from '../../src/assets/img/loan-approved.svg';

const LarVariables = {
  createYourAid: {
    welcome: {
      title: (
        <>
          Welcome to your <TextTooltip label={<u>LAR</u>}>Legal Entity Authorized Representative</TextTooltip> Software
        </>
      ),
      paragraph: (
        <>
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br />
          <br />
          The first step will be to create your AID, then you will receive a short tutorial, You may skip the
          tutorial by selecting the “skip” button.
        </>
      ),
    },
    creatingAID: {
      title: (
        <>
          Creating your{' '}
          <TextTooltip label={<u>LAR AID</u>}>
            <u>LAR</u> is an acronym for Legal Entity Authorized Representative.
            <br />
            <u>AID</u> is your identifier for your LAR software.
          </TextTooltip>
        </>
      ),
      paragraph: (
        <>
          In order to provide authentication, you will first have to create your own AID within the software and a
          Qualified vLEI Issuer will verify your identity and issue your Legal Entity Credential.
        </>
      ),
    },
    stepsToCreate: {
      title: 'Steps to Create Your LAR AID',
    },
    createYourAlias: {
      paragraph: (
        <>
          The alias should be an easy to remember name for your AID as a Legal Entity Authorized Representative (e.g. My
          Legal Entity Authorized Representative Identifier).
        </>
      ),
    },
  },
  introToYourRole: {
    main: {
      title: 'Intro to the LAR Role',
      paragraph: (
        <>
          You have now created your identifier! Before you start the a real time OOBI session with the Qualified vLEI Authorized
          Representative (QAR) and obtain your credentials, here is a brief introduction to some of the tasks you will
          be able to complete in your role.
        </>
      ),
    },
    steps: [
      {
        title: 'Complete Identity Assurance',
        image: addNewContacts,
        paragraph: (
          <>
            Once you are authorized to act on behalf of the Legal Entity, you complete identity authentication with a GAR . A QAR
            and the LAR will complete a real-time OOBI session in which the QAR and the LAR are present to accomplish
            this.
          </>
        ),
      },
      {
        title: 'Grant Credentials',
        image: verifyCredentials,
        paragraph: (
          <>
            The QAR approves the issuance of the Legal Entity vLEI Credential and the Legal Entity receives the credential in its
            credential wallet. The Legal Entity vLEI Credential may be added or revoked at any time.
          </>
        ),
      },
    ],
  },
};

module.exports = LarVariables;
