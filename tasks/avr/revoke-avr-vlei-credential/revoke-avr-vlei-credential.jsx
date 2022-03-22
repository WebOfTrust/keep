import m from 'mithril';
import { Button, Card, TextField } from '../../../src/app/components';
import approveRequest from '../../../src/assets/img/approve-request.png';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import verifyCredentials from '../../../src/assets/img/verify-credentials.png';
class RevokeAVRvLEICredential {
  constructor(vnode) {
    this.select=false;
    this.step = 0;

    this.steps = [
      <>
        <h3>Request Credential Revocation</h3>
                <p class="p-tag">
                Please select the contact and credentials you would like to revoke.</p>
        
          <TextField
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '3rem', margin: '0 0 1.5rem 0', width: '75%' }}
            filled
            fluid
            placeholder="ACME" 
            // oninput={(e) => {
            //   this.passcode = e.target.value;
            // }}
            iconLeading={{
              icon: 'search',
            }}
          />
<div>
  <Card 
  class='card--active'
  style={{margin: '2rem 0 2rem 0', height: '6rem'}}>
    <p>Paul Smith</p>
    <p>AVR for ACME Corp.</p>
  </Card>
  <Card style={{margin: '2rem 0 2rem 0', height: '6rem'}}>
    <p>Judith Williams</p>
    <p>AVR for ACME Corp.</p>
  </Card>
</div>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
      <h3>Request Credential Revocation</h3>
              <p class="p-tag">
              On submission, a signed request has been sent to the requested user for their review. </p>
      
<div>

  <p>Contact: Paul Smith</p>
  <p>Credential: LAR for ACME Corp.</p>
<br></br>
<br />
</div>
      <div class="flex flex-justify-between">
        <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
        <Button
          class="button--big button--no-transform"
          raised
          label="Submit"
          onclick={() => {
            this.step++;
          }}
        />
      </div>
    </>,

<>
<h3>Revocation Submitted!</h3>
        <p class="p-tag">
        You will be notified when the credential revocation is completed.</p>
<div>

<p>Contact: Paul Smith</p>
<p>Credential: LAR for ACME Corp.</p>
<br></br>
<br />
</div>
<div class="flex flex-justify-end">
  
  <Button
    class="button--big button--no-transform"
    raised
    label="Close"
    onclick={vnode.attrs.end}
  />
</div>
</>,
      
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

module.exports = RevokeAVRvLEICredential;
