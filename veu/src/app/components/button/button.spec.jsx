import m from 'mithril';
import mq from 'mithril-query';
import Button from './button.jsx';

describe('Button component', () => {
  it('Should create', () => {
    let out = mq(m(Button));
    expect(out).toBeTruthy();
  });
});
