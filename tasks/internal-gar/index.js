import m from 'mithril';

// Variables
import variables from './variables';

// Tasks

import ConfigureMultiSigGroupTask from '../generic/configure-multi-sig-group/configure-multi-sig-group';
import CreateYourAIDTask from '../generic/create-your-aid/create-your-aid';
import CreatePasscodeTask from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuanceTask from '../generic/credential-issuance/credential-issuance';
import CredentialRevocationTask from '../generic/credential-revocation/credential-revocation';
import EnterPasscodeTask from '../generic/enter-passcode/enter-passcode';
import IntroToYourRoleTask from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroupTask from '../generic/join-multi-sig-group/join-multi-sig-group';
import ManualKeyRotationTask from '../generic/manual-key-rotation/manual-key-rotation';
import VideoCallTask from '../generic/video-call/video-call';
import ViewMultiSigEventLogsTask from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';

//dummy tasks
import JoinManualKeyRotation from '../generic/join-manual-key-rotation/join-manual-key-rotation';
import InitiateManualKeyRotation from '../generic/initiate-manual-key-rotation/initiate-manual-key-rotation';
import InitiateDelegationApproval from '../generic/initiate-delegation-approval/initiate-delegation-approval';
import JoinDelegationApproval from '../generic/join-delegation-approval/join-delegation-approval';
import JoinCredentialRevocation from '../generic/join-credential-revocation/join-credential-revocation';
import JoinCredentialIssuance from '../generic/join-credential-issuance/join-credential-issuance';
import AcceptCredentials from '../generic/accept-credentials/accept-credentials';
const tasks = {
  'create-passcode': [
    new CreatePasscodeTask({ label: 'Create Your Passcode' }),
    new EnterPasscodeTask({ label: 'Enter Your Passcode' }),
  ],
  'create-identifier': [
    new IntroToYourRoleTask({ label: 'Intro to Your Role', variables: variables.introToYourRole }),
    new CreateYourAIDTask({ label: 'Incept Local GLEIF Single-Sig AID', variables: variables.createYourAid }),
  ],
  'create-multisig': [
    new VideoCallTask({
      initiate: true,
      label: 'Join One Way OOBI/Challenge with Lead Root GAR',
      next: new ConfigureMultiSigGroupTask('Configure Multi-Sig Group'),
    }),
    new VideoCallTask({
      initiate: true,
      label: 'Lead GLEIF External Multi-Sig AID Inception',
      next: new ConfigureMultiSigGroupTask('Configure Multi-Sig Group'),
    }),
    new VideoCallTask({ initiate: false, label: 'Join GLEIF External Multi-Sig AID Inception' }),
  ],
  'join-multisig': [new JoinMultiSigGroupTask('Join Multi-Sig Group')],
  'main': [
    new ManualKeyRotationTask({ label: 'Initiate Manual Key Rotation' }),
    new JoinManualKeyRotation({ label: 'Join Manual Key Rotation' }),
    new CredentialIssuanceTask({ label: 'Initiate ECR Credential Issuance' }),
    new JoinCredentialIssuance({ label: 'Join ECR Credential Issuance' }),
    new CredentialRevocationTask({ label: 'Initiate ECR Credential Revocation' }),
    new JoinCredentialIssuance({ label: 'Join ECR Credential Revocation' }),
    new ViewMultiSigEventLogsTask({ label: 'View Multi-Sig Event Logs' }),
    new AcceptCredentials({ label: 'Accept Credential' }),
  ],
};

module.exports = tasks;
