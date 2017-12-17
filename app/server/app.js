import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';

import { serialize, deserialize,
    local, facebook, twitter, google } from './auth/strategies';

import { parseCookies, parseQuery } from './middlewares';
import { productsRoute, usersRoute, loginRoute, 
    homeRoute, authRoute, rootRoute } from './routes';

export const app = express();

// Passport setup
passport.use(local);
passport.use(facebook);
passport.use(twitter);
passport.use(google);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

// Register middlewares
app.use(bodyParser.json());
parseCookies(app);
parseQuery(app);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Register routes
rootRoute(app);
authRoute(app);
loginRoute(app);
homeRoute(app);
usersRoute(app);
productsRoute(app);
