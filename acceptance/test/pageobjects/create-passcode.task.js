const Page = require('./page');

class CreatePasscodeTask extends Page {

    open () {
        return super.open('');
    }
}

module.exports = new CreatePasscodeTask();