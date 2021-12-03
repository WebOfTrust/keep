import os.path
import sys
import daemonocle
from typing import NamedTuple

from keri.app.cli.commands import status, incept
from keri.app.cli.commands.agent import start
from keri.app.cli.commands.vc.registry import incept as rincept

name = 'qvi'


class StatusArgs(NamedTuple):
    name: str = name
    verbose: str = False


class RegistryArgs(NamedTuple):
    name: str = name
    registry_name: str = name
    establishment_only: bool = False
    no_backers: bool = True
    backers: list[str] = []


class InceptArgs(NamedTuple):
    name: str = name
    salt: str = "issuer0000000001"
    wits: list[str] = ["BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo",
                       "BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw",
                       "Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c"]
    transferable: bool = True
    icount: int = 1
    ncount: int = 1
    isith: int = 1
    nsith: int = 1
    file: str = None
    proto: str = "http"


class AgentArgs(NamedTuple):
    name: str = name
    controller: str = 'E4Zq5dxbnWKq5K-Bssn4g_qhBbSwNSI2MH4QYnkEUFDM'
    tcp: int = 5621
    admin_http_port: int = 5623
    insecure: bool = True
    path: str = os.path.join(sys._MEIPASS, 'ui')


def main():
    if status.handler(args=StatusArgs()) == -1:
        incept.handler(args=InceptArgs())
        rincept.registryIncept(args=RegistryArgs())

    daemon = daemonocle.Daemon(
        worker=__launch,
        pid_file=os.path.join(sys._MEIPASS, 'ward.pid'),
    )
    daemon.do_action('start')


def __launch():
    aargs = AgentArgs()
    print(aargs.path)
    start.launch(args=aargs)


if __name__ == '__main__':
    main()
