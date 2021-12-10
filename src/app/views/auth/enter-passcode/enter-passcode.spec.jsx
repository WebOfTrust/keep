import m from 'mithril';
import mq from 'mithril-query';
import EnterPasscode from './enter-passcode';

describe('EnterPasscode component', () => {
  it('Should create', () => {
    let out = mq(m(EnterPasscode));
    expect(out).toBeTruthy();
  });
});
