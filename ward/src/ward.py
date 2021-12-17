import os.path
import sys

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
    bootstrap.launch(path=os.path.join(sys._MEIPASS, 'ui'))


if __name__ == '__main__':
    main()
