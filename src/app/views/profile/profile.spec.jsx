import m from 'mithril';
import mq from 'mithril-query';
import Profile from './profile.jsx';

describe('Profile component', () => {
  it('Should create', () => {
    let out = mq(m(Profile));
    expect(out).toBeTruthy();
  });
});
