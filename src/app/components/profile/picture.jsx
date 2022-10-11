import m from 'mithril';
import githubLogo from '../../../assets/img/github-logo.svg';
import './picture.scss';

class ProfilePicture {
  constructor() {
    this.initials = '';
  }

  view(vnode) {
    if (vnode.attrs.identifier == null) {
      return <div></div>;
    }

    if (vnode.attrs.identifier.hasOwnProperty('image')) {
      return <img class="relative" src={githubLogo} style={{ width: '35%', borderRadius: '50%' }} alt="" />;
    } else if (vnode.attrs.identifier.hasOwnProperty('name')) {
      const parts = vnode.attrs.identifier.name.split(' ');
      if (parts.length === 1) {
        this.initials = vnode.attrs.identifier.name.substring(0, 1);
      } else if (parts.length >= 2) {
        this.initials = parts[0].substring(0, 1) + parts[1].substring(0, 1);
      }
      return (
        <div class={'profile-picture' + (vnode.attrs.size === 's' ? ' profile-picture--small' : '')}>
          <div>{this.initials}</div>
        </div>
      );
    } else if (vnode.attrs.identifier.hasOwnProperty('alias')) {
      // same as "name" but for "alias"
      const parts = vnode.attrs.identifier.alias.split(' ');
      if (parts.length === 1) {
        this.initials = vnode.attrs.identifier.alias.substring(0, 1);
      } else if (parts.length >= 2) {
        this.initials = parts[0].substring(0, 1) + parts[1].substring(0, 1);
      }
      return (
        <div class={'profile-picture' + (vnode.attrs.size === 's' ? ' profile-picture--small' : '')}>
          <div>{this.initials}</div>
        </div>
      );
    }

    return <div />;
  }
}

module.exports = ProfilePicture;
