import sys

import falcon
from falcon import testing
import pytest

from ward.bootstrap import Ward


@pytest.fixture()
def client():
    app = falcon.App()
    ward = Ward(app=app)
    return testing.TestClient(app)


def test_base_ward_initialization():
    ward = Ward()

    assert ward.packaged is False
    assert ward.uiPath is None
    assert ward.ogler is None
    assert ward.re is not None
    assert ward.app is not None
    assert ward.server is not None
    assert ward.httpServerDoer is not None


def test_ward_initialization_packaged(monkeypatch):
    monkeypatch.setattr(sys, 'frozen', True, raising=False)
    monkeypatch.setattr(sys, '_MEIPASS', '', raising=False)

    ward = Ward()

    assert ward.packaged is False

    monkeypatch.setattr(sys, 'frozen', False, raising=False)
    monkeypatch.setattr(sys, '_MEIPASS', '/tmp/foo', raising=False)

    ward = Ward()

    assert ward.packaged is False

    monkeypatch.setattr(sys, 'frozen', True, raising=False)
    monkeypatch.setattr(sys, '_MEIPASS', '/tmp/foo', raising=False)

    ward = Ward()

    assert ward.packaged is True
    assert ward.uiPath == '/tmp/foo/ui/'
    assert ward.headDir == '/tmp/foo/'


def test_ward_initialization_windows(monkeypatch):
    monkeypatch.setattr(sys, 'platform', 'win32', raising=False)

    ward = Ward()

    assert ward.ogler is not None


def test_on_post_passcode(client):
    resp = client.simulate_post('/passcode')

    assert resp is not None
    assert len(resp.json) == 22
    assert resp.status == falcon.HTTP_OK


def test_on_post_habery(client):
    body = '{"passcode": ""}'

    resp = client.simulate_post('/habery', json=body)

    assert resp is not None
    assert resp.status == falcon.HTTP_BAD_REQUEST

    body = '{"passcode": "4KQD9TAqPVseaNDaClAZua"}'
    resp = client.simulate_post('/habery', json=body)

    assert resp is not None
    assert resp.status == falcon.HTTP_OK
