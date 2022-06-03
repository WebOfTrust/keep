// Variables
import variables from './variables';

// Tasks

import ConvertToMultiSigTask from '../generic/convert-to-multisig/convert-to-multisig';
import CreateYourAIDTask from '../generic/create-your-aid/create-your-aid';
import CreatePasscodeTask from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuanceTask from '../generic/credential-issuance/credential-issuance';
import CredentialRevocationTask from '../generic/credential-revocation/credential-revocation';
import EnterPasscodeTask from '../generic/enter-passcode/enter-passcode';
import IntroToYourRoleTask from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroupTask from '../generic/join-multi-sig-group/join-multi-sig-group';
import InitiateManualKeyRotationTask from '../generic/initiate-manual-key-rotation/initiate-manual-key-rotation';
import ManualKeyRotationTask from '../generic/manual-key-rotation/manual-key-rotation';
import VideoCallTask from '../generic/video-call/video-call';
import ViewMultiSigEventLogsTask from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';

//dummy tasks
import JoinManualKeyRotationTask from '../generic/join-manual-key-rotation/join-manual-key-rotation';
import JoinCredentialIssuanceTask from '../generic/join-credential-issuance/join-credential-issuance';
import AcceptCredentialsTask from "../generic/accept-credentials/accept-credentials";

const tasks = {
  'create-passcode': [
    new CreatePasscodeTask({ label: 'Create Your Passcode' }),
    new EnterPasscodeTask({ label: 'Enter Your Passcode' }),
  ],
  'create-identifier': [
    new IntroToYourRoleTask({ label: 'Intro to Your Role', variables: variables.introToYourRole }),
    new IntroToYourRoleTask({
      label: 'Understanding Single-Sig or Multi-Sig for Your Legal Entity',
      variables: variables.introToYourRole,
    }),
    new CreateYourAIDTask({ label: 'Incept Local LAR Single-Sig AID', variables: variables.createYourAid }),
  ],
  'create-multisig': [
    new VideoCallTask({
      initiate: true,
      label: 'Accept Credential',
      oneToOne: true,
      acceptCredential: true,
      next: new AcceptCredentialsTask({ label: 'Accept Credential' }),
    }),
    new ManualKeyRotationTask({ label: 'Perform Manual Key Rotation' }),
    new ConvertToMultiSigTask({ initiate: false, label: 'Convert to Multi-Sig Group' }),
  ],
  'join-multisig': [new JoinMultiSigGroupTask('Join Multi-Sig Group')],
  'main': [
    new InitiateManualKeyRotationTask({ label: 'Initiate Manual Key Rotation' }),
    new JoinManualKeyRotationTask({ label: 'Join Manual Key Rotation' }),
    new CredentialIssuanceTask({ label: 'Initiate ECR Credential Issuance' }),
    new JoinCredentialIssuanceTask({ label: 'Join ECR Credential Issuance' }),
    new CredentialRevocationTask({ label: 'Initiate ECR Credential Revocation' }),
    new JoinCredentialIssuanceTask({ label: 'Join ECR Credential Revocation' }),
    new ViewMultiSigEventLogsTask({ label: 'View Multi-Sig Event Logs' }),
  ],
};

module.exports = tasks;
