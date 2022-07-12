const Page = require('./page');

class DashboardPage extends Page {

    get about () {
        return $('#about-your-tasks');
    }

    open () {
        return super.open('');
    }
}

module.exports = new DashboardPage();