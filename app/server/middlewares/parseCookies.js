import { parse } from 'cookie';

const parseMiddlaware = (req, res, next) => {
    if (req.headers.cookie) {
        req.parsedCookies = parse(req.headers.cookie);
    }
    next();
}

export const parseCookies = app => {
    app.use( parseMiddlaware );
}