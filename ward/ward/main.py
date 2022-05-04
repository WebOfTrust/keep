# -*- encoding: utf-8 -*-
import os
import os.path
import sys

from keri.app import booting
from keri.app import directing


class Ward:
    UiPath = ""
    HeadDirPath = ""

    def __init__(self) -> None:
        super().__init__()

        self.packaged = getattr(sys, 'frozen', False) and (getattr(sys, '_MEIPASS', '') != '')

        self.UiPath = os.path.join(sys._MEIPASS, 'ui', "") if self.packaged else None
        self.HeadDirPath = os.path.join(sys._MEIPASS, '', "") if self.packaged else None

    def start(self):
        doers = booting.setup(controller="", configFile='demo-witness-oobis.json',
                              configDir=self.HeadDirPath, insecure=True, tcp=5621, adminHttpPort=5623,
                              path=self.UiPath, headDirPath=self.HeadDirPath)

        directing.runController(doers=doers, expire=0.0)


def main():
    ward = Ward()
    ward.start()


if __name__ == '__main__':
    main()
