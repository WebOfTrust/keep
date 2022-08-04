DIR = $(shell pwd)

clean:
	rm -rf .cache/ .parcel-cache/ node_modules/ .webcache/

root-gar: clean
ifdef debug
	echo "true" > app/debug.json;
else
	echo "false" > app/debug.json;
endif
	yarn
	yarn package:root-gar
	python convert_env.py .env.root-gar > app/config.json

run-root-gar: root-gar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-root-gar: root-gar
	cd $(DIR)/app; \
	yarn; \
	yarn json -I -f package.json -e 'this.name="keep-root"'; \
	yarn make; \
	yarn json -I -f package.json -e 'this.name="keep"';
