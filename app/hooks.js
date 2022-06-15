const {notarize} = require('electron-notarize');
const {signAsync} = require('@electron/osx-sign')

module.exports = {
    postPackage: () => {
        console.log("pre make");
        signAsync({
            app: 'out/keep-darwin-arm64/keep.app/',
            entitlements: './entitlements.plist',
            hardenedRuntime: true,
            gatekeeperAssess: false,
            identity: 'Developer ID Application: Kevin Griffin (WHU7A4EQ74)'
        }).then(function () {
            console.log("done signing");
            notarize({
                appBundleId: "org.gleif.keep",
                appPath: "out/keep-darwin-arm64/keep.app/",
                appleId: process.env.APPLE_ID,
                appleIdPassword: process.env.APPLE_ID_PASSWORD,
            }).then(() => {
                console.log("noterize done");
            }).catch((err) => {
                console.log("noterize err", err);
            });
        }).catch(function (err) {
            // Handle the error
            console.log("signing error", err)
        });
    }
};