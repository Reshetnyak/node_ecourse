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

importer.import(pathToData)
    .then((path, data) => {
        return new Promise((resolve, reject) => {
            let _data = [];
            csv().fromFile(path)
                .on('json', j => _data.push(j))
                .on('done', error => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(_data);
                    }
                })
          });
    })
    .then(result => {
        console.log('mock data json is: ', result);
    })
    .catch(err => {
        console.error('From importing file: ', err);
    });
