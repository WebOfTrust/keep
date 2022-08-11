# Keep

A task orientated application for managing [KERI AIDs](https://github.com/WebOfTrust/ietf-keri) in the [vLEI Ecosystem](https://www.gleif.org/en/lei-solutions/gleifs-digital-strategy-for-the-lei/introducing-the-verifiable-lei-vlei). 

Keep is designed to connect to an existing KERI agent. One macOS specific example is [Ward](https://github.com/weboftrust/ward)

[![example workflow](https://github.com/WebOfTrust/keep/actions/workflows/build.yaml/badge.svg)](https://github.com/WebOfTrust/keep/actions?query=workflow%3ABuild)


[![keri version](https://img.shields.io/badge/KERI-0.6.6-green.svg)](https://pypi.org/project/keri/)
[![node version](https://img.shields.io/badge/node-17.7.1-blue.svg)](https://nodejs.org/en/download/)
 
## Builds
    
Keep can be built/run for the various participants in the vLEI ecosystem:

* root-gar
* external-gar
* internal-gar
* qar
* lar
* person

## Developing

Development builds require a KERI agent to be running and can be configured to attempt to connect to a specific port.
Using the make commands `debug=true` will enable the dev tools console and specific to external-gar builds `lead=true` will provide the same functionality as the split yarn tasks.

```
yarn start:lead-root-gar
yarn start:root-gar
yarn start:lead-external-gar
yarn start:external-gar
yarn start:lead-internal-gar
yarn start:internal-gar
yarn start:lead-qar
yarn start:qar
yarn start:lead-lar
yarn start:lar
yarn start:person
```

#### Packaged    

The root-gar build can be packaged with:

```
make root-gar 
```

Running an instance can be done with:

```
make run-root-gar    
```
                                                 
To create a packaged version of the root-gar for macOS can be done with:

```
export APP_ID= ""; APPLE_ID=""; export APPLE_APP_PASSWORD=""; make pkg-mac-root-gar
```
                                                
`APP_ID` should match your Apple credentials
`APPLE_ID` needs to be a valid Apple Developer Account
`APPLE_APP_PASSWORD` needs to be a valid [App specific password](https://support.apple.com/en-us/HT204397)

The attribute `appID` is missing from `app/package.json` under the `build` property, this needs to be set specifically for an organization.

### Debugging

Basic logging can be performed from each Keep component:

From `src` (the main UI) with

```javascript
console.log
```

with `debug=true` set this will open dev tools and log to the console panel

From the electron wrapper (app/index.js)

```javascript
log.info
log.debug
log.error
```

will be piped to a `app/keep.log`

### Disclaimer

While the current Keep software is specific to the vLEI Ecosystem, it is designed to support generic task lists to support any ecosystem using [KERI](https://github.com/WebOfTrust/ietf-keri) and [ACDC](https://github.com/trustoverip/tswg-acdc-specification).

#### windows (untested)

 node .\build.js qar --pkg --debug --lead