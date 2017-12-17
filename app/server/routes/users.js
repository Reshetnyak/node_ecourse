import { Router } from 'express';

export const usersRoute = app => {
    const USERS_PATH = '/api/users';
    const users = new Router();

    users.get('/', (req, res) => {
        res.send('All users');
    });

    app.use(USERS_PATH, users);
}