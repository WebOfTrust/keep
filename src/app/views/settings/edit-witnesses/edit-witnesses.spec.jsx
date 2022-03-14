import m from 'mithril';
import mq from 'mithril-query';
import EditWitnesses from './edit-witnesses.jsx';

describe('EditWitnesses component', () => {
  it('Should create', () => {
    let out = mq(m(EditWitnesses));
    expect(out).toBeTruthy();
  });
});
