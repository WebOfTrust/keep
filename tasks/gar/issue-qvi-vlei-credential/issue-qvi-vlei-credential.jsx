import m from 'mithril';
import { Button } from '../../../src/app/components';

class GARIssueQVIvLEICredential {
  view() {
    return (
      <>
        <h3>Identity Authentication of the QAR</h3>
        <p>
          This module will take you through the steps of how to authenticate QAR Identity. Below are the steps for how
          to complete the process:
        </p>
        <h3>Steps to Authenticate QAR Identity</h3>
        <ol>
          <li>Join a Zoom Call with a QAR.</li>
          <li>Complete an OOBI exchange to obtain QVI AID information.</li>
          <li>Send a Challenge Response Message to the QAR.</li>
          <li>QAR signs and returns Challenge Response Message.</li>
        </ol>
        <div class="flex flex-justify-end">
          <Button raised label="Continue" />
        </div>
      </>
    );
  }
}

module.exports = GARIssueQVIvLEICredential;
