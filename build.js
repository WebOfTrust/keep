const { execSync } = require("child_process");
const fs = require('fs');
const { PowerShell } = require('node-powershell');
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

function convertEnv(en) {
    try {
        let data = fs.readFileSync(en, 'utf8');

        let out = {};
        data.split(/\r?\n/).forEach((line) => {
            const l = line.split("=");
            out[l[0]] = l[1];
        });

        fs.writeFileSync("ward/config.json", JSON.stringify(out));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function qar(args) {
    clean();

    fs.writeFileSync("ward/debug.json", ("debug" in args).toString());

    execy("yarn")

    let en = "lead" in args ? '.env.lead-qar' : '.env.qar'
    convertEnv(en);

    let wardCache = "ward/build-ui";
    if (fs.existsSync(wardCache)) {
        fs.rmSync(wardCache, { recursive: true, force: true });
    }

    execy(`mkdir "ward/build-ui"`);

    // execwrapper(`$env:NODE_ENV="${en}"`);
    PowerShell.$`$env:NODE_ENV=${en}`;
    execy("yarn package:win");

    process.chdir("ward");
    execy("pip install -r requirements.txt --no-cache-dir");
    execy("pyinstaller generic.spec --clean --noconfirm");

    process.chdir(__dirname);

    fse.copySync(__dirname+"/ward/dist/ward", __dirname+"/app/ward", { overwrite: true });

    process.chdir(__dirname+"/app");
    execy("yarn");
    execy(`yarn json -I -f package.json -e 'this.name="keep-lead-qar"'`);
    execy("yarn dist");
    execy(`yarn json -I -f package.json -e 'this.name="keep"'`);

    console.log("done");
}

function execy(cmd) {
    execSync(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${ error.message }`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${ stderr }`);
            return;
        }
        console.log(`stdout: ${ stdout }`);
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
            fs.rmSync(dir, { recursive: true, force: true });
        })
}
