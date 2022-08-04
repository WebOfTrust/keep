DIR = $(shell pwd)

clean:
	rm -rf .cache/ .parcel-cache/ node_modules/ .webcache/

root-gar: clean
ifdef debug
	echo "true" >> app/debug.json;
else
	echo "false" >> app/debug.json;
endif
	yarn
ifdef lead
	yarn package:lead-root-gar
	python convert_env.py .env.lead-root-gar >> app/config.json
else
	yarn package:root-gar
	python convert_env.py .env.root-gar >> app/config.json
endif

run-root-gar: root-gar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-root-gar: root-gar
	cd $(DIR)/app; \
	yarn;
ifdef lead
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-lead-root"';
else
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-root"';
endif
	cd $(DIR)/app; \
	yarn make; \
	yarn json -I -f package.json -e 'this.name="keep"';
