import fs from 'fs';
import _path from 'path';
import { DirWatcher, CHANGED } from '../dirwatcher/dirwatcher';

export class Importer {
    import(path = '/') {
        const dirwatcher = new DirWatcher();
        let pathToFile = '';
        dirwatcher.watch(path);
        return new Promise( (resolve, reject) => {
            const onReadEnd = (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(pathToFile, data);
                }
            };

            dirwatcher.on(CHANGED, filename => {
                pathToFile = _path.join(path, filename);
                fs.readFile(pathToFile, onReadEnd);
            });
        });
    }

    importSync(path = '/', cb) {
        const dirwatcher = new DirWatcher();
        dirwatcher.watch(path);
        dirwatcher.on(CHANGED, filename => {
            const pathToFile = _path.join(path, filename);
            const result = fs.readFileSync(pathToFile);
            cb(result);
        });
    }
}