import m from 'mithril';
import { Button, Container } from '../../src/app/components';

class Download {
  view() {
    return (
      <>
        <Container>
          <Button raised label="Download Software" />
        </Container>
      </>
    );
  }
}

module.exports = Download;
