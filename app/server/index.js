import csv from 'csvtojson';
import path from 'path';
import { User, Product } from './models';
import * as config from './config/config.json';
import { DirWatcher } from './dirwatcher/dirwatcher';
import { Importer } from './importer/importer';

console.log('Application name is: ', config.appName);

const Bob = new User();
const Bread = new Product();

const importer = new Importer();
const pathToData = path.resolve(__dirname, 'data');

const convertToJson = (path, data) => {
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
