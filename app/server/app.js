import express from 'express';

import { isObject } from './helpers/isObject';

import { parseCookies, parseQuery } from './middlewares';
import { productsRoute, usersRoute } from './routes';

export const app = express();

parseCookies(app);
parseQuery(app);
usersRoute(app);
productsRoute(app);
