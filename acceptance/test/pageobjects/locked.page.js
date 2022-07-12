const Page = require('./page');
const DashboardPage = require('./dashboard.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LockedPage extends Page {
    /**
     * define selectors using getter methods
     */
    get createPasscodeTask () {
        return $('#create-passcode');
    }

    get enterPasscodeTask () {
        return $('#enter-passcode');
    }

    get welcome () {
        return $('#welcome');
    }

    get btnContinue () {
        return $('#continue');
    }

    get generatePasscode() {
        return $('#generate-passcode');
    }

    get passcode() {
        return $('#passcode').getValue();
    }

    get btnGenerate () {
        return $('#generate');
    }

    get passcodeAlert() {
        return $('#wait');
    }

    get welcomeBack() {
        return $('#welcome-back');
    }

    get confirmPasscode() {
        return $('#confirm-passcode').getValue();
    }

    async launchCreateTask () {
        await this.createPasscodeTask.click();
    }

    async launchEnterTask () {
        await this.enterPasscodeTask.click();
    }

    async continue () {
        await this.btnContinue.click();
    }

    async generateNewPasscode () {
        await this.btnGenerate.click();
    }

    async initialize () {
        await $('#initialize').click();
    }

    async setPasscode(passcode) {
        const p = await $('#passcode');
        await p.doubleClick();
        await browser.keys("Delete");
        await p.setValue(passcode);
    }

    async passcodeSaved() {
        await $('#passcode-saved').click();
    }

    async setConfirmPasscode(passcode) {
        const pc = await $('#confirm-passcode');
        await pc.doubleClick();
        await browser.keys("Delete");
        await pc.setValue(passcode);
    }

    async login() {
        await $('#login').click();
        return DashboardPage;
    }

    open () {
        return super.open('');
    }
}

module.exports = new LockedPage();
