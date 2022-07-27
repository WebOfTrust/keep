const Page = require('./page');
const DashboardPage = require('./dashboard.page');

class EnterPasscodeTask extends Page {
  get welcomeBack() {
    return $('#welcome-back');
  }

  async setPasscode(passcode) {
    const p = await $('#passcode');
    await p.doubleClick();
    await browser.keys('Delete');
    await p.setValue(passcode);
  }

  async login() {
    await $('#login').click();
    return DashboardPage;
  }

  open() {
    return super.open('');
  }
}

module.exports = new EnterPasscodeTask();
