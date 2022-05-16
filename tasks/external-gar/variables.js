import m from 'mithril';
import { TextTooltip } from '../../src/app/components';
import approveRequest from '../../src/assets/img/approve-request.svg';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';

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
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF.
          <br />
          <br />
          The first step will be to create your local AID, then you will receive a short tutorial, You may skip the
          tutorial by selecting the “skip” button.
        </>
      ),
    },
    creatingAID: {
      title: (
        <>
          Creating your local <TextTooltip label={<u>AID</u>}>AID.</TextTooltip>
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
      title: 'Intro to the GAR Role',
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
            role of External GAR. You and the Root GAR will complete a real-time OOBI session in which all External GARs
            are present.
          </>
        ),
      },
      {
        title: 'Grant Credentials',
        image: verifyCredentials,
        paragraph: (
          <>
            As an External GAR you are able to grant credentials to all authorized parties, QARs (Qualified vLEI Issuer
            Authorized Representatives), LARs (Legal Entity vLEI Issuer Authorized Reprssentatives), ECRs (Engagement
            Context Role Persons) and OORs (Official Organizational Role Persons).
          </>
        ),
      },
      {
        title: 'Revoke Credentials',
        image: declineRequest,
        paragraph: (
          <>
            If there comes a point that you are no longer with the organization, you may request to have your
            credentials revoked. You can also revoke credentials for QARs and from time to time you will receive those
            requests.
          </>
        ),
      },
      {
        title: 'Key Rotation',
        image: verifyCredentials,
        paragraph: (
          <>
            If individuals within a QAR's organization change, or your own organization, and you need to provide new
            keys due to a breach, they will send you a request for your review and approval.
          </>
        ),
      },
      {
        title: 'Present Credentials',
        image: approveRequest,
        paragraph: (
          <>
            After you have been issued credentials, you may present them using your text string to anyone who asks for
            them. They will be able to see in real time which legal entity you represent and if you are able to act on
            their behalf.
          </>
        ),
      },
    ],
  },
  identityAuthentication: {
    steps: {
      paragraph: (
        <>
          This module will take you through the steps of how to authenticate a QAR's identity. Below are the steps for
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
          While on the Video Call, make sure to obtain the QAR's <b>Alias and OOBI</b>. When you have both for each
          party, please press continue.
        </>
      ),
    },
  },
};

module.exports = ExternalGarVariables;
