import m from 'mithril';

import { AuthedNav, ToastOutlet, UnauthedNav } from './components';
import { ConfigureIdentifier, CreatePasscode, EnterPasscode, Error, QARDashboard, StyleGuide, Tutorial } from './views';

import '../scss/defaults.scss';
import '../scss/typography.scss';
import '../scss/globals.scss';

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

const documentTitle = 'vLEI Ecosystem';
m.route.prefix = '';
m.route(root, '/tutorial/', {
  '/tutorial': {
    oninit: () => {
      document.title = documentTitle + ' | Tutorial';
    },
    view: () => {
      return (
        <UnauthedLayout>
          <Tutorial />
        </UnauthedLayout>
      );
    },
  },
  '/auth/create-passcode': {
    oninit: () => {
      document.title = documentTitle + ' | Create Passcode';
    },
    view: () => {
      return (
        <UnauthedLayout>
          <CreatePasscode />
        </UnauthedLayout>
      );
    },
  },
  '/auth/enter-passcode': {
    oninit: () => {
      document.title = documentTitle + ' | Enter Passcode';
    },
    view: () => {
      return (
        <UnauthedLayout>
          <EnterPasscode />
        </UnauthedLayout>
      );
    },
  },
  '/auth/configure-identifier': {
    oninit: () => {
      document.title = documentTitle + ' | Configure Identifier';
    },
    view: () => {
      return (
        <UnauthedLayout>
          <ConfigureIdentifier />
        </UnauthedLayout>
      );
    },
  },
  '/dashboard': {
    oninit: () => {
      document.title = documentTitle + ' | QAR Dashboard';
    },
    view: () => {
      return (
        <AuthedLayout>
          <QARDashboard />
        </AuthedLayout>
      );
    },
  },
  '/style-guide': {
    oninit: () => {
      document.title = documentTitle + ' | Style Guide';
    },
    view: () => {
      return (
        <UnauthedLayout>
          <StyleGuide />
        </UnauthedLayout>
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
