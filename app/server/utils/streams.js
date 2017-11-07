import fs from 'fs';
import {
    Readable
} from 'stream';
import path from 'path';

import through from 'through2';
import request from 'request';
import program from 'commander';
import csv from 'csvtojson';

// [start] io action
function inputOutput(filePath) {

    fs.createReadStream(filePath)
        .pipe(process.stdout)
        .on('error', console.error);
}
// [end] io action

// [start] uppercase action
function uppercase(filePath) {
    fs.createReadStream(filePath, {
            encoding: 'utf8'
        })
        .pipe(through((chunk, enc, cb) => {
            this.push(chunk.toString().toUpperCase());
            cb();
        }))
        .pipe(process.stdout)
        .on('error', console.error);
}
// [end] uppercase action

// [start] transform-file action
function transformFile(filePath) {
    const name = `${path.parse(filePath).name}.json`;
    const write = fs.createWriteStream(name);

    csv().fromFile(filePath)
        .pipe(write)
        .on('error', console.error);
}

function transform(filePath){

    csv().fromFile(filePath)
        .pipe(process.stdout)
        .on('error', console.error);
}
// [end] transform-file action

// [start] css-bundler action
async function cssBundler(folderPath, output) {

    const path = `${folderPath}/${output}.css`;

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

    const bundle = await new Promise(_getExternalCss);
    const css    = await _concatFiles(folderPath, 'css');
    const write  = fs.createWriteStream(path);
    _streamFromString(`${css}${bundle}`).pipe(write);
}

function _getExternalCss(resolve, reject) {
    const CSS_URL = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
    request(CSS_URL, (error, response, body) => {
        if (error) {
            reject(error);
        } else {
            resolve(body);
        }
    });
}

function _streamFromString(content = '') {
    let rs = new Readable();
    rs.push(content);
    rs.push(null);
    return rs;
}

async function _concatFiles(folderPath, extension = '.') {

    const _readFiles = folderPath => (resolve, reject) => {
        fs.readdir(folderPath, (error, files) => {
            if (error) {
                reject(error);
            } else {
                resolve(files);
            }
        });
    };

    const files = await new Promise(_readFiles(folderPath));
    return files.reduce((content, file) => {
        console.log(path.extname(file));
        if (path.extname(file).includes(extension)) {
            content += String(fs.readFileSync(`${folderPath}/${file}`))
        }
        return content;
    }, '');
}
// [end] css-bundler action

function run(program) {
    let { action, file } = program;

    // action is a reserved key in commander
    if (typeof action === 'function') {
        action = undefined;
    }

    if (action && file) {
        handleAction({ action, file });
    } else if (action || file) {
        showEmptyArgument({ action, file });
    } else {
        showHelpMessage();
    }
}

function showHelpMessage() {
    program.outputHelp();
}

function showEmptyArgument(params) {

    Object.keys(params).forEach(param => {
        if (!params[param]) {
            console.log(`--${param} argument is missing`);
        }
    });
}

function handleAction({ action, file }) {

    const actions = {
        io: inputOutput,
        transformFile,
        transform,
        uppercase,
        'bundle-css': cssBundler
    };

    if ( actions.hasOwnProperty(action) ) {
        actions[action](file);
    } else {
        console.log(`Available actions are: ${Object.keys(actions).join(', ')}`);
    }
}

program
    .version(require(`${process.cwd()}/package.json`).version)
    .description('Set of helpful transform methods')
    .usage(`--action [-a] bundle-css -file [-f] app/server/data`)
    .option('-a, --action [action]', `action values

                           io             - outputs the content of a file to stdout
                           uppercase      - uppercases content of a file to stdout
                           transform      - csv to json and outputs to stdout
                           transform-file - csv to json file eq. test.csv -> test.json
                           bundle-css     - bundles all css files for given folder
    `)
    .option('-f, --file [path to file]', 'path to file that should be processed')
    .parse(process.argv);

run(program);

// module.exports = run(program);