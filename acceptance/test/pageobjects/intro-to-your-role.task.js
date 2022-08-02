const Page = require('./page');

class IntroToYourRoleTask extends Page {
  get introHeader() {
    return $('#intro-header');
  }

  get btnContinue() {
    return $('#continue');
  }

  get btnStepsContinue() {
    return $('#steps-continue');
  }

  get stepsHeader() {
    return $('#steps-header');
  }
}

module.exports = new IntroToYourRoleTask();
