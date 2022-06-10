@echo off

SET DIR=$(shell pwd)

IF /I "%1"=="clean" GOTO clean
IF /I "%1"=="root-gar" GOTO root-gar
IF /I "%1"=="	yarn package" GOTO 	yarn package
IF /I "%1"=="run-root-gar" GOTO run-root-gar
IF /I "%1"=="pkg-root-gar" GOTO pkg-root-gar
IF /I "%1"=="external-gar" GOTO external-gar
IF /I "%1"=="run-external-gar" GOTO run-external-gar
IF /I "%1"=="pkg-external-gar" GOTO pkg-external-gar
IF /I "%1"=="internal-gar" GOTO internal-gar
IF /I "%1"=="run-internal-gar" GOTO run-internal-gar
IF /I "%1"=="pkg-internal-gar" GOTO pkg-internal-gar
IF /I "%1"=="qar" GOTO qar
IF /I "%1"=="run-qar" GOTO run-qar
IF /I "%1"=="pkg-qar" GOTO pkg-qar
IF /I "%1"=="lar" GOTO lar
IF /I "%1"=="run-lar" GOTO run-lar
IF /I "%1"=="pkg-lar" GOTO pkg-lar
IF /I "%1"=="person" GOTO person
IF /I "%1"=="run-person" GOTO run-person
IF /I "%1"=="pkg-person" GOTO pkg-person
IF /I "%1"=="tail-external" GOTO tail-external
IF /I "%1"=="tail-lead-external" GOTO tail-lead-external
IF /I "%1"=="all" GOTO all
IF /I "%1"=="" GOTO all
GOTO error

:clean
	DEL /Q .cache/ .parcel-cache/ node_modules/ ward/.parcel-* ward/build-* ward/dist app/ward ward/debug.json ward/config.json app/ward/keri app/out app/ward app/keep.log app/node_modules/ .webcache/ -rf
	GOTO :EOF

:root-gar
	CALL make.bat clean
	GOTO :EOF

:	yarn package
	CALL make.bat person
	python convert_env.py .env.person >> ward/config.json
	GOTO :EOF

:run-root-gar
	CALL make.bat root-gar
	PUSHD %DIR%/app; yarn; yarn start; && POPD
	GOTO :EOF

:pkg-root-gar
	CALL make.bat root-gar
	PUSHD %DIR%/app; yarn; && POPD
	GOTO :EOF

:external-gar
	CALL make.bat clean
	GOTO :EOF

:run-external-gar
	CALL make.bat external-gar
	PUSHD %DIR%/app; yarn start; && POPD
	GOTO :EOF

:pkg-external-gar
	CALL make.bat external-gar
	PUSHD %DIR%/app; yarn; && POPD
	GOTO :EOF

:internal-gar
	CALL make.bat clean
	GOTO :EOF

:run-internal-gar
	CALL make.bat internal-gar
	PUSHD %DIR%/app; yarn start; && POPD
	GOTO :EOF

:pkg-internal-gar
	CALL make.bat internal-gar
	PUSHD %DIR%/app; yarn; && POPD
	GOTO :EOF

:qar
	CALL make.bat clean
	GOTO :EOF

:run-qar
	CALL make.bat qar
	PUSHD %DIR%/app; yarn start; && POPD
	GOTO :EOF

:pkg-qar
	CALL make.bat qar
	PUSHD %DIR%/app; yarn; && POPD
	GOTO :EOF

:lar
	CALL make.bat clean
	GOTO :EOF

:run-lar
	CALL make.bat clean
	CALL make.bat lar
	PUSHD %DIR%/app; yarn start; && POPD
	GOTO :EOF

:pkg-lar
	CALL make.bat clean
	CALL make.bat lar
	PUSHD %DIR%/app; yarn; && POPD
	GOTO :EOF

:person
	CALL make.bat clean
	GOTO :EOF

:run-person
	CALL make.bat clean
	CALL make.bat person
	PUSHD %DIR%/app; yarn start; && POPD
	GOTO :EOF

:pkg-person
	CALL make.bat clean
	CALL make.bat person
	PUSHD %DIR%/app; yarn; yarn json -I -f package.json -e 'this.name="keep-person"'; yarn make; yarn json -I -f package.json -e 'this.name="keep"'; && POPD
	GOTO :EOF

:tail-external
	tail -f /Applications/keep-external.app/Contents/Resources/app/keep.log
	GOTO :EOF

:tail-lead-external
	tail -f /Applications/keep-lead-external.app/Contents/Resources/app/keep.log
	GOTO :EOF

:all
	make debug=true pkg-external-gar; mv app/out/make/keep-external-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-external-gar; mv app/out/make/keep-lead-external-1.0.2-arm64.dmg ~/
	make debug=true pkg-root-gar; mv app/out/make/keep-root-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-root-gar; mv app/out/make/keep-lead-root-1.0.2-arm64.dmg ~/
	make debug=true pkg-internal-gar; mv app/out/make/keep-internal-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-internal-gar; mv app/out/make/keep-lead-internal-1.0.2-arm64.dmg ~/
	make debug=true pkg-qar; mv app/out/make/keep-qar-1.0.2-arm64.dmg ~/
	make debug=true lead=true pkg-qar; mv app/out/make/keep-lead-qar-1.0.2-arm64.dmg ~/
	GOTO :EOF

:error
    IF "%1"=="" (
        ECHO make: *** No targets specified and no makefile found.  Stop.
    ) ELSE (
        ECHO make: *** No rule to make target '%1%'. Stop.
    )
    GOTO :EOF
