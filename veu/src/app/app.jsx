import m from 'mithril';

import { Nav, ToastOutlet } from './components';
import { ConfigureIdentifier, CreatePasscode, EnterPasscode, Error, StyleGuide, Tutorial } from './views';

import '../scss/defaults.scss';
import '../scss/typography.scss';
import '../scss/globals.scss';

let root = document.body;

const MainLayout = {
  view: (vnode) => {
    return (
      <>
        <ToastOutlet />
        <Nav />
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
        <MainLayout>
          <Tutorial />
        </MainLayout>
      );
    },
  },
  '/auth/create-passcode': {
    oninit: () => {
      document.title = documentTitle + ' | Create Passcode';
    },
    view: () => {
      return (
        <MainLayout>
          <CreatePasscode />
        </MainLayout>
      );
    },
  },
  '/auth/enter-passcode': {
    oninit: () => {
      document.title = documentTitle + ' | Enter Passcode';
    },
    view: () => {
      return (
        <MainLayout>
          <EnterPasscode />
        </MainLayout>
      );
    },
  },
  '/auth/configure-identifier': {
    oninit: () => {
      document.title = documentTitle + ' | Configure Identifier';
    },
    view: () => {
      return (
        <MainLayout>
          <ConfigureIdentifier />
        </MainLayout>
      );
    },
  },
  '/style-guide': {
    oninit: () => {
      document.title = documentTitle + ' | Style Guide';
    },
    view: () => {
      return (
        <MainLayout>
          <StyleGuide />
        </MainLayout>
      );
    },
  },
  '/:404': {
    oninit: () => {
      document.title = documentTitle + ' | Error';
    },
    view: () => {
      return (
        <MainLayout>
          <Error />
        </MainLayout>
      );
    },
  },
});
