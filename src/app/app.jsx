import m from 'mithril';

import { Nav, ToastOutlet, Footer } from './components';
import { Auth, Mail, Tasks } from './services';
import { Contacts, Dashboard, Error, Profile, Settings, Credentials } from './views';

import tasks from '../../tasks';

import '../scss/defaults.scss';
import '../scss/typography.scss';
import '../scss/globals.scss';
import '../scss/nav-rail.scss';

Tasks.all = tasks[process.env.USER_TYPE];

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

const documentTitle = 'KEEP';
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
    },
    view: () => {
      return (
        <MainLayout>
          <Contacts />
        </MainLayout>
      );
    },
  },
  '/credentials': {
    oninit: () => {
      document.title = documentTitle + ' | Credentials';
    },
    view: () => {
      return (
        <MainLayout>
          <Credentials />
        </MainLayout>
      );
    },
  },
  '/profile': {
    oninit: () => {
      document.title = documentTitle + ' | Profile';
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
