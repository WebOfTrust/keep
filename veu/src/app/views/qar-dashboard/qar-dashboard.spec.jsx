import m from 'mithril';
import mq from 'mithril-query';
import QARDashboard from './qar-dashboard';

describe('QARDashboard component', () => {
  it('Should create', () => {
    let out = mq(m(QARDashboard));
    expect(out).toBeTruthy();
  });
});
