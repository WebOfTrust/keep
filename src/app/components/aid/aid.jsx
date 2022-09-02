import m from 'mithril';
import './aid.scss';
import Popover from '../popover/popover.jsx'

class AID {
  constructor() {
    this.showPopover = false;
  }

  view(vnode) {
    if (vnode.attrs.aid == null) {
      return (<div/>);
    }

    return (
      <div>
        <div className="aid flex flex-justify-start flex-align-center" onclick={() => {
          this.showPopover = true
        }}>
          <p className="p-tag" style={{margin: '0 0.5rem 0 0'}}>{vnode.attrs.aid.name}</p>
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
          <div className="flex flex-justify-start flex-align-center" style={{margin: '0.5rem 0.5rem'}}>
            <p className="p-tag-bold">AID:</p>
            <code style={{margin: '0 0 0.25rem 0.5rem'}}>{vnode.attrs.aid.prefix}</code>
          </div>
        </Popover>

      </div>
    );
  }
}

module.exports = AID;
