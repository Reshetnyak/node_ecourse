import fs from 'fs';
import _path from 'path';
import { EventEmitter } from 'events';

export const CHANGED = Symbol('dirwatcher:changed');

export class DirWatcher extends EventEmitter {

    constructor() {
        super();
        this.watchers = {};
    }

    watch(path = '/', delay = 0) {
        const watcher = fs.watch(path, (event, filename) => {
            setTimeout(() => {
                this.emit( CHANGED, filename );
            }, delay );
        });
        this._addWatcher(path, watcher);
    }

    unwatch(path) {
        if (!path) {
            throw new Error('Please, provide the path');
        } else {
            this._removeWatcher(path);
        }
    }

    _addWatcher(path, watcher) {
        this.watchers[path] = watcher;
    }

    _removeWatcher(path) {
        const watcher = this.watchers[path];
        if (watcher) {
            watcher.close();
            delete this.watchers[path];
        }
    }
}