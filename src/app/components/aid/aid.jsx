import m from 'mithril';
import './aid.scss';
import Button from '../button/button.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import ProfilePicture from '../profile/picture.jsx';
import Popover from '../popover/popover.jsx';

class AID {
  constructor(vnode) {
    this.aid = null;
    this.type = 'Local Identifier';
    this.authenticated = false;
    this.iconClass = 'aid__icon';
    // TODO: We'll need to replace this with the actual oobi url when it is serialized on identifiers/contacts
    this.oobiURL =
      'http://127.0.0.1:5642/oobi/ENF33M-BiTJUMGVOX2pvYi2GlEYuUFjvYnHjL2oxFksP/witness/BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha';
    this.showPopover = false;
    this.aidCopied = false;
    this.urlCopied = false;
  }

  copy(str) {
    this.aidCopied = false;
    this.urlCopied = false;
    return navigator.clipboard.writeText(str);
  }

  copyAID() {
    this.copy(this.aid.prefix).then(
      () => {
        this.aidCopied = true;
        m.redraw();
      },
      () => {
        m.redraw();
      }
    );
  }

  copyURL() {
    this.copy(this.oobiURL).then(
      () => {
        this.urlCopied = true;
        m.redraw();
      },
      () => {
        m.redraw();
      }
    );
  }

  view(vnode) {
    if (vnode.attrs.aid) {
      this.aid = {
        name: vnode.attrs.aid.name,
        prefix: vnode.attrs.aid.prefix,
        organization: vnode.attrs.aid.metadata?.organization,
      };
      this.type = 'Local Identifier';
      this.authenticated = true;
    } else if (vnode.attrs.contact) {
      this.aid = {
        name: vnode.attrs.contact.alias,
        prefix: vnode.attrs.contact.id,
        organization: vnode.attrs.contact.organization,
      };
      this.type = 'Connection Identifier';
      this.authenticated = vnode.attrs.contact.challenges.length > 0;
    }

    if (this.authenticated) {
      this.iconClass = `aid__icon aid__icon--authenticated`;
    }

    if (!this.aid) {
      return <></>;
    }

    return (
      <>
        <div class="aid" style={vnode.attrs.style}>
          <p class="font-weight--medium" style={{ margin: '0 0.5rem 0 0', whiteSpace: 'nowrap' }}>
            {this.aid.name}
          </p>
          <div
            class={this.iconClass}
            onclick={() => {
              this.showPopover = true;
            }}
          >
            <div>A</div>
          </div>
          <Popover
            visible={this.showPopover}
            onClose={() => {
              this.showPopover = false;
            }}
          >
            <p class="aid__popover__type">{this.type}</p>
            <div class="aid__popover__nameContainer">
              <ProfilePicture identifier={this.aid} size="s" />
              <div style={{ marginLeft: '1rem' }}>
                <p class="aid__popover__name">{this.aid.name}</p>
                {this.aid.organization && <p class="aid__popover__organization">{this.aid.organization}</p>}
              </div>
              <div class="aid__popover__nameContainer__spacer"></div>
              <Button
                label={vnode.attrs.contact ? 'View Contact' : 'View Identifier'}
                style={{ marginLeft: '1rem' }}
                onclick={() => {
                  if (vnode.attrs.contact) {
                    m.route.set('/contacts', {
                      id: vnode.attrs.contact.id,
                    });
                  } else {
                    m.route.set('/profile');
                  }
                }}
              />
            </div>
            <div class="aid__popover__field">
              <p class="aid__popover__label">AID:</p>
              <code class="aid__popover__value" title={this.aid.prefix}>
                {this.aid.prefix}
              </code>
              <IconButton
                icon="content_copy"
                onclick={() => {
                  this.copyAID();
                }}
              />
            </div>
            <div class="aid__popover__field">
              <p class="aid__popover__label">URL:</p>
              <code class="aid__popover__value" title={this.oobiURL}>
                {this.oobiURL}
              </code>
              <IconButton
                icon="content_copy"
                onclick={() => {
                  this.copyURL();
                }}
              />
            </div>
            <div class="aid__popover__footer">
              <p class="aid__popover__footer__copied">
                {this.aidCopied && 'AID copied!'}
                {this.urlCopied && 'URL copied!'}
              </p>
              {vnode.attrs.contact && this.aid.verified && (
                <p>
                  Authenticated <span class="md-16 material-icons">check</span>
                </p>
              )}
              {vnode.attrs.contact && !this.aid.verified && <Button raised label="Spot Check" />}
            </div>
          </Popover>
        </div>
      </>
    );
  }
}

module.exports = AID;
