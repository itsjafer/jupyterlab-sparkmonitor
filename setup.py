#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import unicode_literals

from setuptools import find_packages
from setuptools import setup
from os import path

with open('VERSION') as version_file:
    version = version_file.read().strip()

this_directory = path.abspath(path.dirname(__file__))
with open(path.join(this_directory, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(name='jupyterlab-sparkmonitor',
      version=version,
      description='Spark Monitor Extension for Jupyter Lab',
      long_description=long_description,
      long_description_content_type='text/markdown',
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
          'pyspark'
      ],
      )
