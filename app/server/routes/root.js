import { Router } from 'express';

export const rootRoute = app => {
    const ROOT_PATH = '/';
    const root = Router();
    
    root
      .get('/', (req, res) => res.send('Index page'));
    
    app.use(ROOT_PATH, root);
}
