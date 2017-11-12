import express from 'express';

import { isObject } from './helpers/isObject';

import { parseCookies, parseQuery } from './middlewares';
import { products, PRODUCTS_PATH, users, USERS_PATH } from './routes';

export const app = express();

const middlewares = [
    parseCookies,
    parseQuery, 
    { path: PRODUCTS_PATH, route: products },
    { path: USERS_PATH, route: users }
];

// register middlewares
middlewares.forEach( middleware => {
    if ( isObject(middleware) ) {
        app.use(middleware.path, middleware.route);
    } else {
        app.use( middleware() );
    }
});
