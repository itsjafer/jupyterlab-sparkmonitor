#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import unicode_literals

from setuptools import find_packages
from setuptools import setup

with open('VERSION') as version_file:
    version = version_file.read().strip()

setup(name='jupyterlab-sparkmonitor',
      version=version,
      description='Spark Monitor Extension for Jupyter Lab',
      author='Krishnan R',
      author_email='krishnanr1997@gmail.com',
      maintainer='itsjafer',
      maintainer_email='itsjafer@gmail.com',
      url='https://github.com/itsjafer/jupyterlab-sparkmonitor',
      include_package_data=True,
      packages=find_packages(),
      zip_safe=False,
      install_requires=[
          'bs4',
          'tornado',

      ],
      )
