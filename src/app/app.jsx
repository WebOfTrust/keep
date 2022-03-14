import m from 'mithril';

import { AuthedNav, ToastOutlet, UnauthedNav } from './components';
import { Contacts, Dashboard, Error, Profile, Settings } from './views';

import '../scss/defaults.scss';
import '../scss/typography.scss';
import '../scss/globals.scss';
import '../scss/nav-rail.scss';

let root = document.body;

const UnauthedLayout = {
  view: (vnode) => {
    return (
      <>
        <ToastOutlet />
        <UnauthedNav />
        {vnode.children}
      </>
    );
  },
};

const AuthedLayout = {
  view: (vnode) => {
    return (
      <>
        <ToastOutlet />
        <AuthedNav />
        {vnode.children}
      </>
    );
  },
};

const documentTitle = 'KEEP';
m.route(root, '/dashboard', {
  '/dashboard': {
    oninit: () => {
      document.title = documentTitle + ' | Dashboard';
    },
    view: () => {
      return (
        <AuthedLayout>
          <Dashboard />
        </AuthedLayout>
      );
    },
  },
  '/contacts': {
    oninit: () => {
      document.title = documentTitle + ' | Contacts';
    },
    view: () => {
      return (
        <AuthedLayout>
          <Contacts />
        </AuthedLayout>
      );
    },
  },
  '/profile': {
    oninit: () => {
      document.title = documentTitle + ' | Profile';
    },
    view: () => {
      return (
        <AuthedLayout>
          <Profile />
        </AuthedLayout>
      );
    },
  },
  '/settings': {
    oninit: () => {
      document.title = documentTitle + ' | Settings';
    },
    view: () => {
      return (
        <AuthedLayout>
          <Settings />
        </AuthedLayout>
      );
    },
  },
  '/:404': {
    oninit: () => {
      document.title = documentTitle + ' | Error';
    },
    view: () => {
      return (
        <UnauthedLayout>
          <Error />
        </UnauthedLayout>
      );
    },
  },
});
