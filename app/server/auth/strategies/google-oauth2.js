import { Strategy } from 'passport-google-oauth2';
import { db } from '../../data/mock.db';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'secret';

export const google = new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback'
}, (req, token, refreshToken, profile, done) => {
  const user = db.users.find(x => x === profile.id)
  if (user) {
    done(null, user);
  } else {
    done(false, {});
  }
});