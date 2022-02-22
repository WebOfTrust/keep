import m from 'mithril';

// Tasks
import CreatePasscode from '../all-users/create-passcode/create-passcode.jsx';
import Login from '../all-users/login/login';

// Images
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';

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
};

module.exports = tasks;
