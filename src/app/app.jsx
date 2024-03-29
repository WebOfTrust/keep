import m from 'mithril';

import { Nav, ToastOutlet, Footer } from './components';
import { Profile as ProfileSvc, Mail, Notify } from './services';
import { Tasks } from './services/tasks';
import { Contacts, Dashboard, Error, Profile, Settings, Credentials } from './views';

import tasks from '../../tasks';

import '../scss/defaults.scss';
import '../scss/typography.scss';
import '../scss/globals.scss';

import '@fontsource/material-icons';
import '@fontsource/material-icons-outlined';

Tasks.impl = tasks[process.env.USER_TYPE];

ProfileSvc.check().then(
  (r) => {
    Notify.requestList();
    Mail.launchEventSource();
  },
  () => {
    if (m.route.get() !== '/dashboard') {
      m.route.set('/dashboard');
    }
  }
);

let root = document.body;

const MainLayout = {
  view: (vnode) => {
    return (
      <>
        <ToastOutlet />
        <Nav />
        {vnode.children}
        <Footer />
      </>
    );
  },
};

const documentTitle = 'Keep';
m.route(root, '/dashboard', {
  '/dashboard': {
    oninit: () => {
      document.title = documentTitle + ' | Dashboard';
    },
    view: () => {
      return (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      );
    },
  },
  '/contacts': {
    oninit: () => {
      document.title = documentTitle + ' | Contacts';
      Notify.isOpen = false;
    },
    view: () => {
      return (
        <MainLayout>
          <Contacts />
        </MainLayout>
      );
    },
  },
  '/credentials/issued': {
    oninit: () => {
      document.title = documentTitle + ' | Credentials';
      Notify.isOpen = false;
    },
    view: () => {
      return (
        <MainLayout>
          <Credentials type={'issued'} />
        </MainLayout>
      );
    },
  },
  '/credentials': {
    oninit: () => {
      document.title = documentTitle + ' | Credentials';
      Notify.isOpen = false;
    },
    view: () => {
      return (
        <MainLayout>
          <Credentials type={'received'} />
        </MainLayout>
      );
    },
  },
  '/profile': {
    oninit: () => {
      document.title = documentTitle + ' | Profile';
      Notify.isOpen = false;
    },
    view: () => {
      return (
        <MainLayout>
          <Profile />
        </MainLayout>
      );
    },
  },
  '/settings': {
    oninit: () => {
      document.title = documentTitle + ' | Settings';
      Notify.isOpen = false;
    },
    view: () => {
      return (
        <MainLayout>
          <Settings />
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
