#!/usr/bin/python
import os
import sys

sys.path.insert(0,"/var/www/lolable-api-staging")
os.chdir("/var/www/lolable-api-staging")
from app import app as application