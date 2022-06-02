// Tasks
import CreateYourAIDTask from '../generic/create-your-aid/create-your-aid';
import CreatePasscodeTask from '../generic/create-your-passcode/create-your-passcode';
import EnterPasscodeTask from '../generic/enter-passcode/enter-passcode';
import IntroToYourRoleTask from '../generic/intro-to-your-role/intro-to-your-role';
import ManualKeyRotationTask from "../generic/manual-key-rotation/manual-key-rotation";
import AcceptCredentialsTask from "../generic/accept-credentials/accept-credentials";
import SignXBRLReport from "../generic/sign-xbrl-report/sign-xbrl-report"
import VideoCallTask from "../generic/video-call/video-call";

const tasks = {
    'create-passcode': [
        new CreatePasscodeTask({label: 'Create Your Passcode'}),
        new EnterPasscodeTask({label: 'Enter Your Passcode'}),
    ],
    'create-identifier': [
        new IntroToYourRoleTask({label: 'Intro to Your Role'}),
        new CreateYourAIDTask({label: 'Create Your AID'}),
    ],
    'main': [
        new VideoCallTask({
            initiate: true,
            label: 'Accept Credential',
            oneToOne: true,
            acceptCredential: true,
            next: new AcceptCredentialsTask({ label: 'Accept Credential' }),
        }),
        new ManualKeyRotationTask({label: 'Perform Manual Key Rotation'}),
        new SignXBRLReport({label: 'Sign XBRL Report'}),
    ],
};

module.exports = tasks;
