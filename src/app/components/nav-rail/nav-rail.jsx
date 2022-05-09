import m from 'mithril';

class NavRail {
  view(vnode) {
    return (
      <>
        <div class="nav-rail">
          <div
            class={`nav-rail-item ${vnode.attrs.selected === 'dashboard' ? 'nav-rail-item--selected' : ''}`}
            onclick={() => {
              m.route.set('/');
            }}
          >
            <i class="material-icons md-48">dashboard</i>
            <div class="nav-rail-item-text">Dashboard</div>
          </div>
          {/* <div
            class={`nav-rail-item ${vnode.attrs.selected === 'tasks' ? 'nav-rail-item--selected' : ''}`}
            onclick={() => {
              m.route.set('/tasks');
            }}
          >
            <i class="material-icons md-48">assignment</i>
            <div class="nav-rail-item-text">My Tasks</div>
          </div> */}
          <div
            class={`nav-rail-item ${vnode.attrs.selected === 'contacts' ? 'nav-rail-item--selected' : ''}`}
            onclick={() => {
              m.route.set('/contacts');
            }}
          >
            <span class="material-icons md-48">people</span>
            <div class="nav-rail-item-text">My Contacts</div>
          </div>
          <div
            class={`nav-rail-item ${vnode.attrs.selected === 'credentials' ? 'nav-rail-item--selected' : ''}`}
            onclick={() => {
              m.route.set('/credentials');
            }}
          >
            <i class="material-icons md-48">lock</i>
            <div class="nav-rail-item-text">My Credentials</div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = NavRail;
