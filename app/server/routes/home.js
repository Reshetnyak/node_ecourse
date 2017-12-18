import { Router } from 'express';

export const homeRoute = app => {
    const HOME_PATH = '/home';
    const home = Router();
    
    home
      .get('/', (req, res) => res.send('Home page'));
    
    app.use(HOME_PATH, home);
}
