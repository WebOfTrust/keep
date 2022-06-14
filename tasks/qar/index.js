import m from 'mithril';

//Variables
import variables from './variables';
import {Schema} from '../../src/app/services';

// Tasks
import ConfigureMultiSigGroupTask from '../generic/configure-multi-sig-group/configure-multi-sig-group';
import CreateYourAIDTask from '../generic/create-your-aid/create-your-aid';
import CreatePasscodeTask from '../generic/create-your-passcode/create-your-passcode';
import CredentialRevocationTask from '../generic/credential-revocation/credential-revocation';
import EnterPasscodeTask from '../generic/enter-passcode/enter-passcode';
import IntroToYourRoleTask from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroupTask from '../generic/join-multi-sig-group/join-multi-sig-group';
import InitiateManualKeyRotationTask from '../generic/initiate-manual-key-rotation/initiate-manual-key-rotation';
import VideoCallTask from '../generic/video-call/video-call';
import ViewMultiSigEventLogsTask from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';

//dummy tasks
import JoinManualKeyRotationTask from '../generic/join-manual-key-rotation/join-manual-key-rotation';
import JoinCredentialRevocationTask from '../generic/join-credential-revocation/join-credential-revocation';
import AcceptCredentialsTask from '../generic/accept-credentials/accept-credentials';
import IssueCredentialTask from './issue-credential';
import JoinCredentailIssuanceTask from './join-credential-issuance'
import WaitForGLEIFInternal from './wait-for-gleif-internal'

const tasks = {
    'create-passcode': [
        new CreatePasscodeTask({label: 'Create Your Passcode'}),
        new EnterPasscodeTask({label: 'Enter Your Passcode'}),
    ],
    'create-identifier': [
        new IntroToYourRoleTask({label: 'Intro to Your Role', variables: variables.introToYourRole}),
        new CreateYourAIDTask({label: 'Incept Local QAR Single-Sig AID', variables: variables.createYourAid}),
    ],
    'create-multisig': [
        new WaitForGLEIFInternal(
            {
                label: 'Lead QAR Multi-Sig AID Inception',
                next: new VideoCallTask({
                    initiate: true,
                    label: 'Lead QAR Multi-Sig AID Inception',
                    next: new ConfigureMultiSigGroupTask({
                        label: 'Configure Multi-Sig Group',
                        requiredDelegator: "GLEIF External"
                    }),
                })
            }),
        new WaitForGLEIFInternal(
            {
                label: 'Lead QAR Multi-Sig AID Inception',
                next: new VideoCallTask({initiate: false, label: 'Join QAR Multi-Sig AID Inception'})
            }),
    ],
    'join-multisig': [new JoinMultiSigGroupTask('Join Multi-Sig Group')],
    'join-multisig-issue': [new JoinCredentailIssuanceTask('Join Multi-Sig Credential Issuance')],
    'main': [
        new VideoCallTask({
            initiate: true,
            label: 'Accept Credential',
            oneToOne: true,
            acceptCredential: true,
            next: new AcceptCredentialsTask({label: 'Accept Credential'}),
        }),
        new VideoCallTask({
            initiate: true,
            label: 'Initiate LE Credential Issuance',
            aidToSend: variables.aidToSend,
            steps: variables.initiateLECredentialIssuance.steps,
            next: new IssueCredentialTask({
                label: 'Initiate LE Credential Issuance',
                schema: Schema.LECredentialSchema
            }),
        }),
        new VideoCallTask({
            initiate: true,
            label: 'Initiate OOR Credential Issuance',
            aidToSend: variables.aidToSend,
            steps: variables.initiateLECredentialIssuance.steps,
            next: new IssueCredentialTask({
                label: 'Initiate OOR Credential Issuance',
                schema: Schema.OORCredentialSchema
            }),
        }),
        new VideoCallTask({
            initiate: true,
            label: 'Initiate ECR Credential Issuance',
            aidToSend: variables.aidToSend,
            steps: variables.initiateLECredentialIssuance.steps,
            next: new IssueCredentialTask({
                label: 'Initiate ECR Credential Issuance',
                schema: Schema.ECRCredentialSchema
            }),
        }),
        new CredentialRevocationTask({label: 'Initiate Credential Revocation'}),
        new JoinCredentialRevocationTask({label: 'Join Credential Revocation'}),
        new InitiateManualKeyRotationTask({label: 'Initiate Manual Key Rotation'}),
        new JoinManualKeyRotationTask({label: 'Join Manual Key Rotation'}),
        new ViewMultiSigEventLogsTask({label: 'View Multi-Sig Event Logs'}),
        new AcceptCredentialsTask({label: 'Accept Credential'}),
    ],
};

module.exports = tasks;
