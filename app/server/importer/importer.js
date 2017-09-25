import fs from 'fs';
import _path from 'path';
import { DirWatcher, CHANGED } from '../dirwatcher/dirwatcher';

export class Importer {
    import(path = '/') {
        const dirwatcher = new DirWatcher();
        let pathToFile = '';
        dirwatcher.watch(path);
        return new Promise( (resolve, reject) => {
            const readFile = filepath => (err, data) => err ? reject(err) : resolve(filepath, data);
            
            const callback = filename => {
                const filepath = _path.join(path, filename);
                fs.readFile(filepath, readFile(filepath));
            };
            
            dirwatcher.on(CHANGED, callback);
        });
    }

    importSync(path = '/', cb) {
        const dirwatcher = new DirWatcher();
        const readFile = filename => {
            const pathToFile = _path.join(path, filename);
            const result = fs.readFileSync(pathToFile);
            cb(result);
        };
        dirwatcher.watch(path);
        dirwatcher.on(CHANGED, readFile);
    }
}