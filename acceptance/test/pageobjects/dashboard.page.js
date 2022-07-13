const Page = require('./page');

class DashboardPage extends Page {

    get about () {
        return $('#about-your-tasks');
    }

    async lock() {

    }
}

module.exports = new DashboardPage();