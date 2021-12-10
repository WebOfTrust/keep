import m from 'mithril';
import { Button, Container } from '../../src/app/components';

class Splash {
  view() {
    return (
      <>
        <Container>
          <Button
            raised
            label="Get Started"
            onclick={() => {
              m.route.set('/download');
            }}
          />
        </Container>
      </>
    );
  }
}

module.exports = Splash;
