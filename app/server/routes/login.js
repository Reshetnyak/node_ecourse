import { Router } from 'express';

export const loginRoute = app => {
    const LOGIN_PATH = '/login';
    const login = Router();
    
    login
      .get('/', (req, res) => res.send('Login page'));
    
    app.use(LOGIN_PATH, login);
}

