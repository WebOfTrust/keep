# Keep

Electron based application for managing KERI identifiers.

## Architecture

Bundled KERI application with exposed HTTP server wrapped in [pyoxidizer](https://pyoxidizer.readthedocs.io/) producing
OS specific executables. Electron "client" application running and invoking KERI "server"

## Development

Create new venv and install keri

```shell
❯ cd ward
❯ python3 -m venv venv
❯ source venv/bin/activate
❯ pip install keri
❯ pyoxidizer run
```

Will start `keri_bob` for now.

### Install dev dependencies

You'll need [Rust](https://www.rust-lang.org/learn/get-started) installed.

```shell
❯ python3 -m pip install pyoxidizer
❯ cargo install pyoxidizer
```

```shell
❯ yarn install
```

Start application

```shell
❯ npm run start
```

## Packaging

https://www.electronforge.io/

## Distribution
