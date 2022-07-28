const Page = require('./page');
const CreateYourAIDTask = require('./create-your-aid.task');

class DashboardPage extends Page {
  get about() {
    return $('#about-your-tasks');
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
