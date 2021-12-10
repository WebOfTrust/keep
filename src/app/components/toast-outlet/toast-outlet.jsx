import m from 'mithril';
import IconButton from '../icon-button/icon-button';
import { Toaster } from '../../services';
import './toast-outlet.scss';

class ToastOutlet {
  constructor() {}

  close(toast) {
    Toaster.remove(toast.id);
  }

  view() {
    return (
      <ul class="toasts">
        {Toaster.toasts.map((toast) => {
          return (
            <li
              class={toast.type ? `toast toast--${toast.type}` : null}
              onclick={() => {
                this.close(toast);
              }}
            >
              <div class="toast__text">{toast.text}</div>
              {toast.closeButton && <IconButton icon="close" />}
            </li>
          );
        })}
      </ul>
    );
  }
}

module.exports = ToastOutlet;
