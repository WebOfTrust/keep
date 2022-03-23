import m from 'mithril';
import mq from 'mithril-query';
import ManageAlias from './manage-alias.jsx';

describe('ManageAlias component', () => {
  it('Should create', () => {
    let out = mq(m(ManageAlias));
    expect(out).toBeTruthy();
  });
});
