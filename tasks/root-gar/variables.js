import m from 'mithril';
import { TextTooltip } from '../../src/app/components';
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
          <br />
          <br />
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
          In order to provide authentication, you will first have to create your own GLEIF AID within the software and
          GLEIF will verify you as an authorized representative (GAR) to act on their behalf.
        </>
      ),
    },
    stepsToCreate: {
      title: 'Steps to Create Your GLEIF AID',
    },
    createYourAlias: {
      title: 'Create Your GLEIF AID',
      paragraph: (
        <>
          The alias should be an easy to remember name for your AID as a member of the GLEIF RoOT signing group (e.g.
          Your full name).
        </>
      ),
    },
  },
  createGLEIFRoot: {
    shouldSkipTitle: 'Do you need to perform identifiy authentication with members of the GLEIF RoOT AID?',
    shouldSkipIntro:
      'If you have not yet exchanged OOBIs with the other participants of the GLEIF RoOT AID, you must perform identity authentication to add them to your contact list.' +
      '  Will you be need to perform identity authentication?',
    skipTitle: 'Proceed to Create GLEIR RoOT AID',
    skipIntro: 'You can now proceed to creating the GLEIF RoOT AID from existing authenticated contacts.',
    performTitle: 'Proceed to OOBI Exchange',
    performIntro:
      'Proceed to exchange OOBIs with the other participants of the GLEIF Root AID. You will also be sending them a challenge message that they will send back to you.',
    title: 'Create GLEIF RoOT Multi-sig AID',
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
    joinCallIntro:
      'In order to start the creation of the multisig AID process, you will need to initiate an real-time Out of Band Interaction (OOBI) session in which you and the other users are present, You will accept all their OOBIs (URL + AID) on a Video Call so that you can create the GLEIF RoOT.',
    joinCallSubIntro:
      'The ecosystem governance framework requires 11 additional GARs to join this process (total of 12 participants).',
    howManyParticipantsPrompt: 'How many additional participants are in GLEIF RoOT AID?',
    nextTaskTitle: 'Are you configuring the multi-sig group?',
    nextTaskBody:
      'If you have been designated to configure the multi-sig group click Yes to continue to provide the group alias and select the participants. Otherwise click no and enjoy the wait.',
  },
  approveDelegation: {
    shouldSkipTitle: 'Do you need to perform identifiy authentication with members of the Delegated AID?',
    shouldSkipIntro:
      'If you have not yet exchanged OOBIs with participants of the new Delegated AID, you must perform identity authentication to add them to your contact list.' +
      '  Will you be need to perform identity authentication?',
    skipTitle: 'Proceed to Approving Delegation Request',
    skipIntro: 'You can now proceed to approving the delegation request from existing authenticated contacts.',
    performTitle: 'Proceed to OOBI Exchange',
    performIntro:
      'Proceed to exchange OOBIs with the participants of the new delegated AID. You will also be sending them a challenge message that they will send back to you.',
    title: 'Approve Delegation Request',
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
    joinCallIntro:
      'In order to start the approval of a delegated AID, you will need to initiate an real-time Out of Band Interaction (OOBI) session in which you and the other users are present, You will accept all their OOBIs (URL + AID) on a Video Call so that you can approve the delegation.',
    joinCallSubIntro: '',
    howManyParticipantsPrompt: 'How many participants will be in the Delegated AID?',
  },
  manualKeyRotation: {
    shouldSkipTitle: 'Are you adding new participants?',
    shouldSkipIntro:
      'New participants are participants that you have not yet exchanged OOBIs with you and are not in your contact list. Will you be adding new people to this rotation?',
    skipTitle: 'Proceed to Multi-Sig Group Rotation',
    skipIntro:
      'You can now proceed to configuring your Multi-Sig Group Rotation with only existing participants from the group.',
    performTitle: 'Proceed to OOBI Exchange',
    performIntro:
      'Proceed to exchange OOBIs with the new participants you would like to add. You will also be sending them a challenge message that they will send back to you.',
    title: 'Manual Key Rotation',
    subtitle: 'Steps for rotation:',
    intro:
      'If you are adding new members to this Multi-Sig Group AID, you need to perform the following steps.  Otherwise, you can Skip this step and begin configuring the rotation.',
    steps: (
      <ol className="styled-ol margin-v-2">
        <li>Join a Video Call with new members of Multi-Sig Group.</li>
        <li>Send your OOBI over video call.</li>
        <li>Receive OOBIs over video call.</li>
        <li>Send challenge message to others.</li>
        <li>Receive challenge messages.</li>
        <li>Configure Multi-Sig Group rotation parameters.</li>
      </ol>
    ),
    joinCallIntro:
      'In order to begin a rotation, you will need to initiate an real-time Out of Band Interaction (OOBI) session with new members of the Multi-Sig Group in which you and the other users are present, You will accept all their OOBIs (URL + AID) on a Video Call so that you can approve the complete the rotation.',
    joinCallSubIntro: '',
    howManyParticipantsPrompt: 'How many new participants are you adding to this Multi-Sig Group AID?',
  },
  externalOobi: {
    type: 'External',
  },
  internalOobi: {
    type: 'Internal',
  },
  introToYourRole: {
    main: {
      title: <>Intro to the Root GAR Role</>,
      paragraph: <>As a member of the GLEIF Root of Offical Trust you will first create a local AID.</>,
    },
    steps: [
      {
        title: 'Help Create the RoOT',
        image: addNewContacts,
        paragraph: (
          <>After creating your local AID, the GLEIF team will walk you through joining the multi-sig RoOT AID.</>
        ),
      },
      {
        title: 'Approve GLEIF External and Internal AIDs',
        image: verifyCredentials,
        paragraph: (
          <>
            Once the RoOT is established you will join in the delegation approval of the rest of the required GLEIF
            AIDs.
          </>
        ),
      },
    ],
  },
};

module.exports = RootGarVariables;
