import fs from 'fs';
import { EventEmitter } from 'events';

export const CHANGED = Symbol('dirwatcher:changed');

export class DirWatcher extends EventEmitter {

    constructor() {
        super();
        this.watchers = {};
    }

    watch(path = '/', delay = 0) {
        const emitter  = filename => this.emit(CHANGED, filename);
        const callback = (event, filename) => setTimeout(emitter, delay, filename);
        const watcher = fs.watch(path, callback);
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