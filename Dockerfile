FROM jupyter/pyspark-notebook:bca04790b492
ARG VERSION

USER root
RUN chown -R jovyan:users /home/jovyan

# set up kernel extension
ADD .ipython ./.ipython
ENV IPYTHONDIR ./.ipython

COPY dist/jupyterlab_sparkmonitor-${VERSION}-py3-none-any.whl dist/

# install the extensions
RUN pip install --upgrade 'jupyterlab>=3'
RUN pip install "dist/jupyterlab_sparkmonitor-${VERSION}-py3-none-any.whl[pyspark]"

EXPOSE 8888

CMD jupyter lab --allow-root --ip=0.0.0.0 --no-browser
