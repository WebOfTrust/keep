import m from 'mithril';
import './breadcrumb.scss';

class Breadcrumb {
  constructor() {}

  view(vnode) {
    return (
      <ul class="breadcrumb" style={vnode.attrs.style}>
        {vnode.attrs.items &&
          vnode.attrs.items.map((item) => {
            return (
              <li>
                {item.href ? (
                  <a
                    onclick={() => {
                      if (item.params) {
                        m.route.set(item.href, item.params);
                      } else {
                        m.route.set(item.href);
                      }
                    }}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            );
          })}
      </ul>
    );
  }
}

module.exports = Breadcrumb;
