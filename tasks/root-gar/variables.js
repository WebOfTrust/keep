import m from 'mithril';
import {TextTooltip} from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';

const RootGarVariables = {
  createYourAid: {
    welcome: {
      title: (
        <>
          Welcome to your <TextTooltip label={<u>Root GAR</u>}>GLEIF Authorized Representative</TextTooltip> Software
        </>
      ),
      paragraph: (
        <>
          This software is designed to help you complete verification of authorized representatives on behalf of GLEIF
          and also as a storage place for all of your credentials.
          <br/>
          <br/>
          The first step will be to create your AID, then you will receive a short tutorial, You may skip the tutorial
          by selecting the “skip” button.
        </>
      ),
    },
    creatingAID: {
      title: (
        <>
          Creating Your <TextTooltip label={<u>AID</u>}>AID is your identifier for your Root Gar software.</TextTooltip>
        </>
      ),
      paragraph: (
        <>
          In order to provide authorization, you will first have to create your own GLEIF AID within the software and
          GLEIF will verify you as an authorized representative (GAR) to act on their behalf.
        </>
      ),
    },
    stepsToCreate: {
      title: 'Steps to Create Your GLEIF AID',
    },
    createYourAlias: {
      paragraph: (
        <>
          The alias should be an easy to remember name for your AID as a member of the GLEIF RoOT signing
          group (e.g. Your full name).
        </>
      ),
    },
  },
  createGLEIFRoot: {
    title: "Create GLEIF RoOT Multi-sig AID",
    steps: (
      <ol className="styled-ol margin-v-2">
        <li>Join a Video Call with Root GARs.</li>
        <li>Send your OOBI over video call.</li>
        <li>Receive OOBIs over video call.</li>
        <li>Send challenge message to others.</li>
        <li>Receive challenge messages.</li>
        <li>Configure RoOT (optional).</li>
      </ol>
    ),
    joinCallIntro: "In order to start the creation of the multisig AID process, you will need to initiate an real-time Out of Band Interaction (OOBI) session in which you and the other users are present, You will accept all their OOBIs (URL + AID) on a Video Call so that you can create the GLEIF RoOT.",
    joinCallSubIntro: "The ecosystem governance framework requires 11 additional GARs to join this process (total of 12 participants).",
    howManyParticipantsPrompt: "How many additional participants are in GLEIF RoOT AID?"
  },
  approveDelegation: {
    title: "Approve Delegation Request",
    steps: (
      <ol className="styled-ol margin-v-2">
        <li>Join a Video Call with members of Delegate AID.</li>
        <li>Send your OOBI over video call.</li>
        <li>Receive OOBIs over video call.</li>
        <li>Send challenge message to others.</li>
        <li>Receive challenge messages.</li>
        <li>Wait for delegation request.</li>
      </ol>
    ),
    joinCallIntro: "In order to start the approval of a delegated AID, you will need to initiate an real-time Out of Band Interaction (OOBI) session in which you and the other users are present, You will accept all their OOBIs (URL + AID) on a Video Call so that you can approve the delegation.",
    joinCallSubIntro: "",
    howManyParticipantsPrompt: "How many participants will be in the Delegated AID?"
  },
  externalOobi: {
    type: 'External',
  },
  internalOobi: {
    type: 'Internal',
  },
  introToYourRole: {
    main: {
      title: (
        <>
          Intro to the{' '}
          <TextTooltip label={<u>Root Gar</u>}>
            Root GAR is an acronym for Root GLEIF Authorized Representative
          </TextTooltip>{' '}
          Role
        </>
      ),
      paragraph: (
        <>
          You have now created your GLEIF AID! While you are waiting for your GLEIF credentials, here is a brief
          introduction to some of the tasks you can complete in your role.
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
};

module.exports = RootGarVariables;
