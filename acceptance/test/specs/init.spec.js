const LockedPage = require('../pageobjects/locked.page');

describe('Launching a new Keep', () => {
  it('should create a regular rootgar', async () => {
    const passcode = 'DoB2-6Fj4x-9Lbo-AFWJr-a17O';
    await LockedPage.open(5521);

    // CreatePasscodeTask

    const CreatePasscodeTask = await LockedPage.launchCreateTask();

    expect(await CreatePasscodeTask.welcome).toBeExisting();

    await CreatePasscodeTask.continue();
    expect(await CreatePasscodeTask.generatePasscode).toBeExisting();

    await CreatePasscodeTask.generateNewPasscode();
    expect(await CreatePasscodeTask.passcode).toHaveLength(26);

    await CreatePasscodeTask.setPasscode(passcode);
    expect(await CreatePasscodeTask.passcode).toEqual(passcode);

    await CreatePasscodeTask.continue();
    expect(await CreatePasscodeTask.passcodeAlert).toBeExisting();
    await CreatePasscodeTask.passcodeSaved();

    await CreatePasscodeTask.setConfirmPasscode(passcode);
    expect(await CreatePasscodeTask.confirmPasscode).toEqual(passcode);
    await CreatePasscodeTask.submit();

    // EnterPassCodeTask

    expect(await LockedPage.enterPasscodeTask).toBeExisting();
    const EnterPassCodeTask = await LockedPage.launchEnterTask();

    expect(await EnterPassCodeTask.welcomeBack).toBeExisting();
    await EnterPassCodeTask.setPasscode(passcode);

    const DashboardPage = await EnterPassCodeTask.login();
    expect(await DashboardPage.about).toBeExisting();

    // IntroToYourRoleTask

    expect(await DashboardPage.introToYourRoleTask).toBeExisting();

    const IntroToYourRoleTask = await DashboardPage.launchIntroToYourRoleTask();
    expect(await IntroToYourRoleTask.introHeader).toBeExisting();

    await IntroToYourRoleTask.btnContinue.click();
    expect(await IntroToYourRoleTask.introHeader).not.toBeExisting();
    expect(await IntroToYourRoleTask.stepsHeader).toBeExisting();

    while (await IntroToYourRoleTask.btnStepsContinue.isExisting()) {
      await IntroToYourRoleTask.btnStepsContinue.click();
    }

    expect(await DashboardPage.about).toBeExisting();

    // CreateYourAIDTask

    expect(await DashboardPage.createYourAIDTask).toBeExisting();

    const CreateYourAIDTask = await DashboardPage.launchCreateYourAIDTask();
    expect(await CreateYourAIDTask.welcome).toBeExisting();

    await CreateYourAIDTask.btnContinue.click();
    expect(await CreateYourAIDTask.creatingYourAID).toBeExisting();

    await CreateYourAIDTask.btnContinue.click();
    expect(await CreateYourAIDTask.stepsToCreate).toBeExisting();

    await CreateYourAIDTask.btnContinue.click();
    expect(await CreateYourAIDTask.alias).toBeExisting();

    await CreateYourAIDTask.alias.setValue('rootgar2');

    await CreateYourAIDTask.btnContinue.click();
    expect(await CreateYourAIDTask.reviewAlias).toBeExisting();

    await CreateYourAIDTask.createAID();

    expect(await DashboardPage.introToYourRoleTask).not.toBeExisting();
    expect(await DashboardPage.createYourAIDTask).not.toBeExisting();
  });
});
