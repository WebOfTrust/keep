import m from 'mithril';
import mq from 'mithril-query';
import Popover from './popover';

describe('Popover component', () => {
  it('Should create', () => {
    let out = mq(m(Popover));
    expect(out).toBeTruthy();
  });
});
