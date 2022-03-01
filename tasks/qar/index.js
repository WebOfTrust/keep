import m from 'mithril';

// Tasks
import IntroToQARRole from './intro-you-the-qar-role/intro-to-the-qar-role';
import IDAssuranceOfOOR from './identity-assurance-of-oor/identity-assurance-of-oor';
import CreateYourQarAID from './create-your-qar-aid/create-your-qar-aid';
import QVIIdentityAssurance from './qvi-identity-assurance/qvi-identity-assurance';
import IssueOORvLEICredential from './issue-oor-vlei-credential/issue-oor-vlei-credential';
import TriggerManualKeyRotation from './trigger-manual-key-rotation/trigger-manual-key-rotation';
import RevokeQVIvLEICredential from './revoke-qvi-vlei-credential/revoke-qvi-vlei-credential';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';

const tasks = {
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create my QAR ID',
      component: {
        view: (vnode) => {
          return <CreateYourQarAID end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'intro-to-role': [
    {
      imgSrc: createIdentifier,
      label: 'Intro to Your Role',
      component: {
        view: (vnode) => {
          return <IntroToQARRole end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'oobi': [
    {
      imgSrc: verifyCredentials,
      label: 'Create my QAR ID',
      component: {
        view: (vnode) => {
          return <CreateYourQarAID end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication',
      component: {
        view: (vnode) => {
          return <QVIIdentityAssurance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Issue the OOR vLEI Credential',
      component: {
        view: (vnode) => {
          return <IssueOORvLEICredential end={vnode.attrs.end} />;
        },
      },
    },

    {
      imgSrc: declineRequest,
      label: 'Revoke OOR vLEI Credential',
      component: {
        view: (vnode) => {
          return <RevokeQVIvLEICredential end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
