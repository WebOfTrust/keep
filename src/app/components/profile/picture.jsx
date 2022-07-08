import m from 'mithril';
import githubLogo from '../../../assets/img/github-logo.svg';

class ProfilePicture {
  constructor() {
    this.initials = '';
  }

  view(vnode) {
    if (vnode.attrs.identifier == null) {
      return <div></div>;
    }

    if (vnode.attrs.identifier.hasOwnProperty('image')) {
      return <img src={githubLogo} style={{ width: '35%', borderRadius: '50%', position: 'relative' }} alt="" />;
    } else if (vnode.attrs.identifier.hasOwnProperty('name')) {
      const parts = vnode.attrs.identifier.name.split(' ');
      if (parts.length === 1) {
        this.initials = vnode.attrs.identifier.name.substring(0, 1);
      } else if (parts.length >= 2) {
        this.initials = parts[0].substring(0, 1) + parts[1].substring(0, 1);
      }
      return (
        <div
          style={{
            display: 'inline-block',
            fontSize: vnode.attrs.size === 's' ? '1rem' : '1.75rem',
            width: vnode.attrs.size === 's' ? '2.25rem' : '3.75rem',
            height: vnode.attrs.size === 's' ? '2.25rem' : '3.75rem',
            lineHeight: vnode.attrs.size === 's' ? '2.25rem' : '3.75rem',
            textAlign: 'center',
            borderRadius: '50%',
            background: 'grey',
            verticalAlign: 'top',
            color: 'white',
            // visibility: (this.initials.length === 0 ? 'hidden' : 'visible')
          }}
        >
          <div>{this.initials}</div>
        </div>
      );
    }

    return <div />;
  }
}

module.exports = ProfilePicture;
