import m from 'mithril';

import { Nav } from '../../src/app/components';

import Download from './download.jsx';
import Splash from './splash.jsx';
import StyleGuide from './style-guide.jsx';

import '../../src/scss/defaults.scss';
import '../../src/scss/typography.scss';
import '../../src/scss/globals.scss';
import './styles.scss';

let root = document.body;

const PagesLayout = {
  view: (vnode) => {
    return (
      <>
        <Nav />
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
  '/style-guide': {
    view: () => {
      return (
        <PagesLayout>
          <StyleGuide />
        </PagesLayout>
      );
    },
  },
});
