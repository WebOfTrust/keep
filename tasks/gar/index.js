import m from 'mithril';
import CreateYourGleifAID from './create-your-gleif-aid/create-your-gleif-aid';
import IntroToYourRole from './intro-to-your-role/intro-to-your-role';
import GARIssueQVIvLEICredential from './issue-qvi-vlei-credential/issue-qvi-vlei-credential';
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';

const tasks = {
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your GLEIF AID',
      component: {
        view: () => {
          return <CreateYourGleifAID />;
        },
      },
    },
  ],
  'intro-to-role': [
    {
      imgSrc: createIdentifier,
      label: 'Intro to Your Role',
      component: {
        view: () => {
          return <IntroToYourRole />;
        },
      },
    },
  ],
  'oobi': [
    {
      imgSrc: addNewContacts,
      label: 'Identity Authentication of the QAR',
      component: {
        view: () => {
          return <GARIssueQVIvLEICredential />;
        },
      },
    },
  ],
};

module.exports = tasks;
