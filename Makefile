DIR = $(shell pwd)
VER = $(shell git rev-parse --short HEAD)
clean:
	rm -rf .cache/ .parcel-cache/ node_modules/ .webcache/ app/static app/dist


root-gar: clean
ifdef debug
	echo "true" > app/debug.json;
else
	echo "false" > app/debug.json;
endif
	python bump_build.py .env.root-gar-local $(VER)
	yarn
	yarn package:root-gar
	python convert_env.py .env.root-gar-local > app/config.json
	cd $(DIR)/app; \
	npx json -I -f package.json -e "this.sha=\"$(VER)\""; \
	yarn;

run-root-gar: root-gar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-mac-root-gar: root-gar
	cd $(DIR)/app; \
	yarn; \
	APP_ID=$(APP_ID) APPLE_ID=$(APPLE_ID) APPLE_ID_PASSWORD=$(APPLE_APP_PASSWORD) yarn dist;

person: clean
ifdef debug
	echo "true" > app/debug.json;
else
	echo "false" > app/debug.json;
endif
	python bump_build.py .env.person $(VER)
	yarn
	yarn package:person
	python convert_env.py .env.person > app/config.json
	cd $(DIR)/app; \
	npx json -I -f package.json -e "this.sha=\"$(VER)\""; \
	yarn;

pkg-mac-person: person
	cd $(DIR)/app; \
	yarn; \
	APP_ID=$(APP_ID) APPLE_ID=$(APPLE_ID) APPLE_ID_PASSWORD=$(APPLE_APP_PASSWORD) yarn dist;

root-gar-zero: clean
ifdef debug
	echo "true" > app/debug.json;
else
	echo "false" > app/debug.json;
endif
	yarn
	yarn package:root-gar-zero
	python3 convert_env.py .env.root-gar-local-zero > app/config.json
	cd $(DIR)/app; \
	LOCAL=true yarn;

root-gar-one: clean
ifdef debug
	echo "true" > app/debug.json;
else
	echo "false" > app/debug.json;
endif
	yarn
	yarn package:root-gar-one
	python3 convert_env.py .env.root-gar-local-one > app/config.json
	cd $(DIR)/app; \
	LOCAL=true yarn;

root-gar-two: clean
ifdef debug
	echo "true" > app/debug.json;
else
	echo "false" > app/debug.json;
endif
	yarn
	yarn package:root-gar-two
	python3 convert_env.py .env.root-gar-local-two > app/config.json
	cd $(DIR)/app; \
	LOCAL=true yarn;

pkg-mac-root-gar-zero: root-gar-zero
	cd $(DIR)/app; \
	yarn; \
	LOCAL=true yarn dist;

pkg-mac-root-gar-one: root-gar-one
	cd $(DIR)/app; \
	yarn; \
	LOCAL=true yarn dist;

pkg-mac-root-gar-two: root-gar-two
	cd $(DIR)/app; \
	yarn; \
	LOCAL=true yarn dist;
