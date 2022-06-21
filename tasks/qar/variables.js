import m from 'mithril';
import {TextTooltip} from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';

const QarVariables = {
    aidToSend: "multi",
    initiateLECredentialIssuance: {
        steps: {
            list: [
                "Initiate a Video Call",
                "Use an OOBI protocol to obtain the Legal Entity's AID",
                "Use an OOBI protocol to share your Multi-Sig AID",
                "Obtain and sign a Challenge Message",
                "Generate and send a Challenge Message",
                "LAR signs and returns Challenge Message",
                "Issue the Legal Entity Credential to the Legal Entity AID."
            ]
        }
    },
    joinLECredentialIssuance: {
        steps: {
            list: [
                "Join a Video Call",
                "Use an OOBI protocol to obtain the Legal Entity's AID.",
                "Obtain the Challenge Message from the Lead.",
                "LAR signs and returns Challenge Message.",
                "Approve the Legal Entity Credential proposed by the Lead."
            ]
        },
        oobiRecipient: "Legal Entity Multi-Sig AID"
    },
    joinOORCredentialIssuance: {
        steps: {
            list: [
                "Join a Video Call",
                "Use an OOBI protocol to obtain the Person's AID.",
                "Obtain the Challenge Message from the Lead.",
                "Person signs and returns Challenge Message.",
                "Approve the Official Organizational Role Credential proposed by the Lead."
            ]
        },
        oobiRecipient: "Person AID"
    },
    joinECRCredentialIssuance: {
        steps: {
            list: [
                "Join a Video Call",
                "Use an OOBI protocol to obtain the Person's AID.",
                "Obtain the Challenge Message from the Lead.",
                "Person signs and returns Challenge Message.",
                "Approve the Engagement Context Role Credential proposed by the Lead."
            ]
        },
        oobiRecipient: "Person AID"
    },
    createYourAid: {
        welcome: {
            title: (
                <>
                    Welcome to your <TextTooltip label={<u>QVI</u>}>Qualified vLEI Issuer</TextTooltip> Software
                </>
            ),
            paragraph: (
                <>
                    This software is designed to help you complete verification of authorized representatives on behalf
                    of GLEIF
                    and also as a storage place for all of your credentials.
                    <br/>
                    <br/>
                    The first step will be to create your Delegated AID, then you will receive a short tutorial, You may
                    skip the
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
                        <br/>
                        <u>AID</u> is your identifier for your QVI software.
                    </TextTooltip>
                </>
            ),
            paragraph: (
                <>
                    In order to provide authorization, you will first have to create your own AID within the software
                    and GLEIF
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
                    The alias should be an easy to remember name for your AID as a Qualified Authorized Representative
                    (e.g. My
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
                    You have now created your identifier! Before you start the a real time OOBI session with the GLEIF
                    Authorized
                    Representative (GAR) and obtain your credentials, here is a brief introduction to some of the tasks
                    you will
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
                        Once you are authorized to act on behalf of the QVI, you complete identity authentication with a
                        GAR. A GAR
                        and the QAR will complete a real-time OOBI session in which the GAR and the QAR are present to
                        accomplish
                        this.
                    </>
                ),
            },
            {
                title: 'Grant Credentials',
                image: verifyCredentials,
                paragraph: (
                    <>
                        The GAR approves the issuance of the QVI vLEI Credential and the QVI receives the credential in
                        its
                        credential wallet. The QVI vLEI Credential may be added or revoked at any time.
                    </>
                ),
            },
        ],
    },
};

module.exports = QarVariables;
