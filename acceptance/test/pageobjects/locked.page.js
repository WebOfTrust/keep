const Page = require('./page');
const CreatePasscodeTask = require('./create-passcode.task');
const EnterPasscodeTask = require('./enter-passcode.task');

//open launch launch enter

class LockedPage extends Page {
  get enterPasscodeTask() {
    return $('#enter-passcode');
  }

  get createPasscodeTask() {
    return $('#create-passcode');
  }

  async launchCreateTask() {
    await this.createPasscodeTask.click();
    return CreatePasscodeTask;
  }

  async launchEnterTask() {
    await this.enterPasscodeTask.click();
    return EnterPasscodeTask;
  }

  open(port) {
    return super.open(port);
  }
}

module.exports = new LockedPage();
