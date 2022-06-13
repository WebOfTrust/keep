import m from 'mithril';
import {TextTooltip} from '../../src/app/components';
import addNewContacts from '../../src/assets/img/add-new-contacts.svg';
import verifyCredentials from '../../src/assets/img/verify-credentials.svg';

const PersonVariables = {
    aidToSend: "single",
    createYourAid: {
        welcome: {
            title: (
                <>
                    Welcome to your <TextTooltip label={<u>Holder</u>}>Individual Credential Holder</TextTooltip> Software
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
                    In order to provide authorization, you will first have to create your own AID within the software
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

module.exports = PersonVariables;
