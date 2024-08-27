import csv
import datetime
import math
import os
import platform
import re
import signal
import socket
import sys
import threading
import time
import requests
import json

__version__ = '2.1.4b1'

class SpeedtestException(Exception):
    pass

class SpeedtestResults:
    def __init__(self, download=0, upload=0, ping=0, server=None):
        self.download = download
        self.upload = upload
        self.ping = ping
        self.server = server or {}

    def dict(self):
        return {
            'download': self.download,
            'upload': self.upload,
            'ping': self.ping,
            'server': self.server,
            'timestamp': datetime.datetime.utcnow().isoformat() + 'Z'
        }

    def json(self):
        return json.dumps(self.dict(), indent=4)

class Speedtest:
    def __init__(self):
        self.results = SpeedtestResults()

    def get_best_server(self):
        pass

    def download(self):
        pass

    def upload(self):
        pass

def ctrl_c(signum, frame):
    print("\nTerminating...")
    sys.exit(0)

def main():
    signal.signal(signal.SIGINT, ctrl_c)
    speedtest = Speedtest()
    speedtest.get_best_server()
    speedtest.download()
    speedtest.upload()
    print(speedtest.results.json())

if __name__ == '__main__':
    main()