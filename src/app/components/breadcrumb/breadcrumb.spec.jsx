import m from 'mithril';
import mq from 'mithril-query';
import Breadcrumb from './breadcrumb.jsx';

describe('Breadcrumb component', () => {
  it('Should create', () => {
    let out = mq(m(Breadcrumb));
    expect(out).toBeTruthy();
  });
});
