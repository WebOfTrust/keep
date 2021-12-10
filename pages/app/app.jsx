import m from 'mithril';

import { UnauthedNav } from '../../src/app/components';

import Download from './download.jsx';
import Splash from './splash.jsx';

import '../../src/scss/defaults.scss';
import '../../src/scss/typography.scss';
import '../../src/scss/globals.scss';

let root = document.body;

const PagesLayout = {
  view: (vnode) => {
    return (
      <>
        <UnauthedNav />
        {vnode.children}
      </>
    );
  },
};

m.route(root, '/', {
  '/': {
    view: () => {
      return (
        <PagesLayout>
          <Splash />
        </PagesLayout>
      );
    },
  },
  '/download': {
    view: () => {
      return (
        <PagesLayout>
          <Download />
        </PagesLayout>
      );
    },
  },
});
