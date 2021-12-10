import m from 'mithril';
import mq from 'mithril-query';
import Modal from './modal.jsx';

describe('Modal component', () => {
  it('Should create', () => {
    let out = mq(m(Modal));
    expect(out).toBeTruthy();
  });
});
