# Keep

Electron based application for managing KERI identifiers.

![example workflow](https://github.com/WebOfTrust/keep/actions/workflows/build.yaml/badge.svg)

## Architecture

Keep bundles together several moving parts: 

* a JavaScript UI implemented in [MithrilJS](https://mithril.js.org)
* a Pyinstaller wrapper around the Python implementation fo KERI called `ward` which serves the UI
* an electron app that wraps the previous two

## Builds
    
Keep can be built for the various participants in the vLEI ecosystem:

* root-gar
* external-gar
* internal-gar
* qar
* lar

## Developing

Development builds can be run in two ways, packaged or unpackaged. Unpakcaged requires running your own KERIPy agent.

#### Unpackaged

```
yarn start:lead-external-gar
yarn start:-external-gar
```

#### Packaged    

Each build can be packaged with:

```
make root-gar    
make external-gar    
make internal-gar    
make qar-gar    
make lar-gar    
```

Running an instance of each can be done with:

```
make run-root-gar    
make run-external-gar    
make run-internal-gar    
make run-qar-gar    
make run-lar-gar    
```

To create a packaged version for current OS, (dmg or deb (maybe windows if your dare try)) can be done with:

```
make pkg-root-gar    
make pkg-external-gar    
make pkg-internal-gar    
make pkg-qar-gar    
make pkg-lar-gar    
```

Outputs are in `keep/app/out/make` and can be run directly.

#### Packaged with custom KERIPy    

Prior to any build or run step, if you have changes to KERIPy, you need to activate the venv in ward:

```
cd ward && source venv/bin/activate;    
```

Then navigate to your KERIPy checkout and run 

```
pip install -e .
```

to add an editable copy of KERIPy to Ward


### Debuging

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

the same goes for logging from KERIPy

```python
import sys
sys.stdout.write("foo")
sys.stdout.flush()
```

will be piped to a `app/keep.log`


