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

const ExternalGarVariables = {
  createYourAid: {
    welcome: {
      title: (
        <>
          Welcome to your External <TextTooltip label={<u>GAR</u>}>GLEIF Authorized Representative</TextTooltip>{' '}
          Software
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
          Creating your <TextTooltip label={<u>AID</u>}>AID is your identifier for your GRAC software.</TextTooltip>
        </>
      ),
      paragraph: (
        <>
          In order to provide authorization, you will first have to create your own GLEIF Delegated AID within the
          software and GLEIF will verify you as an authorized representative (GAR) to act on their behalf.
        </>
      ),
    },
    stepsToCreate: {
      title: 'Steps to Create Your GLEIF AID',
    },
    createYourAlias: {
      paragraph: (
        <>
          The alias should be an easy to remember name for your GLEIF Delegated AID as a member of the GLEIF Root AID
          signing group (e.g. My Qualified vLEI Authorized Representative Identifier).
        </>
      ),
    },
  },
  introToYourRole: {
    main: {
      title: 'Intro to the GRAC Role',
      paragraph: (
        <>
          You have now created your GLEIF Delegated AID! While you are waiting for your GLEIF credentials, here is a
          brief introduction to some of the tasks you can complete in your role.
        </>
      ),
    },
    steps: [
      {
        title: 'Complete Identity Assurance',
        image: addNewContacts,
        paragraph: (
          <>
            Once you are authorized to act on behalf of GLEIF, you perform identity assurance of a person serving in the
            role of QAR. A GAR and the QAR will complete a real-time OOBI session in which the GAR and the QAR are
            present.
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
  identityAuthentication: {
    steps: {
      paragraph: (
        <>
          This module will take you through the steps of how to authenticate a QAR’s identity. Below are the steps for
          how to complete the process:
        </>
      ),
      list: [
        <>Initiate a Video Call.</>,
        <>Use an OOBI protocol to obtain the QAR's AID.</>,
        <>Send a Challenge Message to the QAR.</>,
        <>QAR signs and returns Challenge Message.</>,
        <>You verify signature and issue credentials.</>,
      ],
    },
    acceptOobi: {
      paragraph: (
        <>
          While on the Video Call, make sure to obtain the QAR's <b>URL and OOBI</b>. When you have both for each party,
          please press continue.
        </>
      ),
      alias: (
        <>
          <strong>AID:</strong>
        </>
      ),
    },
  },
};

module.exports = ExternalGarVariables;
