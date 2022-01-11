# Keep

Electron based application for managing KERI identifiers.

![example workflow](https://github.com/WebOfTrust/keep/actions/workflows/build.yaml/badge.svg)

## Architecture

Electron app wrapping a python app that serves the API and UI.

### Running locally

Run the UI from the top level dir

```shell
❯ yarn install
❯ yarn start
```

Run the backend 

```shell
❯ cd ward
❯ source venv/bin/activate
❯ pip install -r requirements.txt
❯ python ward/main.py
```


### Running package

Build UI

```shell
❯ yarn install
❯ yarn build
```

bundle the backend

```shell
❯ cd ward
❯ pyinstaller ward.spec --clean --noconfirm --onefile
```

Run electron app

```shell
❯ yarn electron
```
