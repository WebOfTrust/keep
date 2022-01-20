import m from 'mithril';

class Toaster {
  static toasts = [];

  static uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

  static toastDefault = () => {
    return {
      id: this.uuidv4(),
      text: '',
      type: 'info',
      timeout: 10000,
      closeButton: true,
    };
  };

  static addToast(text, type, options = {}) {
    let toast = Object.assign(this.toastDefault(), {
      text,
      type,
      ...options,
    });
    this.toasts.push(toast);
    if (toast.timeout > 0) {
      setTimeout(() => {
        this.remove(toast.id);
      }, toast.timeout);
    }
  }

  static remove(id) {
    let spliceIndex = this.toasts.findIndex((t) => t.id === id);
    this.toasts.splice(spliceIndex, 1);
    m.redraw();
  }

  static success(text, options = {}) {
    this.addToast(text, 'success', options);
  }

  static error(text, options = {}) {
    this.addToast(text, 'error', options);
  }

  static warning(text, options = {}) {
    this.addToast(text, 'warning', options);
  }

  static info(text, options = {}) {
    this.addToast(text, 'info', options);
  }
}

module.exports = Toaster;
