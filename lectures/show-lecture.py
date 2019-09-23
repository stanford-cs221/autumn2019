#!/usr/bin/env python

import os, sys
from os.path import join

path = os.path.dirname(sys.argv[1]) # path to file
javascript = os.path.basename(sys.argv[1])  # name of file
browser = sys.argv[2] if len(sys.argv) > 2 else 'google-chrome'

# Run with authentication to enable quizzes
auth = open(os.path.join(os.path.dirname(sys.argv[0]), '../authentication.txt')).read().strip()


url = 'file://' + join(os.getcwd(), path, 'index.html#include={}&auth={}'.format(javascript, auth))
cmd = '{} \'{}\''.format(browser, url)
print(cmd)
os.system(cmd)
