import express from 'express';
import bodyParser from 'body-parser';

import { isObject } from './helpers/isObject';

import { parseCookies, parseQuery } from './middlewares';
import { products, PRODUCTS_PATH, users, USERS_PATH, 
    auth, AUTH_PATH } from './routes';

export const app = express();

const middlewares = [
    bodyParser.json,
    bodyParser.urlencoded.bind(bodyParser, {extended: true}),
    parseCookies,
    parseQuery,
    { path: PRODUCTS_PATH, route: products },
    { path: USERS_PATH, route: users },
    { path: AUTH_PATH, route: auth }
];

// register middlewares
middlewares.forEach( middleware => {
    if ( isObject(middleware) ) {
        app.use(middleware.path, middleware.route);
    } else {
        app.use( middleware() );
    }
});

