const {notarize} = require('electron-notarize');
const {signAsync} = require('@electron/osx-sign')

module.exports = {
    postPackage: async () => {
        console.log("\nstart sign");
        await signAsync({
            app: 'out/keep-darwin-arm64/keep.app/',
            entitlements: './entitlements.plist',
            hardenedRuntime: false,
            gatekeeperAssess: false,
            identity: 'Developer ID Application: Kevin Griffin (WHU7A4EQ74)'
        }).then(() => {
            console.log("\nsigning done");
        }).catch((err) => {
            console.log("\nnoterize err", err);
        });
        console.log("\nstart noterize");
        await notarize({
            appBundleId: "org.gleif.keep",
            appPath: "out/keep-darwin-arm64/keep.app/",
            appleId: process.env.APPLE_ID,
            appleIdPassword: process.env.APPLE_ID_PASSWORD,
        }).then(() => {
            console.log("\nnoterize done");
        }).catch((err) => {
            console.log("\nnoterize err", err);
        });
    }
};