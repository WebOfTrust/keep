const Page = require('./page');

class CreateYourAIDTask extends Page {
  get welcome() {
    return $('#welcome');
  }

  get btnSkip() {
    return $('#skip');
  }

  get btnContinue() {
    return $('#continue');
  }

  get creatingYourAID() {
    return $('#creating-your-aid');
  }

  get stepsToCreate() {
    return $('#steps-to-create');
  }

  get alias() {
    return $('#alias');
  }

  get reviewAlias() {
    return $('#review-alias');
  }

  get btnCreateAID() {
    return $('#create-aid');
  }

  async createAID() {
    await this.btnCreateAID.click();
  }
}

module.exports = new CreateYourAIDTask();
