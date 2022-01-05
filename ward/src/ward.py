import logging
import os.path
import sys

from hio.help import ogling
from keri.app.cli.commands import bootstrap


def main():
    # check for habbery
    # load / 
    # initialize

    # daemon = daemonocle.Daemon(
    #     worker=__launch,
    #     pid_file=os.path.join(sys._MEIPASS, 'ward.pid'),
    # )
    # daemon.do_action('start')

    __launch()


def __launch():
    packaged = getattr(sys, 'frozen', False) and getattr(sys, 'MEIPASS', '')

    # disable syslog in hio if on windows
    ogler = None
    if sys.platform == 'win32':
        ogler = ogling.Ogler(name="keep", level=logging.DEBUG, clear=True, syslogged=False, filed=packaged,
                             consoled=(not packaged))

    path = os.path.join(sys._MEIPASS, 'ui') if packaged else "../ui"

    if packaged and sys._MEIPASS == '':
        print("darn")

    bootstrap.launch(path=path)


if __name__ == '__main__':
    main()
