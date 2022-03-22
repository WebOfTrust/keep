import m from 'mithril';
import mq from 'mithril-query';
import EditWatchers from './edit-watchers.jsx';

describe('EditWatchers component', () => {
  it('Should create', () => {
    let out = mq(m(EditWatchers));
    expect(out).toBeTruthy();
  });
});
