#Ward 

Wrapper around a KERI instance providing the KERI API and KIWI UI.

## Development

```shell
❯ cd ward
❯ python3 -m venv venv
❯ source venv/bin/activate
❯ pip install -r requirements.txt
❯ pyinstaller ward.spec --clean --noconfirm -F
```

## Run bundle

```shell
❯ ./dist/ward/ward
```