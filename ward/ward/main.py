# -*- encoding: utf-8 -*-
import json
import logging
import os
import os.path
import re
import sys
from random import SystemRandom

import falcon
from hio.base import doing
from hio.core import http
from hio.help import ogling
from rstr import Rstr


class Ward:
    """ Bootsrapping Keep """

    def __init__(self, app=None) -> None:
        super().__init__()

        self.packaged = getattr(sys, 'frozen', False) and (getattr(sys, '_MEIPASS', '') != '')

        self.uiPath = os.path.join(sys._MEIPASS, 'ui', "") if self.packaged else ''
        self.headDir = os.path.join(sys._MEIPASS, "") if self.packaged else ''
        self.ogler = None
        self.re = re.compile('[a-zA-Z0-9]{22}')

        if sys.platform == 'win32':
            self.ogler = ogling.Ogler(name="keep",
                                      level=logging.DEBUG,
                                      clear=True,
                                      syslogged=False,
                                      filed=self.packaged,
                                      consoled=(not self.packaged))

        self.app = app if app is not None else falcon.App()

        if self.uiPath is not None:
            sink = http.serving.StaticSink(staticDirPath=self.uiPath)
            self.app.add_sink(sink, prefix=sink.DefaultStaticSinkBasePath)

        self.app.add_route('/passcode', self, suffix="passcode")
        self.app.add_route('/habery', self, suffix="habery")

        self.server = http.Server(port=5678, app=self.app)
        self.httpServerDoer = http.ServerDoer(server=self.server)

    def start(self):
        """ launches doist with http doer """
        doers = [self.httpServerDoer]
        tock = 0.03125
        doist = doing.Doist(limit=0.0, tock=tock, real=True)
        doist.do(doers=doers)

    def on_post_passcode(self, req, resp):
        """ Returns generated 22 character passcode """
        rs = Rstr(SystemRandom())

        resp.media = rs.xeger(self.re)

    def on_post_habery(self, req, resp):
        """ Initializes KERI Habery """
        body = json.loads(req.media)

        if not self.re.match(body.get('passcode')):
            resp.status = falcon.HTTP_BAD_REQUEST
            return


def main():
    ward = Ward()
    ward.start()


if __name__ == '__main__':
    main()
