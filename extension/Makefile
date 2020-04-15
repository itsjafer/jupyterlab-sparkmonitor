IPYTHON_CONFIG := /nail/home/syedj/.ipython/profile_default

.PHONY: all
all: clean build develop

.PHONY: develop-notebook
develop-notebook:
	venv/bin/jupyter notebook

develop:
	. venv/bin/activate
	venv/bin/jupyter lab --watch
.PHONY: build
build: frontend-build
	venv/bin/pip install -I .
	venv/bin/jupyter labextension install
	venv/bin/jupyter labextension enable sparkmonitor
	venv/bin/jupyter serverextension enable --py sparkmonitor
	ipython profile create && echo "c.InteractiveShellApp.extensions.append('sparkmonitor.kernelextension')" >>  $(IPYTHON_CONFIG)/ipython_kernel_config.py

.PHONY: frontend-build
frontend-build:
	npm install

.PHONY: venv
venv: requirements-dev.txt tox.ini
	tox -e venv

.PHONY: clean
clean:
	rm -rf venv
	rm -rf node_modules
