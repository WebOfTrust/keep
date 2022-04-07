import m from 'mithril';
import { TextTooltip } from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import projectPlanning from '../../src/assets/img/project-planning.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import secureMessaging from '../../src/assets/img/secure-messaging.png';
import uploadFile from '../../src/assets/img/upload-file.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import calendar from '../../src/assets/img/calendar.png';
import loanApproved from '../../src/assets/img/loan-approved.png';

const QarVariables = {
  createYourAid: {
    welcome: {
      title: (
        <>
          Welcome to your <TextTooltip label={<u>QVI</u>}>Qualified vLEI Issuer</TextTooltip> Software
        </>
      ),
      paragraph: (
        <>
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br />
          <br />
          The first step will be to create your Delegated AID, then you will receive a short tutorial, You may skip the
          tutorial by selecting the “skip” button.
        </>
      ),
    },
    creatingAID: {
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
          In order to provide authorization, you will first have to create your own AID within the software and GLEIF
          will verify you as an authorized party to act on your QVI’s behalf.
        </>
      ),
    },
    stepsToCreate: {
      title: 'Steps to Create Your QAR AID',
    },
    createYourAlias: {
      paragraph: (
        <>
          The alias should be an easy to remember name for your AID as a Qualified Authorized Representative (e.g. My
          Qualified vLEI Authorized Representative Identifier).
        </>
      ),
    },
  },
  introToYourRole: {
    main: {
      title: 'Intro to the QAR Role',
      paragraph: (
        <>
          You have now created your identifier! Before you start the a real time OOBI session with the GLEIF Authorized
          Representative (GAR) and obtain your credentials, here is a brief introduction to some of the tasks you will
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
            Once you are authorized to act on behalf of the QVI, you complete identity authentication with a GAR . A GAR
            and the QAR will complete a real-time OOBI session in which the GAR and the QAR are present to accomplish
            this.
          </>
        ),
      },
      {
        title: 'Grant Credentials',
        image: verifyCredentials,
        paragraph: (
          <>
            The GAR approves the issuance of the QVI vLEI Credential and the QVI receives the credential in its
            credential wallet. The QVI vLEI Credential may be added or revoked at any time.
          </>
        ),
      },
    ],
  },
};

module.exports = QarVariables;
