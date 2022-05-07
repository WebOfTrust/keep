DIR = $(shell pwd)

clean:
	yarn rm-build
	rm -rf ward/.parcel-* ward/build-* ward/dist app/ward ward/debug.json ward/config.json

prod-root-gar: clean
	yarn
	yarn package:root-gar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start

prod-external-gar: clean
ifdef debug
	echo "true" >> ward/debug.json;
else
	echo "false" >> ward/debug.json;
endif
	yarn
	yarn package:external-gar

	python convert_env.py .env.lead-external-gar >> ward/config.json

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward;
ifdef start
	cd $(DIR)/app; \
	yarn start;
endif

start-prod-external-gar: clean prod-external-gar
	cd $(DIR)/app; \
	yarn start;

package-prod-external-gar: clean prod-external-gar
	cd $(DIR)/app; \
	yarn make

prod-internal-gar: clean
	yarn
	yarn package:internal-gar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start

prod-qar: clean
	yarn
	yarn package:qar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start

prod-lar: clean
	yarn
	yarn package:lar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start