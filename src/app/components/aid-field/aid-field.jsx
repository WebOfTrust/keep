import m from 'mithril';
import './aid-field.scss';
import AID from '../aid/aid.jsx';

class AIDField {
  constructor() {}

  view(vnode) {
    return (
      <div
        class="aidField"
        onclick={(e) => {
          e.stopPropagation();
          if (vnode.attrs.onclick) {
            vnode.attrs.onclick();
          }
        }}
      >
        {vnode.attrs.contact && <AID contact={vnode.attrs.contact} />}
        {vnode.attrs.aid && <AID aid={vnode.attrs.aid} />}
        {!vnode.attrs.contact && !vnode.attrs.aid && <p className="p-tag" />}
        {vnode.attrs.onclick && (
          <i tabIndex="0" role="button" className="material-icons aidField__search">
            search
          </i>
        )}
      </div>
    );
  }
}

module.exports = AIDField;
