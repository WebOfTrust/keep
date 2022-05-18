import m from 'mithril';

//Variables
import variables from './variables';

import { Button } from '../../src/app/components';

// Tasks
import ConfigureMultiSigGroupTask from '../generic/configure-multi-sig-group/configure-multi-sig-group';
import CreateYourAIDTask from '../generic/create-your-aid/create-your-aid';
import CreatePasscodeTask from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuanceTask from '../generic/credential-issuance/credential-issuance';
import EnterPasscodeTask from '../generic/enter-passcode/enter-passcode';
import IntroToYourRoleTask from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroupTask from '../generic/join-multi-sig-group/join-multi-sig-group';
import ManualKeyRotationTask from '../generic/manual-key-rotation/manual-key-rotation';
import VideoCallTask from '../generic/video-call/video-call';
import ViewMultiSigEventLogsTask from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';

import loanApproved from '../../src/assets/img/loan-approved.svg';

class DelegationApprovalInProcessTask {
  constructor() {
    this.label = '';
    this.imgSrc = null;
    this.component = {
      view: (vnode) => {
        return (
          <>
            <img src={loanApproved} style={{ width: '240px' }} />
            <h3>Delegation Approval in Progress</h3>
            <p>You will be notified when it is time for you to sign</p>
            <div class="flex flex-justify-end">
              <Button raised class="button--big button--no-transform" label="Close" onclick={() => {}} />
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
      label: 'Lead GLEIF External Multi-Sig AID Inception',
      next: new ConfigureMultiSigGroupTask({ label: 'Configure Multi-Sig Group' }),
    }),
    new VideoCallTask({ initiate: false, label: 'Join GLEIF External Multi-Sig AID Inception' }),
  ],
  'join-multisig': [new JoinMultiSigGroupTask({ label: 'Join Multi-Sig Group' })],
  'main': [
    new ManualKeyRotationTask({ label: 'Initiate Manual Key Rotation' }),
    new ManualKeyRotationTask({ label: 'Join Manual Key Rotation' }),
    new VideoCallTask({
      initiate: false,
      skipIntro: true,
      oneToOne: true,
      label: 'Initiate Delegation Approval',
      next: new DelegationApprovalInProcessTask(),
    }),
    new CredentialIssuanceTask({ label: 'Join Delegation Approval' }),
    new ViewMultiSigEventLogsTask({ label: 'View Multi-Sig Event Logs' }),
  ],
};

module.exports = tasks;
