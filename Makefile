DIR = $(shell pwd)

clean:
	yarn rm-build
	rm -rf node_modules/ ward/.parcel-* ward/build-* ward/dist app/ward ward/debug.json ward/config.json app/ward/keri app/out app/ward app/keep.log

root-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn

	yarn package:root-gar
	python convert_env.py .env.root-gar >> ward/config.json

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

external-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn

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
	yarn json -I -f package.json -e 'this.name="keep"'; \

internal-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn

	yarn package:internal-gar
	python convert_env.py .env.internal-gar >> ward/config.json

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

qar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn

	yarn package:qar
	python convert_env.py .env.qar >> ward/config.json

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

lar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn

	yarn package:lar
	python convert_env.py .env.lar >> ward/config.json

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

tail-external:
	tail -f /Applications/keep-external.app/Contents/Resources/app/keep.log

tail-lead-external:
	tail -f /Applications/keep-lead-external.app/Contents/Resources/app/keep.log