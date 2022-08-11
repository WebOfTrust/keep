DIR = $(shell pwd)

clean:
	rm -rf .cache/ .parcel-cache/ node_modules/ .webcache/ app/static app/dist

root-gar: clean
ifdef debug
	echo "true" > app/debug.json;
else
	echo "false" > app/debug.json;
endif
	yarn
	yarn package:root-gar
	python convert_env.py .env.root-gar > app/config.json
	cd $(DIR)/app; \
	yarn;

run-root-gar: root-gar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-root-gar: root-gar
	cd $(DIR)/app; \
	yarn; \
	APPLE_ID=$(APPLE_ID) APPLE_ID_PASSWORD=$(APPLE_APP_PASSWORD) yarn dist; \
