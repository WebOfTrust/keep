const Page = require('./page');
const CreateYourAIDTask = require('./create-your-aid.task');
const IntroToYourRoleTask = require('./intro-to-your-role.task');

class DashboardPage extends Page {
  get about() {
    return $('#about-your-tasks');
  }

  get introToYourRoleTask() {
    return $('#intro-to-your-role');
  }

  async launchIntroToYourRoleTask() {
    await this.introToYourRoleTask.click();
    return IntroToYourRoleTask;
  }

  get createYourAIDTask() {
    return $('#create-your-aid');
  }

  async launchCreateYourAIDTask() {
    await this.createYourAIDTask.click();
    return CreateYourAIDTask;
  }

  async lock() {}
}

module.exports = new DashboardPage();
