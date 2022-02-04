import m from 'mithril';
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import loanApproved from '../../src/assets/img/loan-approved.png';
import declineRequest from '../../src/assets/img/decline-request.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import createYourPasscode from '../../src/assets/img/create-your-passcode.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';

import IDAssuranceOfOOR from './identity-assurance-of-oor/identity-assurance-of-oor.jsx';
import CreateQARID from './create-my-qar-id/create-my-qar-id.jsx';
import QVIIdentityAssurance from './qvi-identity-assurance/qvi-identity-assurance';
import IssueOORvLEICredential from './issue-oor-vlei-credential/issue-oor-vlei-credential';
import TriggerManualKeyRotation from './trigger-manual-key-rotation/trigger-manual-key-rotation';
import RevokeQVIvLEICredential from './revoke-qvi-vlei-credential/revoke-qvi-vlei-credential';

// TODO: Tasks for QAR, right now this just helps test building for qar vs gar
const tasks = {
  'create-passcode': [
    {
      imgSrc: addNewContacts,
      label: 'A QAR Task',
      component: {
        view: () => {
          return <h3>Tasks are different for QAR vs GAR</h3>;
        },
      },
    },
  ],
  'create-identifier': [],
  'intro-to-role': [],
  'oobi': [
    {
      imgSrc: createIdentifier,
      label: 'Identity Assurance of OOR',
      component: {
        view: (vnode) => {
          return <IDAssuranceOfOOR end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: verifyCredentials,
      label: 'Create my QAR ID',
      component: {
        view: (vnode) => {
          return <CreateQARID end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'QVI Identity Assurance',
      component: {
        view: (vnode) => {
          return <QVIIdentityAssurance end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: loanApproved,
      label: 'Issuance of a Qualified vLEI Issuer vLEI Credential',
      component: {
        view: (vnode) => {
          return <IssueOORvLEICredential end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Triggered Manual Key Rotation',
      component: {
        view: (vnode) => {
          return <TriggerManualKeyRotation end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: declineRequest,
      label: 'Revocation of QVI vLEI Credential by GLEIF',
      component: {
        view: (vnode) => {
          return <RevokeQVIvLEICredential end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
