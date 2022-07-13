const LockedPage = require('../pageobjects/locked.page');

describe('Launching a new Keep', () => {
    it('should create a passcode', async () => {
        const passcode = 'DoB2-6Fj4x-9Lbo-AFWJr-a17O';
        await LockedPage.open(5521);
        const CreatePasscodeTask = await LockedPage.launchCreateTask();

        await expect(CreatePasscodeTask.welcome).toBeExisting();
        await CreatePasscodeTask.continue();
        await expect(CreatePasscodeTask.generatePasscode).toBeExisting();

        await CreatePasscodeTask.generateNewPasscode();
        await expect(await CreatePasscodeTask.passcode).toHaveLength(26)

        await CreatePasscodeTask.setPasscode(passcode);
        await expect(await CreatePasscodeTask.passcode).toEqual(passcode);

        await CreatePasscodeTask.continue();
        await expect(CreatePasscodeTask.passcodeAlert).toBeExisting();
        await CreatePasscodeTask.passcodeSaved();

        await CreatePasscodeTask.setConfirmPasscode(passcode);
        await expect(await CreatePasscodeTask.confirmPasscode).toEqual(passcode);
        await CreatePasscodeTask.submit()

        await expect(await LockedPage.enterPasscodeTask).toBeExisting();
        const EnterPassCodeTask = await LockedPage.launchEnterTask();

        await expect(await EnterPassCodeTask.welcomeBack).toBeExisting();
        await EnterPassCodeTask.setPasscode(passcode);

        const DashboardPage = await EnterPassCodeTask.login();
        await expect(DashboardPage.about).toBeExisting();
    });
});