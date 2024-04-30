
from setuptools import setup, find_packages

setup(
    name='ccip-read-dns-gateway-python',
    version='0.1.0',
    packages=find_packages(),
    scripts=['app.py', 'index.py', 'worker.py', 'e2e_test.py', 'server_test.py'],
    description='Python version of CCIP Read DNS Gateway',
    author='Dot',
    author_email='dot@example.com',
    url='https://example.com/project',
    license='MIT',
)
