import m from 'mithril';
import { Button, Container } from '../../src/app/components';

class Splash {
  view() {
    return (
      <>
        <div class="splash__header">
          <div class="splash__header__container">
            <h1 class="lg">Credentials that make business transactions and customer validation more secure. </h1>
            <p class="font-color--light">
              vLEI Credentials are issued to legal entities after a rigorous vetting process and can help shorten or
              streamline your KYC process when facilitating business transactions.
            </p>
            <Button
              class="button--big"
              raised
              label="Start Here"
              onclick={() => {
                m.route.set('/download');
              }}
            />
          </div>
        </div>
        <Container>
          <div class="text--center" style={{ margin: '3rem 0' }}>
            <h1>How do vLEI Credentials work?</h1>
            <p>
              They’re a secure way to request entity verification, and to empower key employees to facilitate
              transactions.
            </p>
          </div>
          <div class="flex" style={{ marginBottom: '5rem' }}>
            <div class="flex flex-column flex-align-center text--center" style={{ marginRight: '1rem' }}>
              <span class="material-icons-outlined md-blue md-40">shield</span>
              <h4>Provided by Qualified Issuers</h4>
              <p>
                After a business sets up an LEI (Legal Entity Identifier), they can begin the vetting process with one
                of our qualified issuers for vLEI credentials.
              </p>
            </div>
            <div class="flex flex-column flex-align-center text--center" style={{ marginRight: '1rem' }}>
              <span class="material-icons-outlined md-blue md-40">build</span>
              <h4>Given to Trusted Associates</h4>
              <p>
                After a business receives credentials, trusted associates are given role specfic credentials so they can
                facilitate transactions.
              </p>
            </div>
            <div class="flex flex-column flex-align-center text--center">
              <span class="material-icons-outlined md-blue md-40">vpn_key</span>
              <h4>Verifiable by Businesses</h4>
              <p>
                A clear provenance chain from end to end shows businesses where these credentials originated and when
                due diligence was conducted.
              </p>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

module.exports = Splash;
