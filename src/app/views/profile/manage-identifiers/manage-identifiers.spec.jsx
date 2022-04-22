import m from 'mithril';
import mq from 'mithril-query';
import EditProfile from './manage-identifiers.jsx';

describe('EditProfile component', () => {
  it('Should create', () => {
    let out = mq(m(EditProfile));
    expect(out).toBeTruthy();
  });
});
