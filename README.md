# Keep

Electron based application for managing KERI identifiers.

![example workflow](https://github.com/WebOfTrust/keep/actions/workflows/build.yaml/badge.svg)

## Architecture

Keep bundles together several moving parts:a JavaScript application implemented in (MithrilJS)[link] which is packaged and statically served 

    * A UI build using MithrilJS found at the root.
        |_ src
        |_ tasks
        |_ plop_templates
        |_ pages (style guide, not up to date)
    * A (Pyinstaller)[link] bundled wrapper around KERIPY. It contains a small Python application, which in turn configures and launches a REST API from KERIPY


by a (Falcon)[link] application, which also provides a REST API exposing the necessary functionality for the vLEI Ecosystem using (KERI)[link], and (ACDC)[link]
and the (KERIPY)[link] implementation.

A slim Node.JS wrapper (./app/index.js) launches a process referred to as 'Ward' (./ward/ward/main.py) which in turn configures and launches the Bootstrap process from KERIPY.

Ward is made executable by packaging it using PyInstaller (./ward/generic.spec)
