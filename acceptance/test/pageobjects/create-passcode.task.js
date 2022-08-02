const Page = require('./page');

class CreatePasscodeTask extends Page {
  get welcome() {
    return $('#welcome');
  }

  get generatePasscode() {
    return $('#generate-passcode');
  }

  get passcode() {
    return $('#passcode').getValue();
  }

  get passcodeAlert() {
    return $('#wait');
  }

  get btnContinue() {
    return $('#continue');
  }

  get btnGenerate() {
    return $('#generate');
  }

  get confirmPasscode() {
    return $('#confirm-passcode').getValue();
  }

  async continue() {
    await this.btnContinue.click();
  }

  async generateNewPasscode() {
    await this.btnGenerate.click();
  }

  async setPasscode(passcode) {
    const p = await $('#passcode');
    await p.clearValue();
    await p.setValue(passcode);
  }

  async passcodeSaved() {
    await $('#passcode-saved').click();
  }

  async setConfirmPasscode(passcode) {
    const pc = await $('#confirm-passcode');
    await pc.doubleClick();
    await browser.keys('Delete');
    await pc.setValue(passcode);
  }

  async submit() {
    await $('#initialize').click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new CreatePasscodeTask();
