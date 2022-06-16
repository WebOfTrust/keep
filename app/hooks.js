const {notarize} = require('electron-notarize');
const {signAsync} = require('@electron/osx-sign')

module.exports = {
    postPackage: async () => {
        console.log("\nstart sign");
        await signAsync({
            app: 'out/keep-darwin-arm64/foo.app/',
            entitlements: "./entitlements.plist",
            'entitlements-inherit': "./entitlements.plist",
            'signature-flags': "library",
            'hardened-runtime': true,
            identity: 'Developer ID Application: Kevin Griffin (WHU7A4EQ74)'
        }).then(() => {
            console.log("\nsigning done");
        }).catch((err) => {
            console.log("\nnotarize err", err);
        });
        console.log("\nstart notarize");
        await notarize({
            appBundleId: "org.gleif.keep",
            appPath: "out/keep-darwin-arm64/keep.app/",
            appleId: process.env.APPLE_ID,
            appleIdPassword: process.env.APPLE_ID_PASSWORD,
        }).then(() => {
            console.log("\nnotarize done");
        }).catch((err) => {
            console.log("\nnotarize err", err);
        });
    }
};