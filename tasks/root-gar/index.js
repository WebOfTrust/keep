import m from 'mithril';
//Variables
import variables from './variables';
import { DefaultMapTask } from '../../src/app/services/tasks';

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
import ManualKeyRotationTask from '../generic/manual-key-rotation/manual-key-rotation';
import ViewMultiSigEventLogsTask from '../generic/view-multi-sig-event-logs/view-multi-sig-event-logs';
import WaitForDelegationRequestTask from '../generic/wait-for-delegation-request/wait-for-delegation-request';

import Profile from '../../src/app/services/profile';

class RootGARTasks {
  _all = [];

  constructor(tasks) {
    this._all = tasks;
  }

  find(name) {
    let tasks = this._all[name];
    if (tasks !== undefined) {
      return tasks[0];
    } else {
      return undefined;
    }
  }

  get all() {
    return this._all;
  }

  get tasksList() {
    if (Profile.created === undefined) {
      return [];
    }
    if (!Profile.created) {
      return this._all['create-passcode'];
    }
    if (!Profile.isLoggedIn) {
      return this._all['login'];
    }
    if (Profile.identifiers.length === 0) {
      return this._all['create-identifier'];
    } else {
      let defaultAID = Profile.getDefaultAID();
      if (defaultAID !== undefined && 'group' in defaultAID) {
        return this._all['multisig-selected'];
      } else {
        if (Profile.identifiers.length === 1) {
          return this._all['create-multisig'];
        } else {
          return this._all['singlesig-selected'];
        }
      }
    }
  }
}

const tasks = {
  'create-passcode': [new CreatePasscodeTask({ id: 'create-passcode', label: 'Create Your Passcode' })],
  'login': [new EnterPasscodeTask({ id: 'enter-passcode', label: 'Enter Your Passcode' })],
  'create-identifier': [
    new IntroToYourRoleTask({
      id: 'intro-to-your-role',
      label: 'Intro to Your Role',
      variables: variables.introToYourRole,
    }),
    new CreateYourAIDTask({
      id: 'create-your-aid',
      label: 'Incept Local GLEIF Single-Sig AID',
      variables: variables.createYourAid, delegatable: true, DnD: false
    }),
  ],
  'create-multisig': [
    new VideoCallTask({
      label: 'Create GLEIF Root Multi-Sig AID',
      next: new ConfigureMultiSigGroupTask({
        label: 'Configure Multi-Sig Group',
        delegatable: false, DnD: false,
        establishable: false, estOnly: true,
      }),
      initialParticipants: 6,
      canAddParticipants: false,
      variables: variables.createGLEIFRoot,
    }),
    new ManualKeyRotationTask({ label: 'Perform Manual Key Rotation' }),
  ],
  'join-multisig': [new JoinMultiSigGroupTask({ label: 'Join Multi-Sig Group' })],
  'approve-delegation': [new JoinDelegationApprovalTask({ label: 'Delegation Approval' })],
  'singlesig-selected': [new ManualKeyRotationTask({ label: 'Perform Manual Key Rotation' })],
  'multisig-selected': [
    new VideoCallTask({
      label: 'Approve Delegation Request',
      next: new WaitForDelegationRequestTask({ label: 'Wait for Delegation Request' }),
      initialParticipants: 3,
      canAddParticipants: false,
      variables: variables.approveDelegation,
    }),
    new InitiateManualKeyRotationTask({ label: 'Perform Manual Key Rotation' }),
    new ViewMultiSigEventLogsTask({ label: 'View Multi-Sig Event Logs' }),
  ],
};

module.exports = new RootGARTasks(tasks);
