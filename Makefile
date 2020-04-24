.PHONY: all
all: clean build develop

.PHONY: venv
venv: requirements-dev.txt tox.ini
	tox -e venv
	. venv/bin/activate

.PHONY: frontend-build
frontend-build:
	venv/bin/jupyter labextension install .
	./node_modules/.bin/babel js/ -d lib/ --verbose
	./node_modules/.bin/flow-copy-source js lib

.PHONY: build
build: venv frontend-build
	ipython profile create --ipython-dir=.ipython
	echo "c.InteractiveShellApp.extensions.append('sparkmonitor.kernelextension')" >>  .ipython/profile_default/ipython_config.py
	venv/bin/pip install -I .
	venv/bin/jupyter labextension enable jupyterlab_sparkmonitor
	venv/bin/jupyter serverextension enable --py sparkmonitor

develop:
	IPYTHONDIR=.ipython venv/bin/jupyter lab --watch

.PHONY: clean
clean:
	rm -rf venv
	rm -rf node_modules
	rm -rf .ipython
	rm -rf lib

.PHONY: lint
lint: frontend-build
	./node_modules/.bin/eslint js/*.js --fix

itest:
	docker build --tag itsjafer/sparkmonitor .
	docker run -it -p 8888:8888 itsjafer/sparkmonitor
