import m from 'mithril';
import mq from 'mithril-query';
import Select from './select.jsx';

describe('Select component', () => {
  it('Should create', () => {
    let out = mq(m(Select));
    expect(out).toBeTruthy();
  });
});
