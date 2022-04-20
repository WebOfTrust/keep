import m from 'mithril';

// Tasks
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import CreatePasscode from '../generic/create-your-passcode/create-your-passcode';
import CredentialIssuance from '../generic/credential-issuance/credential-issuance';
import IdentityAuthenticationIssue from '../generic/identity-authentication-issue/identity-authentication-issue';
import IdentityAuthenticationReceive from '../generic/identity-authentication-receive/identity-authentication-receive';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';
import VerifyCredentials from '../generic/verify-credentials/verify-credentials';
// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import uploadFile from '../../src/assets/img/upload-file.png';
import loanApproved from '../../src/assets/img/loan-approved.png';

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
          return <Login end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your AID',
      component: {
        view: (vnode) => {
          return <CreateYourAID end={vnode.attrs.end} />;
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
  'main': [
    // verify credentials
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication (Issue)',
      component: {
        view: (vnode) => {
          return <IdentityAuthenticationIssue end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication (Receive)',
      component: {
        view: (vnode) => {
          return <IdentityAuthenticationReceive end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Credential Issuance',
      component: {
        view: (vnode) => {
          return <CredentialIssuance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: uploadFile,
      label: 'Verify Credentials',
      component: {
        view: (vnode) => {
          return <VerifyCredentials end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
