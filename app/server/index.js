import csv from 'csvtojson';
import path from 'path';
import * as config from './config/config.json';
import { Importer } from './importer/importer';

console.log('Application name is: ', config.appName);

const importer = new Importer();
const pathToData = path.resolve(__dirname, 'data');

const convertToJson = (path) => {
    return new Promise((resolve, reject) => {
        let _data = [];
        const onJson = j => _data.push(j);
        const onDone = error => error ? reject(error) : resolve(_data)
        csv().fromFile(path)
            .on('json', onJson)
            .on('done', onDone);
    });
}

importer.import(pathToData)
    .then( convertToJson )
    .then(result => {
        console.log('mock data json is: ', result);
    })
    .catch(err => {
        console.error('From importing file: ', err);
    });

// [start] Task-2 use a module
// import run from './utils/streams.js';
// console.log(run);
// [end] Task-2