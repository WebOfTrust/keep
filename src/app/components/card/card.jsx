import m from 'mithril';

class Card {
  constructor() {
    this.cardClass = 'mdc-card';
    this.optionDefaults = {
      id: '',
      class: null,
      outlined: false,
      padding: '16px',
      style: {},
      onclick: null,
    };
    this.options = null;
  }

  assignOptions(vnode) {
    console.log("assign options");
    console.log(vnode);
    console.log(vnode.attrs);
    this.options = Object.assign({}, this.optionDefaults, vnode.attrs);
    this.options.style = Object.assign({}, this.options.style, {
      padding: this.options.padding,
    });
  }

  setClass() {
    this.cardClass = 'mdc-card';
    if (this.options.outlined) {
      this.cardClass += ' mdc-card--outlined';
    }
    if (this.options.class) {
      this.cardClass += ` ${this.options.class}`;
    }
  }

  oninit(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  onbeforeupdate(vnode) {
    this.assignOptions(vnode);
    this.setClass();
  }

  view(vnode) {
    return (
      <>
        <div id={this.options.id} class={this.cardClass} style={this.options.style} onclick={this.options.onclick}>
          <div class="mdc-card__content">{vnode.children}</div>
        </div>
      </>
    );
  }
}

module.exports = Card;
