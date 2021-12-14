import m from 'mithril';
import Button from '../button/button.jsx';
import IconButton from '../icon-button/icon-button.jsx';

class Card {
  constructor() {
    this.cardClass = 'mdc-card';
    this.optionDefaults = {
      class: null,
      outlined: false,
      padding: '16px',
    };
    this.options = null;
  }

  oninit(vnode) {
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
    if (this.options.outlined) {
      this.cardClass += ' mdc-card--outlined';
    }
    if (this.options.class) {
      this.cardClass += ` ${this.options.class}`;
    }
  }

  view(vnode) {
    return (
      <>
        <div class={this.cardClass} style={{ padding: this.options.padding }}>
          <div class="mdc-card__content">{vnode.children}</div>
          {/*<div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
              <Button class="mdc-card__action mdc-card__action--button" label="Action 1" />
              <Button class="mdc-card__action mdc-card__action--button" label="Action 2" />
            </div>
          </div>
          <div class="mdc-card__action-icons">
            <IconButton class="mdc-card__action mdc-card__action--icon" icon="share" title="Share" />
            <IconButton class="mdc-card__action mdc-card__action--icon" icon="more_vert" title="More Options" />
          </div>*/}
        </div>
      </>
    );
  }
}

module.exports = Card;
