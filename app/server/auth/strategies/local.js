import { Strategy } from 'passport-local';
import { db } from '../../data/mock.db';

export const local = new Strategy(function (username, password, cb) {
  const user = db.users.find(x => x.username === username);
  if (!user || password !== user.password) {
    return cb(null, false);
  }
  cb(null, user);
});

export const serialize = (user, cb) => cb(null, user.id);

export const deserialize = (id, cb) => {
  const user = db.users.find(x => x.id === id);
  if (user) {
    cb(null, user);
  } else {
    cb(false);
  }
}
