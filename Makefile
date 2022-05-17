DIR = $(shell pwd)

clean:
	rm -rf ward/.parcel-cache ward/build-ui ward/.parcel-cache-dev ward/build-ui-dev ward/.parcel-cache-dev-lead ward/build-ui-dev-lead
	rm -rf node_modules/ ward/.parcel-* ward/build-* ward/dist app/ward ward/debug.json ward/config.json app/ward/keri app/out app/ward app/keep.log

root-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
	yarn set-tasks:root-gar
ifdef lead
	yarn package:lead-root-gar
	python convert_env.py .env.lead-root-gar >> ward/config.json
else
	yarn package:root-gar
	python convert_env.py .env.root-gar >> ward/config.json
endif
	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;
	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

run-root-gar: clean root-gar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-root-gar: clean root-gar
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

external-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
	yarn set-tasks:external-gar
ifdef lead
	yarn package:lead-external-gar
	python convert_env.py .env.lead-external-gar >> ward/config.json
else
	yarn package:external-gar
	python convert_env.py .env.external-gar >> ward/config.json
endif
	cd $(DIR)/ward; \
	pip install -r requirements.txt --no-cache-dir; \
	pyinstaller generic.spec --clean --noconfirm;
	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

run-external-gar: clean external-gar
	cd $(DIR)/app; \
	yarn start;

pkg-external-gar: clean external-gar
	cd $(DIR)/app; \
	yarn;
ifdef lead
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-lead-external"';
else
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-external"';
endif
	cd $(DIR)/app; \
	yarn make; \
	yarn json -I -f package.json -e 'this.name="keep"';

internal-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
	yarn set-tasks:internal-gar
ifdef lead
	yarn package:lead-internal-gar
	python convert_env.py .env.lead-internal-gar >> ward/config.json
else
	yarn package:internal-gar
	python convert_env.py .env.internal-gar >> ward/config.json
endif
	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;
	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

run-internal-gar: clean internal-gar
	cd $(DIR)/app; \
	yarn start;

pkg-internal-gar: clean internal-gar
	cd $(DIR)/app; \
	yarn;
ifdef lead
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-lead-internal"';
else
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-internal"';
endif
	cd $(DIR)/app; \
	yarn make; \
	yarn json -I -f package.json -e 'this.name="keep"';

qar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
	yarn set-tasks:qar
ifdef lead
	yarn package:lead-qar
	python convert_env.py .env.lead-qar >> ward/config.json
else
	yarn package:qar
	python convert_env.py .env.qar >> ward/config.json
endif
	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;
	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

run-qar: clean qar
	cd $(DIR)/app; \
	yarn start;

pkg-qar: clean qar
	cd $(DIR)/app; \
	yarn;
ifdef lead
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-lead-qar"';
else
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-qar"';
endif
	cd $(DIR)/app; \
	yarn make; \
	yarn json -I -f package.json -e 'this.name="keep"';

lar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
	yarn set-tasks:lar
ifdef lead
	yarn package:lead-lar
	python convert_env.py .env.lead-lar >> ward/config.json
else
	yarn package:lar
	python convert_env.py .env.lar >> ward/config.json
endif
	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;
	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

run-lar: clean lar
	cd $(DIR)/app; \
	yarn start;

pkg-lar: clean lar
	cd $(DIR)/app; \
	yarn;
ifdef lead
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-lead-lar"';
else
	cd $(DIR)/app; \
	yarn json -I -f package.json -e 'this.name="keep-lar"';
endif
	cd $(DIR)/app; \
	yarn make; \
	yarn json -I -f package.json -e 'this.name="keep"';

tail-external:
	tail -f /Applications/keep-external.app/Contents/Resources/app/keep.log

tail-lead-external:
	tail -f /Applications/keep-lead-external.app/Contents/Resources/app/keep.log