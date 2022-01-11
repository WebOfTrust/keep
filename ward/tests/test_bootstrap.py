import json
import sys

import falcon
import pytest
from falcon import testing
from ward.main import Ward


@pytest.fixture()
def client():
    app = falcon.App()
    ward = Ward(app=app)
    return testing.TestClient(app)


def test_base_ward_initialization():
    ward = Ward()

    assert ward.packaged is False
    assert ward.uiPath == ''
    assert ward.headDir == ''
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


def test_on_post_identifier_witness_config(client):
    happy = dict(
        icount=1,
        ncount=1,
        isith=1,
        nsith=1,
        alias='bob'
    )

    errWitnessList = dict(
        witnesses=[]
    ) | happy

    resp = client.simulate_post('/identifier', json=json.dumps(errWitnessList))
    assert resp is not None
    assert resp.status == falcon.HTTP_BAD_REQUEST

    witnessList = dict(
        witnesses=['will']
    ) | happy

    resp = client.simulate_post('/identifier', json=json.dumps(witnessList))
    assert resp is not None
    assert resp.status == falcon.HTTP_OK


def test_on_post_identifier_n_config(client):
    happy = dict(
        icount=1,
        isith=1,
        alias='bob',
        witnesses=['wil']
    )

    badN = dict(
        ncount=1,
        nsith=2
    ) | happy

    resp = client.simulate_post('/identifier', json=json.dumps(badN))
    assert resp is not None
    assert resp.status == falcon.HTTP_BAD_REQUEST

    n = dict(
        ncount=2,
        nsith=2
    ) | happy

    resp = client.simulate_post('/identifier', json=json.dumps(n))
    assert resp is not None
    assert resp.status == falcon.HTTP_OK


def test_on_post_identifier_i_config(client):
    happy = dict(
        ncount=1,
        nsith=1,
        alias='bob',
        witnesses=['wil']
    )

    badI = dict(
        icount=1,
        isith=2
    ) | happy

    resp = client.simulate_post('/identifier', json=json.dumps(badI))
    assert resp is not None
    assert resp.status == falcon.HTTP_BAD_REQUEST

    i = dict(
        icount=2,
        isith=2
    ) | happy

    resp = client.simulate_post('/identifier', json=json.dumps(i))
    assert resp is not None
    assert resp.status == falcon.HTTP_OK


def test_on_post_identifier_alias(client):
    missingAlias = dict(
        icount=1,
        ncount=1,
        isith=1,
        nsith=1,
        witnesses=['wil']
    )

    resp = client.simulate_post('/identifier', json=json.dumps(missingAlias))
    assert resp is not None
    assert resp.status == falcon.HTTP_BAD_REQUEST

    happy = missingAlias | dict(
        alias='bob'
    )

    resp = client.simulate_post('/identifier', json=json.dumps(happy))
    assert resp is not None
    assert resp.status == falcon.HTTP_OK
