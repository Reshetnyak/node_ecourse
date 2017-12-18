import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { db } from '../data/mock.db';

export const authRoute = app => {
    const AUTH_PATH = '/auth';
    const auth = Router();

    auth.post('/', postRoute);
    
    registerAuthRoutes(auth);

    app.use(AUTH_PATH, auth);
}
    
function postRoute(req, res) {
    console.log(res.body);
    let {
        username,
        password
    } = req.body;
    let data = db.users.find(x => x.username === username);

    if (data.password === password) {
        const token = jwt.sign(
            { username },
            'enigma',
            { expiresIn: 60 });
        const json = {
            code: 200,
            message: 'OK',
            data,
            token
        };
        res.send(json);
    } else {
        const json = {
            code: 404,
            message: 'Not Found',
            data: {
                message: 'Login or password are incorrect'
            }
        };
        res.send(json);
    }
}

function registerAuthRoutes(auth) {

    const FAILURE_REDIRECT_PATH = '/login';
    const REDIRECT_PATH = '/home';
    const authRoutes = [
        'local',
        'facebook',
        'twitter',
        'google'
    ];

    const redirect = (route) => (req, res) => res.redirect(route);

    const registerRoute = route => {
        const path = `/${route}`
        auth.get(
            path,
            passport.authenticate(
                route, { failureRedirect: FAILURE_REDIRECT_PATH }),
            redirect(REDIRECT_PATH)
        );
        if (route !== 'local') {
            auth.get(`${path}/callback`, redirect(REDIRECT_PATH))
        }
    };

    authRoutes.forEach(registerRoute);
}