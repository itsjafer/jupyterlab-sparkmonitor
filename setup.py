import json
from pathlib import Path

from jupyter_packaging import wrap_installers, npm_builder, get_data_files
from setuptools import find_packages, setup


HERE = Path(__file__).parent.resolve()

name = "jupyterlab_sparkmonitor"

lab_path = HERE / "sparkmonitor" / "labextension"

ensured_targets = [str(lab_path / "package.json"), str(lab_path / "static/style.js")]

labext_name = "jupyterlab-sparkmonitor"

data_file_spec = [
    (f"share/jupyter/labextensions/jupyterlab-sparkmonitor", str(lab_path), "**"),
    (f"share/jupyter/labextensions/jupyterlab-sparkmonitor", str(HERE), "install.json"),
    (
        "etc/jupyter/jupyter_server_config.d",
        "jupyter-config",
        "jupyterlab_sparkmonitor.json",
    ),
]


post_develop = npm_builder(build_cmd="build", source_dir="js", build_dir=lab_path)

cmdclass = wrap_installers(post_develop=post_develop, ensured_targets=ensured_targets)

long_description = (HERE / "README.md").read_text()

pkg_json = json.loads((HERE / "package.json").read_bytes())

setup(
    name=name,
    version=pkg_json["version"],
    description="Spark Monitor Extension for Jupyter Lab",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author=pkg_json["author"]["name"],
    author_email=pkg_json["author"]["email"],
    maintainer=pkg_json["maintainers"][0]["name"],
    maintainer_email=pkg_json["maintainers"][0]["email"],
    url=pkg_json["homepage"],
    include_package_data=True,
    cmdclass=cmdclass,
    packages=find_packages(),
    license=pkg_json["license"],
    zip_safe=False,
    python_requires=">=3.6",
    data_files=get_data_files(data_file_spec),
    install_requires=[
        "bs4",
        "tornado",
        "jupyterlab~=3.0",
        "jupyter_packaging~=0.9,<2",
    ],
    extras_require={
      "pyspark": ["pyspark>3.0.0"]
    },
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab", "JupyterLab3"],
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Framework :: Jupyter",
    ],
)
