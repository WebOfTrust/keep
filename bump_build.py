#!/usr/bin/env python
# https://gist.github.com/GabLeRoux/d6b2c2f7a69ebcd8430ea59c9bcc62c0
import sys

try:
    dotenv = sys.argv[1]
except IndexError as e:
    dotenv = '.env'

with open(dotenv, 'r') as f:
    content = f.readlines()

    contentList = [x.strip().split('#')[0].split('=', 1) for x in content if '=' in x.split('#')[0]]
    contentDict = dict(contentList)
    print(sys.argv)
    contentDict['BUILD_SHA'] = sys.argv[2]

with open(dotenv, 'w') as f:
    for k, v in contentDict.items():
        f.write(f'{k}={v}\n')

    f.close()
