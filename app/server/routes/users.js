import { Router } from 'express';

export const USERS_PATH = '/api/users';
export const users = new Router();

users.get('/', (req, res) => {
  res.send('All users');
});
