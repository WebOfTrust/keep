import m from 'mithril';
import CreatePasscode from './create-passcode/create-passcode.jsx';
import CreateYourGleifAID from './create-your-gleif-aid/create-your-gleif-aid.jsx';
import IntroToYourRole from './intro-to-your-role/intro-to-your-role.jsx';
import GARIssueQVIvLEICredential from './issue-qvi-vlei-credential/issue-qvi-vlei-credential.jsx';
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';
import RevokeQviCredential from './revoke-qvi-credential/revoke-qvi-credential.jsx';
import ManualKeyRotation from './manual-key-rotation/manual-key-rotation';
import LoginGar from './login-gar/login-gar';

const tasks = {
  'create-passcode': [
    {
      imgSrc: createYourPasscode,
      label: 'Create Your Passcode',
      component: {
        view: (vnode) => {
          return <CreatePasscode end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: createYourPasscode,
      label: 'Enter Your Passcode',
      component: {
        view: (vnode) => {
          return <LoginGar end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your GLEIF AID',
      component: {
        view: (vnode) => {
          return <CreateYourGleifAID end={vnode.attrs.end} />;
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
          return <IntroToYourRole end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'oobi': [
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication of the QAR',
      component: {
        view: (vnode) => {
          return <GARIssueQVIvLEICredential end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Issuance of a Qualified vLEI Issuer vLEI Credential',
      component: {
        view: (vnode) => {
          return <GARIssueQVIvLEICredential end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: verifyCredentials,
      label: 'Triggered Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <ManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Revocation of QVI vLEI Credential by GLEIF',
      component: {
        view: (vnode) => {
          return <RevokeQviCredential end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
