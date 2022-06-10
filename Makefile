DIR = $(shell pwd)

clean:
	rm -rf .cache/ .parcel-cache/ node_modules/ ward/.parcel-* ward/build-* ward/dist app/ward ward/debug.json ward/config.json app/ward/keri app/out app/ward app/keep.log app/node_modules/ .webcache/

root-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
ifdef lead
	yarn package:lead-root-gar
	python convert_env.py .env.lead-root-gar >> ward/config.json
else
	yarn package:root-gar
	python convert_env.py .env.root-gar >> ward/config.json
endif
	cd $(DIR)/ward; \
#	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;
	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

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

external-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
ifdef lead

	python convert_env.py .env.lead-external-gar >> ward/config.json
else
	yarn package:external-gar
	python convert_env.py .env.external-gar >> ward/config.json
endif
	cd $(DIR)/ward; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;

run-external-gar: external-gar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-external-gar: external-gar
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

run-internal-gar: internal-gar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-internal-gar: internal-gar
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

run-qar: qar
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-qar: qar
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
	yarn; \
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

person: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
	yarn package:person
	python convert_env.py .env.person >> ward/config.json

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm; \
	cp -r $(DIR)/ward/dist/ward ./ward;

run-person: clean person
	cd $(DIR)/app; \
	yarn; \
	yarn start;

pkg-person: clean person
	cd $(DIR)/app; \
	yarn; \
	yarn json -I -f package.json -e 'this.name="keep-person"'; \
	yarn make; \
	yarn json -I -f package.json -e 'this.name="keep"';

tail-external:
	tail -f /Applications/keep-external.app/Contents/Resources/app/keep.log

tail-lead-external:
	tail -f /Applications/keep-lead-external.app/Contents/Resources/app/keep.log


all:
	make debug=true pkg-external-gar; mv app/out/make/keep-external-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-external-gar; mv app/out/make/keep-lead-external-1.0.2-arm64.dmg ~/
	make debug=true pkg-root-gar; mv app/out/make/keep-root-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-root-gar; mv app/out/make/keep-lead-root-1.0.2-arm64.dmg ~/
	make debug=true pkg-internal-gar; mv app/out/make/keep-internal-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-internal-gar; mv app/out/make/keep-lead-internal-1.0.2-arm64.dmg ~/
	make debug=true pkg-qar; mv app/out/make/keep-qar-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-qar; mv app/out/make/keep-lead-qar-1.0.2-arm64.dmg ~/
	make debug=true pkg-person; mv app/out/make/keep-person-1.0.2-arm64.dmg ~/