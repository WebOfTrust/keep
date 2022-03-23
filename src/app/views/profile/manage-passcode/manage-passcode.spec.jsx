import m from 'mithril';
import mq from 'mithril-query';
import ManagePasscode from './manage-passcode.jsx';

describe('ManagePasscode component', () => {
  it('Should create', () => {
    let out = mq(m(ManagePasscode));
    expect(out).toBeTruthy();
  });
});
