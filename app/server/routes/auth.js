import { Router } from 'express';
import jwt from 'jsonwebtoken';

export const AUTH_PATH = '/api/auth';
export const auth = new Router();

const userData = {
    login: 'test_login',
    password: 'test_password',
    email: 'test@email.com',
    name: 'test_user'
};

const SECRET_WORD = 'nothing_here';

auth.post('/', (req, res) => {
    console.log(req.body);
    if ( areCorrectCredentials(req.body || {}) ) {
        authenticate(res);
    } else {
        authorizationFailed(res);
    }
});

function areCorrectCredentials({login = '', password = ''}) {
    return userData.login === login && userData.password === password;
}

function authenticate(res) {

    const respData = {
        code: 200,
        message: 'Ok',
        data: {
            user: {
                email: userData.email,
                username: userData.name
            }
        },
        token: generateToken()
    }

    res.send(respData);
}

function generateToken() {
    return jwt.sign(userData, SECRET_WORD);
}

function authorizationFailed(res) {
    const respData = {
        code: 404,
        message: 'Authorization failed',
        data: {reason: 'Bad mood'}
    };

    res.send(respData);
}

