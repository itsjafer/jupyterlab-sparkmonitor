FROM jupyter/pyspark-notebook

USER root
RUN chown -R jovyan:users /home/jovyan

# set up kernel extension
ADD .ipython ./.ipython
ENV IPYTHONDIR ./.ipython

# install the extensions
RUN pip install jupyterlab-sparkmonitor==1.0.5 jupyterlab==1.2.0 jupyter==1.0.0 
RUN jupyter labextension install jupyterlab_sparkmonitor@1.0.5
RUN jupyter labextension enable jupyterlab_sparkmonitor 
RUN jupyter serverextension enable --py sparkmonitor 

EXPOSE 8888

CMD jupyter lab --allow-root --ip=0.0.0.0 --no-browser
