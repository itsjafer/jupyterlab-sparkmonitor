FROM jupyter/pyspark-notebook:bca04790b492

USER root
RUN chown -R jovyan:users /home/jovyan

# set up kernel extension
ADD .ipython ./.ipython
ENV IPYTHONDIR ./.ipython

# install the extensions
RUN pip install --upgrade jupyterlab==2.2.0
RUN pip install jupyterlab-sparkmonitor==2.0.1
RUN jupyter labextension install jupyterlab_sparkmonitor@2.0.1 --minimize=False
RUN jupyter labextension enable jupyterlab_sparkmonitor
RUN jupyter serverextension enable --py sparkmonitor

EXPOSE 8888

CMD jupyter lab --allow-root --ip=0.0.0.0 --no-browser
