import m from 'mithril';
//Variables
import variables from './variables';

import { Button } from '../../src/app/components';

// Tasks
import ConfigureMultiSigGroupTask from '../generic/configure-multi-sig-group/configure-multi-sig-group';
import CreateYourAIDTask from '../generic/create-your-aid/create-your-aid';
import CreatePasscodeTask from '../generic/create-your-passcode/create-your-passcode';
import EnterPasscodeTask from '../generic/enter-passcode/enter-passcode';
import IntroToYourRoleTask from '../generic/intro-to-your-role/intro-to-your-role';
import JoinMultiSigGroupTask from '../generic/join-multi-sig-group/join-multi-sig-group';
import JoinDelegationApprovalTask from '../generic/join-delegation-approval/join-delegation-approval';
import InitiateManualKeyRotationTask from '../generic/initiate-manual-key-rotation/initiate-manual-key-rotation';
import VideoCallTask from '../generic/video-call/video-call';
import ViewMultiSigEventLogsTask from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';
import LeadRootLeadOOBI from './lead-root-lead-oobi';

import loanApproved from '../../src/assets/img/loan-approved.svg';

//dummy tasks
import JoinManualKeyRotationTask from '../generic/join-manual-key-rotation/join-manual-key-rotation';

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
    new CreatePasscodeTask({ id: 'create-passcode', label: 'Create Your Passcode' }),
    new EnterPasscodeTask({ id: 'enter-passcode', label: 'Enter Your Passcode' }),
  ],
  'create-identifier': [
    new IntroToYourRoleTask({
      id: 'intro-to-your-role',
      label: 'Intro to Your Role',
      variables: variables.introToYourRole,
    }),
    new CreateYourAIDTask({
      id: 'create-your-aid',
      label: 'Incept Local GLEIF Single-Sig AID',
      variables: variables.createYourAid,
    }),
  ],
  'create-multisig': [
    new VideoCallTask({
      initiate: true,
      label: 'Lead GLEIF Root Multi-Sig AID Inception',
      next: new ConfigureMultiSigGroupTask({ label: 'Configure Multi-Sig Group' }),
    }),
    new VideoCallTask({ initiate: false, label: 'Join GLEIF Root Multi-Sig AID Inception' }),
  ],
  'join-multisig': [new JoinMultiSigGroupTask({ label: 'Join Multi-Sig Group' })],
  'approve-delegation': [new JoinDelegationApprovalTask({ label: 'Delegation Approval' })],
  'main': [
    new LeadRootLeadOOBI({ label: 'Challenge with External GARs', variables: variables.externalOobi }),
    new LeadRootLeadOOBI({ label: 'Challenge with Internal GARs', variables: variables.internalOobi }),
    new InitiateManualKeyRotationTask({ label: 'Initiate Manual Key Rotation' }),
    new JoinManualKeyRotationTask({ label: 'Join Manual Key Rotation' }),
    new ViewMultiSigEventLogsTask({ label: 'View Multi-Sig Event Logs' }),
  ],
};

module.exports = tasks;
