import m from 'mithril';
import mq from 'mithril-query';
import Tab from './tab.jsx';

describe('Tab component', () => {
  it('Should create', () => {
    let out = mq(m(Tab));
    expect(out).toBeTruthy();
  });
});
