import { parse } from 'cookie';

export const parseCookies = () => (req, res, next) => {
    if (req.headers.cookie) {
        req.parsedCookies = parse(req.headers.cookie);
    }
    next();
}