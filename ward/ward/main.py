# -*- encoding: utf-8 -*-
import os
import os.path
import sys

from keri.app import booting
from keri.app import directing


class Ward:
    UiPath = ""
    HeadDirPath = ""
    tcp = 5621
    admin = 5623

    def __init__(self) -> None:
        super().__init__()

        self.packaged = getattr(sys, 'frozen', False) and (getattr(sys, '_MEIPASS', '') != '')

        self.UiPath = os.path.join(sys._MEIPASS, 'ui', "") if self.packaged else None
        self.HeadDirPath = os.path.join(sys._MEIPASS, '', "") if self.packaged else None
        self.tcp = sys.argv[1] if len(sys.argv) >= 2 and len(sys.argv[1]) > 0 else 5621
        self.admin = sys.argv[2] if len(sys.argv) >= 3 and len(sys.argv[2]) > 0 else 5623

    def start(self):

        sys.stdout.write(str(self.tcp))
        sys.stdout.write(" ")
        sys.stdout.write(str(self.admin))
        sys.stdout.flush()

        doers = booting.setup(controller="",
                              configFile='demo-witness-oobis.json',
                              configDir=self.HeadDirPath,
                              insecure=True,
                              tcp=int(self.tcp),
                              adminHttpPort=int(self.admin),
                              path=self.UiPath,
                              headDirPath=self.HeadDirPath)

        directing.runController(doers=doers, expire=0.0)


def main():
    ward = Ward()
    ward.start()


if __name__ == '__main__':
    main()
