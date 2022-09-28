import m from 'mithril';
import './nav-rail.scss';

class NavRail {
  view(vnode) {
    return (
      <>
        <div class="nav-rail">
          <div
            class={`nav-rail-item ${vnode.attrs.selected === 'dashboard' ? 'nav-rail-item--selected' : ''}`}
            title="Dashboard"
            onclick={() => {
              m.route.set('/');
            }}
          >
            <i class="material-icons md-40">dashboard</i>
            {/* <div class="nav-rail-item-text">Dashboard</div> */}
          </div>
          <div
            class={`nav-rail-item ${vnode.attrs.selected === 'contacts' ? 'nav-rail-item--selected' : ''}`}
            title="My Contacts"
            onclick={() => {
              m.route.set('/contacts');
            }}
          >
            <span class="material-icons md-40">people</span>
            {/* <div class="nav-rail-item-text">My Contacts</div> */}
          </div>
          <div
            class={`nav-rail-item ${vnode.attrs.selected === 'credentials' ? 'nav-rail-item--selected' : ''}`}
            title="My Credentials"
            onclick={() => {
              m.route.set('/credentials');
            }}
          >
            <i class="material-icons md-40">lock</i>
            {/* <div class="nav-rail-item-text">My Credentials</div> */}
          </div>
        </div>
      </>
    );
  }
}

module.exports = NavRail;
