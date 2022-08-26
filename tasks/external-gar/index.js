import m from 'mithril';

// Variables
import variables from './variables';

import { Button } from '../../src/app/components';
import { DefaultMapTask } from '../../src/app/services/tasks';

// Tasks

import ConfigureMultiSigGroupTask from '../generic/configure-multi-sig-group/configure-multi-sig-group';
import CreateYourAIDTask from '../generic/create-your-aid/create-your-aid';
import CreatePasscodeTask from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuanceTask from '../generic/credential-issuance/credential-issuance';
import CredentialRevocationTask from '../generic/credential-revocation/credential-revocation';
import EnterPasscodeTask from '../generic/enter-passcode/enter-passcode';
import IntroToYourRoleTask from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroupTask from '../generic/join-multi-sig-group/join-multi-sig-group';
import InitiateManualKeyRotationTask from '../generic/initiate-manual-key-rotation/initiate-manual-key-rotation';
import VideoCallTask from '../generic/video-call/video-call';
import ViewMultiSigEventLogsTask from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';
import LeadExtLeadRootOOBI from './lead-ext-lead-root-oobi'
import LeadExtLeadQAROOBI from "./lead-ext-lead-qar";

// dummy tasks
import JoinManualKeyRotationTask from '../generic/join-manual-key-rotation/join-manual-key-rotation';
import JoinDelegationApprovalTask from '../generic/join-delegation-approval/join-delegation-approval';
import JoinCredentialRevocationTask from '../generic/join-credential-revocation/join-credential-revocation';
import JoinCredentialIssuanceTask from '../generic/join-credential-issuance/join-credential-issuance';

import loanApproved from '../../src/assets/img/loan-approved.svg';

class DelegationApprovalInProcessTask {
  constructor() {
    this.label = '';
    this.imgSrc = null;
    this.component = {
      view: (vnode) => {
        return (
          <>
            <img src={loanApproved} style={{ marginBottom: '1rem', width: '240px' }} />
            <h3 style={{ marginBottom: '2rem' }}>Delegation Approval in Progress</h3>
            <p class="p-tag">You will be notified when it is time for you to sign</p>
            <div class="flex flex-justify-end" style={{ marginTop: '4rem' }}>
              <Button raised class="button--big button--no-transform" label="Close" onclick={vnode.attrs.end} />
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
    new LeadExtLeadRootOOBI({label: "Challenge with Lead Root GAR "}),
    new VideoCallTask({
      initiate: true,
      label: 'Lead GLEIF External Multi-Sig AID Inception',
      next: new ConfigureMultiSigGroupTask({
        label: 'Configure Multi-Sig Group',
        requireDelegator: true,
      }),
    }),
    new VideoCallTask({ initiate: false, label: 'Join GLEIF External Multi-Sig AID Inception' }),
  ],
  'join-multisig': [new JoinMultiSigGroupTask({ label: 'Join Multi-Sig Group' })],
  'main': [
    new LeadExtLeadQAROOBI({label: 'Challenge with QAR'}),
    new InitiateManualKeyRotationTask({ label: 'Initiate Manual Key Rotation' }),
    new JoinManualKeyRotationTask({ label: 'Join Manual Key Rotation' }),
    new VideoCallTask({
      initiate: false,
      skipIntro: true,
      oneToOne: true,
      label: 'Initiate Delegation Approval',
      next: new DelegationApprovalInProcessTask(),
    }),
    new JoinDelegationApprovalTask({ label: 'Join Delegation Approval' }),
    new CredentialIssuanceTask({ label: 'Initiate QVI Credential Issuance' }),
    new JoinCredentialIssuanceTask({ label: 'Join QVI Credential Issuance' }),
    new CredentialRevocationTask({ label: 'Initiate QVI Credential Revocation' }),
    new JoinCredentialRevocationTask({ label: 'Join QVI Credential Revocation' }),
    new ViewMultiSigEventLogsTask({ label: 'View Multi-Sig Event Logs' }),
  ],
};

module.exports = new DefaultMapTask(tasks);
