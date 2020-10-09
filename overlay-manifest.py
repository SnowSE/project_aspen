#!/usr/bin/env python3
import os
import subprocess
import sys
import tempfile
import time
import json
from datetime import datetime
from jinja2 import Template

class HealthError(Exception):
    """ This gets thrown if there is something wrong with the health of a service."""

def get_options():
    options = {}
    on_flag = ""
    for arg in sys.argv:
        if on_flag:
            options[on_flag] = arg
            on_flag = ""
            continue
        if arg.startswith('--'):
            on_flag = arg.lstrip('-')
            continue
        if arg == '-o':
            on_flag = '-overlay-'
    return options

def makeManifest(overlay):
    cmd = "cat k8s/overlays/{0}/*.yml".format(overlay)
    manifest = subprocess.getoutput(cmd)
    return manifest

def get_yaml(options):
    overlay = options.pop('-overlay-', '')
    mapname = "k8s/overlays/{0}/{0}.map".format(overlay)
    s = makeManifest(overlay)
    options = {}
    with open(mapname, 'r') as f:
        for line in f.readlines():
            (k,v) = line.strip().split('=')
            options[k] = v
    template = Template(s)
    final = template.render(**options)
    return final

def main():
    options = get_options()
    output = get_yaml(options)
    print(output)

if __name__ == '__main__': main()
