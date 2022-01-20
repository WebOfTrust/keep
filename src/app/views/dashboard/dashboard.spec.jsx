import m from 'mithril';
import mq from 'mithril-query';
import Dashboard from './dashboard.jsx';

describe('Dashboard component', () => {
  it('Should create', () => {
    let out = mq(m(Dashboard));
    expect(out).toBeTruthy();
  });
});
