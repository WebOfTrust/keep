import m from 'mithril';
import mq from 'mithril-query';
import Contacts from './contacts.jsx';

describe('Contacts component', () => {
  it('Should create', () => {
    let out = mq(m(Contacts));
    expect(out).toBeTruthy();
  });
});
