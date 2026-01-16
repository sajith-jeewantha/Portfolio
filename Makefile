venv:
	python3 -m venv .venv
	echo "Please run 'source .venv/bin/activate'"
dev:
	pip install -r portfolio/requirements.txt
	pip install -r requirements-development.txt

tflint:
	tflint terraform/
