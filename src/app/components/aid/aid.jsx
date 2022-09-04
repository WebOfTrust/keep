import m from 'mithril';
import './aid.scss';
import Popover from '../popover/popover.jsx'

class AID {
  constructor() {
    this.showPopover = false;
  }

  view(vnode) {
    if (vnode.attrs.aid) {
      this.aid = vnode.attrs.aid
      this.type = "Local Identifier";
    } else if(vnode.attrs.contact) {
      this.aid = {name: vnode.attrs.contact.alias, prefix: vnode.attrs.contact.id}
      this.type = "Connection Identifier"
    }
    else {
      return (<div/>);
    }

    return (
      <div style={vnode.attrs.style}>
        <div className="aid flex flex-justify-start flex-align-center" onclick={() => {
          this.showPopover = true
        }}>
          <p className="p-tag" style={{margin: '0 0.5rem 0 0'}}>{this.aid.name}</p>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.7rem',
              fontStyle: 'bold',
              width: '1.1rem',
              height: '1.1rem',
              lineHeight: '1.25rem',
              textAlign: 'center',
              borderRadius: '50%',
              background: '#11604a',
              verticalAlign: 'top',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '0.5rem'
            }}
          >
            <div>A</div>
          </div>
        </div>
        <Popover visible={this.showPopover} onClose={() => {this.showPopover = false}} style={{width: "425px"}}>
          <p className="p-tag-bold" style={{margin: '0.5rem 0.5rem'}}>{this.type}</p>
          <div className="flex flex-justify-start flex-align-center" style={{margin: '0.5rem 0.5rem'}}>
            <p className="p-tag-bold">AID:</p>
            <code style={{margin: '0 0 0.25rem 0.5rem'}}>{this.aid.prefix}</code>
          </div>
        </Popover>

      </div>
    );
  }
}

module.exports = AID;
