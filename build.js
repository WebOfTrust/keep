const { execSync } = require("child_process");
const fs = require('fs');
const fse = require('fs-extra');
const argv = require('minimist')(process.argv.slice(2));
const {when} = require("pattern-matching-js")

parse(argv);

function parse(argv) {
    console.log(argv);

    if (argv["_"].length > 1) {
        console.log("too many args");
        process.exit(1);
    }

    const command = argv["_"][0];

    delete argv._;

    when(command)
        .case("qar", () => qar(argv));
}

function convertEnv(args) {
    let en;
    if ("lead" in args) {
        en = './.env.lead-qar';
    } else {
        en = './.env.qar';
    }

    let data;
    try {
        data = fs.readFileSync(en, 'utf8');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    let envjson = {};
    data.split(/\r?\n/).forEach((line) => {
        const l = line.split("=");
        envjson[l[0]] = l[1];
    });

    fs.writeFileSync("ward/config.json", JSON.stringify(envjson));
}

function qar(args) {
    clean();

    if ("debug" in args) {
        fs.writeFileSync("ward/debug.json", "true");
    } else {
        fs.writeFileSync("ward/debug.json", "false");
    }

    const lead = args["lead"];
    execwrapper("yarn")

    convertEnv(args);
    execwrapper("mkdir -p ward/build-ui");
    
    const yarncmd = lead ? "yarn package:lead-qar": "yarn package:qar";
    execwrapper(yarncmd);

    process.chdir("ward");
    execwrapper("pip install -r requirements.txt --no-cache-dir");
    execwrapper("pyinstaller generic.spec --clean --noconfirm");

    process.chdir(__dirname);

    fse.copySync(__dirname+"/ward/dist/ward", __dirname+"/app/ward", { overwrite: true });

    process.chdir(__dirname+"/app");
    execwrapper("yarn");
    execwrapper(`yarn json -I -f package.json -e 'this.name="keep-lead-external"'`);
    execwrapper("yarn make");
    execwrapper(`yarn json -I -f package.json -e 'this.name="keep"'`);

    console.log("done");
}

function execwrapper(cmd) {
    execSync(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

function clean() {
    [".cache/",
        ".parcel-cache/",
        "ward/.parcel-*",
        "ward/build-*",
        "ward/dist",
        "app/ward",
        "ward/debug.json",
        "ward/config.json",
        "app/ward/keri",
        "app/out",
        "app/ward",
        "app/keep.log",
        "app/node_modules/",
        ".webcache/",].forEach((dir) => {
        fs.rmSync(dir, {recursive: true, force: true});
    })
}