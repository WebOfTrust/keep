/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    */
    open (port) {
        return browser.url(`http://localhost:${port}`)
    }
}
