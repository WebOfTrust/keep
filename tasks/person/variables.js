import m from 'mithril';
import {TextTooltip} from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';

const PersonVariables = {
  aidToSend: "single",
  acceptCredential: {
    title: "Accept Credential",
    steps: (
      <ol className="styled-ol margin-v-2">
        <li>Join a Video Call with members of Issuing AID.</li>
        <li>Send your OOBI over video call.</li>
        <li>Receive OOBIs over video call.</li>
        <li>Send challenge message to others.</li>
        <li>Receive challenge messages.</li>
        <li>Wait for credential issuance.</li>
      </ol>
    ),
    joinCallIntro: "In order to receive your credential, you will need to initiate an real-time Out of Band Interaction (OOBI) session in which you and the other users are present, You will accept all their OOBIs (URL + AID) on a Video Call so that you can receive the credential.",
    joinCallSubIntro: "",
    howManyParticipantsPrompt: "How many participants will be in the Delegated AID?"
  },

  createYourAid: {
    welcome: {
      title: (
        <>
          Welcome to your <TextTooltip label={<u>Person</u>}>Individual Credential Holder</TextTooltip> Software
        </>
      ),
      paragraph: (
        <>
          This software is designed to help you participate in identity authentication as person holding a
          role in a Legal Entity that will be receiving vLEI credentials.
          <br/>
          <br/>
          The first step will be to create your AID, then you will receive a short tutorial, You may
          skip the tutorial by selecting the “skip” button.
        </>
      ),
    },
    creatingAID: {
      title: (
        <>
          Creating your{' '}
          <TextTooltip label={<u>Personal AID</u>}>
            <u>AID</u> is your identifier for your holder software.
          </TextTooltip>
        </>
      ),
      paragraph: (
        <>
          In order to provide authentication, you will first have to create your own AID within the software
          and a Qualified vLEI Issuer will verify you as an authorized party to act on your Legal Entity’s behalf.
        </>
      ),
    },
    stepsToCreate: {
      title: 'Steps to Create Your AID',
    },
    createYourAlias: {
      paragraph: (
        <>
          The alias should be an easy to remember name for your AID as a Qualified Authorized Representative
          (e.g. My
          Qualified vLEI Authorized Representative Identifier).
        </>
      ),
    },
  },
  introToYourRole: {
    main: {
      title: 'Intro to the Person Role',
      paragraph: (
        <>
          The person role is anyone in the vLEI ecosystem who might receive a vLEI Organization Official Role (OOR)
          or vLEI Engagement Context Role (ECR) credential.
        </>
      ),
    },
    steps: [
      {
        title: 'Complete Identity Assurance',
        image: addNewContacts,
        paragraph: (
          <>
            When being issued a credential in the vLEI Ecosystem a QVI Authorized Representative will complete
            Identity Assurance with you via a video call to verify with whom they are issuing a credential.
          </>
        ),
      },
      {
        title: 'Accept Credentials',
        image: verifyCredentials,
        paragraph: (
          <>
            You will be notified when your ECR or OOR credentials have been issued, and you can view them
            in the "My Credentials" section.
          </>
        ),
      },
    ],
  },
};

module.exports = PersonVariables;
