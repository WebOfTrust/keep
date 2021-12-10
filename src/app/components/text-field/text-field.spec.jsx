import m from 'mithril';
import mq from 'mithril-query';
import TextField from './text-field';

describe('TextField component', () => {
  it('Should create', () => {
    let out = mq(m(TextField));
    expect(out).toBeTruthy();
  });
});
