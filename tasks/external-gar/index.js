import m from 'mithril';

// Variables
import variables from './variables';

import { Button } from '../../src/app/components';

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

// dummy tasks
import JoinManualKeyRotationTask from '../generic/join-manual-key-rotation/join-manual-key-rotation';
import InitiateManualKeyRotationTask from '../generic/initiate-manual-key-rotation/initiate-manual-key-rotation';
import InitiateDelegationApprovalTask from '../generic/initiate-delegation-approval/initiate-delegation-approval';
import JoinDelegationApprovalTask from '../generic/join-delegation-approval/join-delegation-approval';
import JoinCredentialRevocationTask from '../generic/join-credential-revocation/join-credential-revocation';
import JoinCredentialIssuanceTask from '../generic/join-credential-issuance/join-credential-issuance';
import AcceptCredentialsTask from '../generic/accept-credentials/accept-credentials';

import loanApproved from '../../src/assets/img/loan-approved.svg';

class ExchangeWithLeadRootGARTask {
  constructor() {
    this.label = '';
    this.imgSrc = null;
    this.component = {
      view: (vnode) => {
        return (
          <>
            <img src={loanApproved} style={{ width: '240px' }} />
            <h3>Exchange OOBIs with Lead Root GAR</h3>
            <p>
              Verification of the External GARs has been completed, please proceed with exchanging OOBIs with your Lead
              Root GAR
            </p>
            <div class="flex flex-justify-end">
              <Button raised class="button--big button--no-transform" label="Continue" onclick={() => {}} />
            </div>
          </>
        );
      },
    };
  }
}

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
      skipIntro: true,
      oneToOne: true,
      label: 'Initiate One Way OOBI/Challenge with Lead Root GAR',
      next: new ConfigureMultiSigGroupTask({ label: 'Configure Multi-Sig Group', requireDelegator: true }),
    }),
    new VideoCallTask({
      initiate: true,
      label: 'Lead GLEIF External Multi-Sig AID Inception',
      next: new ExchangeWithLeadRootGARTask(),
    }),
    new VideoCallTask({ initiate: false, label: 'Join GLEIF External Multi-Sig AID Inception' }),
  ],
  'join-multisig': [new JoinMultiSigGroupTask({ label: 'Join Multi-Sig Group' })],
  'main': [
    new ManualKeyRotationTask({ label: 'Initiate Manual Key Rotation' }),
    new JoinManualKeyRotationTask({ label: 'Join Manual Key Rotation' }),
    new InitiateDelegationApprovalTask({ label: 'Initiate Delegation Approval' }),
    new JoinDelegationApprovalTask({ label: 'Join Delegation Approval' }),
    new CredentialIssuanceTask({ label: 'Initiate QVI Credential Issuance' }),
    new JoinCredentialIssuanceTask({ label: 'Join QVI Credential Issuance' }),
    new CredentialRevocationTask({ label: 'Initiate QVI Credential Revocation' }),
    new JoinCredentialRevocationTask({ label: 'Join QVI Credential Revocation' }),
    new ViewMultiSigEventLogsTask({ label: 'View Multi-Sig Event Logs' }),
  ],
};

module.exports = tasks;
