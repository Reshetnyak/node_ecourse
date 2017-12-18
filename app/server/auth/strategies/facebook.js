import { Strategy } from 'passport-facebook';

const FB_APP_ID = process.env.FB_APP_ID || 'id';
const FB_APP_SECRET = process.env.FB_APP_SECRET || 'secret';

export const facebook = new Strategy({
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, (token, refreshToken, profile, cb) => {
    cb(null, profile);
  }
);