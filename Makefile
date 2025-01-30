# Simplified Makefile for managing docs environment

config: setup install

# Creating a virtual environment
setup:
	python3 -m venv .venv --prompt="docs"

# Installing the required packages
install:
	# sleep 1
	. .venv/bin/activate && python3 -m pip install --upgrade pip && python3 -m pip install -r requirements.txt

# Removing the virtual environment
remove:
	rm -rf .venv