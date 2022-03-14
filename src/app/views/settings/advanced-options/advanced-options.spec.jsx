import m from 'mithril';
import mq from 'mithril-query';
import AdvancedOptions from './advanced-options.jsx';

describe('AdvancedOptions component', () => {
  it('Should create', () => {
    let out = mq(m(AdvancedOptions));
    expect(out).toBeTruthy();
  });
});
