import m from 'mithril';
import { TextTooltip } from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import approveRequest from '../../src/assets/img/approve-request.svg';
import declineRequest from '../../src/assets/img/decline-request.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';

const InternalGarVariables = {
  createYourAid: {
    welcome: {
      title: (
        <>
          Welcome to your <TextTooltip label={<u>Internal GAR</u>}>GLEIF Authorized Representative</TextTooltip>{' '}
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
          Creating your{' '}
          <TextTooltip label={<u>AID</u>}>AID is your identifier for your Internal GAR software.</TextTooltip>
        </>
      ),
      paragraph: (
        <>
          In order to provide authentication, you will first have to create your own GLEIF Delegated AID within the
          software and GLEIF will verify you as an authorized party to act on their behalf.
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
      title: 'Intro to the Internal GAR Role',
      paragraph: (
        <>
          You have now created your identifier! Before you start the a real time OOBI session with the other Internal
          GLEIF vLEI Authorized Representatives (GARs) and obtain your credentials, here is a brief introduction to some
          of the tasks you will be able to complete in your role.
        </>
      ),
    },
    steps: [
      {
        title: 'Complete Identity Authentication',
        image: addNewContacts,
        paragraph: (
          <>
            Once you are authorized to act on behalf of the GLEIF, you complete identity authentication with the Lead
            GAR. The set of Internal GARs will complete a real-time OOBI session in which the they all are present to
            accomplish this.
          </>
        ),
      },
      {
        title: 'Key Rotation',
        image: verifyCredentials,
        paragraph: (
          <>
            If individuals within the organization change, or you need to provide new keys due to a breach, you can
            request that a key rotation be completed by your Lead Internal GAR. This is completed for your safety or to
            update your list of authorized parties.
          </>
        ),
      },
      {
        title: 'Revoke Credentials',
        image: declineRequest,
        paragraph: (
          <>
            If there comes a point that you are no longer with the organization, you may request to have your
            credentials revoked and the Lead GAR will take care of this for you. You can also revoke credentials for
            your ECR persons. If you are acting as Lead Internal GAR, you can also do so for your OORs and other
            Internal GARs.
          </>
        ),
      },
      {
        title: 'Present Credentials',
        image: approveRequest,
        paragraph: (
          <>
            After you have been issued credentials, you may present them using your text string to anyone who asks for
            them. They will be able to see in real time that you represent GLEIF and can act on their behalf.
          </>
        ),
      },
    ],
  },
};

module.exports = InternalGarVariables;
