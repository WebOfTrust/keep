import m from 'mithril';

import { AuthedNav, ToastOutlet, UnauthedNav } from './components';
import { Dashboard, Error } from './views';

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
