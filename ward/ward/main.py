# -*- encoding: utf-8 -*-
import argparse
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

    def start(self, args):
        if args.debug:
            sys.stdout.write(f"Booting set up {args}\n")
            sys.stdout.write(f"UI path {self.UiPath}\n")
            sys.stdout.write(f"HeadDirPath {self.HeadDirPath}\n")
            sys.stdout.flush()



        servery = booting.Servery(port=int(args.admin))
        doers = booting.setup(servery=servery,
                              controller="E59KmDbpjK0tRf9Rmc7OlueZVz7LB94DdD3cjQVvPcng",
                              configFile='demo-witness-oobis.json',
                              configDir=self.HeadDirPath,
                              insecure=True,
                              tcp=int(args.tcp),
                              adminHttpPort=int(args.admin),
                              path=self.UiPath,
                              headDirPath=self.HeadDirPath)

        directing.runController(doers=doers+[servery], expire=0.0)


def main():
    parser = argparse.ArgumentParser(description='Launch Ward')
    parser.add_argument('--tcp', default=5621, help='tcp port')
    parser.add_argument('--admin', default=5623, help='admin port')
    parser.add_argument('--debug', action='store_true', help='print debug messages')

    ward = Ward()
    ward.start(parser.parse_args())


if __name__ == '__main__':
    main()
