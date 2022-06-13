import m from 'mithril';
import mq from 'mithril-query';
import TabBar from './tab-bar.jsx';

describe('TabBar component', () => {
  it('Should create', () => {
    let out = mq(m(TabBar));
    expect(out).toBeTruthy();
  });
});
