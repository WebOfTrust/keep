import m from 'mithril';
import './aid-field.scss';
import AID from '../aid/aid.jsx'

class AIDField {
  constructor() {
  }

  view(vnode) {
    return (
      <label
        className="mdc-text-field mdc-text-field--outlined mdc-text-field--no-label mdc-text-field--with-trailing-icon"
        style={{width: "100%", marginRight: '0.75rem'}}>
        <span className="mdc-text-field__ripple"/>
        <span className="mdc-notched-outline">
                        <span className="mdc-notched-outline__leading"/>
                        <span className="mdc-notched-outline__trailing"/>
                      </span>
        {vnode.attrs.contact && <AID contact={vnode.attrs.contact} style={{width: '100%', marginTop: '1rem'}}/>}
        {vnode.attrs.aid && <AID aid={vnode.attrs.aid} style={{width: '100%', marginTop: '1rem'}}/>}
        {(!vnode.attrs.contact && !vnode.attrs.aid) && <p className="p-tag" style={{width: '100%'}}/>}
        <p className="p-tag" style={{width: '100%'}}/>
        {vnode.attrs.onclick && <i tabIndex="0" role="button" onclick={() => {
          vnode.attrs.onclick();
        }}
           className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing">search</i>}
      </label>
    );
  }
}

module.exports = AIDField;
