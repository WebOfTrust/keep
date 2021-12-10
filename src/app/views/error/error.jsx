import m from 'mithril';
import { Container } from '../../components';

class Error {
  constructor() {
    this.remainingSeconds = 5;
    this.interval = null;
  }

  oninit() {
    this.countdown();
  }

  onremove() {
    clearInterval(this.interval);
  }

  countdown() {
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds === 0) {
        clearInterval(this.interval);
        this.redirect();
      }
      m.redraw();
    }, 1000);
  }

  redirect() {
    m.route.set('/');
  }

  view() {
    return (
      <Container>
        <h3 class="headspace">Sorry! Page Not Found</h3>
        <h4>You will be redirected to the home page in {this.remainingSeconds} seconds</h4>
      </Container>
    );
  }
}

module.exports = Error;
