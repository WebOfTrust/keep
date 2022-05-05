DIR = $(shell pwd)

clean:
	rm -rf ward/.parcel-* ward/build-* ward/dist app/ward ward/debug.json ward/ports.json

prod-root-gar: clean
	yarn
	yarn package:root-gar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm --onefile;

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

	cd $(DIR)/ward; \
	echo "{\"tcp\": 5621, \"admin\": 5623}" >> ports.json; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm --onefile;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start

prod-internal-gar: clean
	yarn
	yarn package:internal-gar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm --onefile;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start

prod-qar: clean
	yarn
	yarn package:qar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm --onefile;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start

prod-lar: clean
	yarn
	yarn package:lar

	cd $(DIR)/ward; \
	pip install -r requirements.txt; \
	pyinstaller generic.spec --clean --noconfirm --onefile;

	cd $(DIR)/app; \
	cp -r $(DIR)/ward/dist/ward ./ward; \
	yarn start