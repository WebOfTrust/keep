import m from 'mithril';
import { Button, Container, TextField } from '../../../components';
import configureIdentifier from '../../../../assets/img/configure-identifier.png';

class ConfigureIdentifier {
  constructor() {}

  view() {
    return (
      <>
        <Container class="headspace flex flex-align-center">
          <div class="flex-2">
            <img src={configureIdentifier} />
          </div>
          <div class="flex-3" style="padding: 1rem">
            <h1>Create Your Alias</h1>
            <label>What would you like your alias to be?</label>
            <TextField placeholder="Jane Smith - QVI Corp." />
            <label>Witnesses</label>
            <TextField placeholder="GLEIF Witness Network" />
            <div class="flex flex-justify-end" style={{ marginTop: '2rem' }}>
              <Button
                raised
                label="Continue"
                onclick={() => {
                  m.route.set('/');
                }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}

module.exports = ConfigureIdentifier;
