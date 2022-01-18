import m from 'mithril';
import addNewContacts from '../../src/assets/img/add-new-contacts.png';

// TODO: Tasks for QAR, right now this just helps test building for qar vs gar
const tasks = {
  'create-identifier': [
    {
      imgSrc: addNewContacts,
      label: 'Something here',
      component: {
        view: () => {
          return <h3>Wow different tasks for QAR and GAR wooo</h3>;
        },
      },
    },
  ],
  'intro-to-role': [],
  'oobi': [],
};

module.exports = tasks;
