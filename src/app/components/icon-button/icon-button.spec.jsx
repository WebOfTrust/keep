import m from 'mithril';
import mq from 'mithril-query';
import IconButton from './icon-button.jsx';

describe('IconButton component', () => {
  it('Should create', () => {
    let out = mq(m(IconButton));
    expect(out).toBeTruthy();
  });
});
