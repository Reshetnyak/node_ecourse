import { Strategy } from 'passport-twitter';

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || 'key';
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || 'secret';

export const twitter = new Strategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:8080/auth/twitter/callback'
}, (token, tokenSecret, profile, cb) => {
  cb(null, profile);
});
