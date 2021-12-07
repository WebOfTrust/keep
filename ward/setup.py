from glob import glob
from os.path import basename
from os.path import splitext
from setuptools import find_packages, setup

setup(
    name='keep',
    version='0.0.1',
    url='',
    license='Apache2',
    author='kgriffin',
    author_email='kevin.griffin@gleif.org',
    description='',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
    python_requires='>=3.9.7',
)
