import m from 'mithril';
import { TextTooltip } from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';

const RootGarVariables = {
  createYourAid: {
    welcome: {
      title: (
        <>
          Welcome to your <TextTooltip label={<u>Root GAR</u>}>Root GLEIF Authorized Representative</TextTooltip>{' '}
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
          Creating your <TextTooltip label={<u>AID</u>}>AID is your identifier for your Root GAR software.</TextTooltip>
        </>
      ),
      paragraph: (
        <>
          In order to provide authorization, you will first have to create your own GLEIF Delegated AID within the
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
      title: 'Intro to the Root GAR Role',
      paragraph: (
        <>
          You have now created your GLEIF Delegated AID! While you are waiting for your GLEIF credentials, here is a
          brief introduction to some of the tasks you can complete in your role.
        </>
      ),
    },
    steps: [
      {
        title: 'Delegate Credentials',
        image: addNewContacts,
        paragraph: (
          <>
            In your role you can be either the Root GAR or Lead Root GAR, depending on what process you are completing.
            The Lead Root GAR delegates GLEIF Delegated AIDs to all other Root GARs. Once the Root GAR receives
            credentials, they are able to process key rotations and delegate credentials.
          </>
        ),
      },
      {
        title: 'Perform Key Rotation',
        image: verifyCredentials,
        paragraph: (
          <>
            The Root GAR performs key rotations to ensure the security of the credentials given to Internal and External
            GARs. If any security issues come up, the Root GAR can always rotate keys so that they are new.
          </>
        ),
      },
    ],
  },
};

module.exports = RootGarVariables;
