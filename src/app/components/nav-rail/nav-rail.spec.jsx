import m from 'mithril';
import mq from 'mithril-query';
import NavRail from './nav-rail.jsx';

describe('NavRail component', () => {
  it('Should create', () => {
    let out = mq(m(NavRail));
    expect(out).toBeTruthy();
  });
});
