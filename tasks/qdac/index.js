import m from 'mithril';

// Components
import { TextTooltip } from '../../src/app/components';

// Generic Tasks
import CreateYourPasscode from '../generic/create-your-passcode/create-your-passcode';
import CreateYourAID from '../generic/create-your-aid/create-your-aid';
import IntroToYourRole from '../generic/intro-to-your-role/intro-to-your-role';
import Login from '../generic/login/login';

// Tasks
import MultiSigSet from './multi-sig-set/multi-sig-set';
import JoinVideoCall from './join-video-call/join-video-call';
import InitiateVideoCall from './initiate-video-call/initiate-video-call';

// Images
import addNewContacts from '../../src/assets/img/add-new-contacts.png';
import createIdentifier from '../../src/assets/img/create-identifier.png';
import verifyCredentials from '../../src/assets/img/verify-credentials.png';

const tasks = {
  'create-passcode': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your Passcode',
      component: {
        view: (vnode) => {
          return <CreateYourPasscode end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: createIdentifier,
      label: 'Enter Your Passcode',
      component: {
        view: (vnode) => {
          return <Login end={vnode.attrs.end} />;
        },
      },
    },
  ],
  'create-identifier': [
    {
      imgSrc: createIdentifier,
      label: 'Create Your QDAC AID',
      component: {
        view: (vnode) => {
          return (
            <CreateYourAID
              welcome={{
                title: (
                  <>
                    Welcome to your <TextTooltip label={<u>QDAC</u>}>QVI Delegated AID Controller</TextTooltip> Software
                  </>
                ),
                paragraph: (
                  <>
                    This software is designed to help you complete verification of authorized representatives on behalf
                    of your QVI and also as a storage place for all of your credentials.
                    <br />
                    <br />
                    The first step will be to create your Delegated AID, then you will receive a short tutorial, You may
                    skip the tutorial by selecting the “skip” button.
                  </>
                ),
              }}
              creatingAID={{
                title: (
                  <>
                    Creating your{' '}
                    <TextTooltip label={<u>AID</u>}>AID is your identifier for your QDAC software.</TextTooltip>
                  </>
                ),
                paragraph: (
                  <>
                    In order to provide authorization, you will first have to create your own QVI Delegated AID within
                    the software and the QDAGC will verify you as an authorized representative to act on your QVI’s
                    behalf.
                  </>
                ),
              }}
              stepsToCreate={{
                title: 'Steps to Create Your QDAC AID',
              }}
              createYourAlias={{
                paragraph: (
                  <>
                    The alias should be an easy to remember name for your QVI Delegated AID as a member of the QVI
                    Delegated AID signing group (e.g. My Qualified vLEI Authorized Representative Identifier).
                  </>
                ),
              }}
              end={vnode.attrs.end}
            />
          );
        },
      },
    },
  ],
  'intro-to-role': [
    {
      imgSrc: createIdentifier,
      label: 'Intro to Your Role',
      component: {
        view: (vnode) => {
          return (
            <IntroToYourRole
              main={{
                title: 'Intro to the QDAC Role',
                paragraph: (
                  <>
                    You have now created your QVI Delegated AID! While you are waiting for your QVI credentials, here is
                    a brief introduction to some of the tasks you can complete in your role.
                  </>
                ),
              }}
              steps={[
                {
                  title: 'Delegate Credentials',
                  image: addNewContacts,
                  paragraph: (
                    <>
                      You have now created your QVI Delegated AID! While you are waiting for your QVI credentials, here
                      is a brief introduction to some of the tasks you can complete in your role.
                    </>
                  ),
                },
                {
                  title: 'Perform Key Rotation',
                  image: verifyCredentials,
                  paragraph: (
                    <>
                      The QDAGC performs key rotations to ensure the security of the credentials given to QDACs. If any
                      security issues come up, the GDAC can always rotate keys so that they are new.
                    </>
                  ),
                },
              ]}
              end={vnode.attrs.end}
            />
          );
        },
      },
    },
  ],
  'oobi': [
    {
      imgSrc: addNewContacts,
      label: 'Initiate Video Call with QVI Controllers',
      component: {
        view: (vnode) => {
          return <InitiateVideoCall end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Join Video Call with QVI Controllers',
      component: {
        view: (vnode) => {
          return <JoinVideoCall end={vnode.attrs.end} />;
        },
      },
    },
    {
      imgSrc: addNewContacts,
      label: 'Multi Sig Set Temp Location',
      component: {
        view: (vnode) => {
          return <MultiSigSet end={vnode.attrs.end} />;
        },
      },
    },
  ],
};

module.exports = tasks;
