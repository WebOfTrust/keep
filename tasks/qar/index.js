import m from 'mithril';
import addNewContacts from '../../src/assets/img/add-new-contacts.png';

// TODO: Tasks for QAR, right now this just helps test building for qar vs gar
const tasks = {
  'create-passcode': [
    {
      imgSrc: addNewContacts,
      label: 'A QAR Task',
      component: {
        view: () => {
          return <h3>Tasks are different for QAR vs GAR</h3>;
        },
      },
    },
  ],
  'create-identifier': [],
  'intro-to-role': [],
  'oobi': [],
};

module.exports = tasks;
