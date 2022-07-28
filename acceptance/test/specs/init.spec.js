const LockedPage = require('../pageobjects/locked.page');

describe('Launching a new Keep', () => {
  it('should create a passcode', async () => {
    const passcode = 'DoB2-6Fj4x-9Lbo-AFWJr-a17O';
    await LockedPage.open(5521);

    // CreatePasscodeTask

    const CreatePasscodeTask = await LockedPage.launchCreateTask();

    await expect(CreatePasscodeTask.welcome).toBeExisting();
    await CreatePasscodeTask.continue();
    await expect(CreatePasscodeTask.generatePasscode).toBeExisting();

    await CreatePasscodeTask.generateNewPasscode();
    await expect(await CreatePasscodeTask.passcode).toHaveLength(26);

    await CreatePasscodeTask.setPasscode(passcode);
    await expect(await CreatePasscodeTask.passcode).toEqual(passcode);

    await CreatePasscodeTask.continue();
    await expect(CreatePasscodeTask.passcodeAlert).toBeExisting();
    await CreatePasscodeTask.passcodeSaved();

    await CreatePasscodeTask.setConfirmPasscode(passcode);
    await expect(await CreatePasscodeTask.confirmPasscode).toEqual(passcode);
    await CreatePasscodeTask.submit();

    // EnterPassCodeTask

    await expect(await LockedPage.enterPasscodeTask).toBeExisting();
    const EnterPassCodeTask = await LockedPage.launchEnterTask();

    await expect(await EnterPassCodeTask.welcomeBack).toBeExisting();
    await EnterPassCodeTask.setPasscode(passcode);

    const DashboardPage = await EnterPassCodeTask.login();
    await expect(DashboardPage.about).toBeExisting();

    // CreateYourAIDTask

    const CreateYourAIDTask = await DashboardPage.launchCreateYourAIDTask();
    await expect(CreateYourAIDTask.welcome).toBeExisting();

    await CreateYourAIDTask.btnContinue.click();
    await expect(CreateYourAIDTask.creatingYourAID).toBeExisting();

    await CreateYourAIDTask.btnContinue.click();
    await expect(CreateYourAIDTask.stepsToCreate).toBeExisting();

    await CreateYourAIDTask.btnContinue.click();
    await expect(CreateYourAIDTask.alias).toBeExisting();

    await CreateYourAIDTask.alias.setValue('rootgar');

    await CreateYourAIDTask.btnContinue.click();
    await expect(CreateYourAIDTask.reviewAlias).toBeExisting();

    await CreateYourAIDTask.createAID();
    await expect(DashboardPage.createYourAIDTask).not.toBeExisting();
  });
});
