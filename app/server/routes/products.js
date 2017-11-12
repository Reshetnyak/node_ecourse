import { Router } from 'express';

export const PRODUCTS_PATH = '/api/products';
export const products = new Router();

products
    .get('/', (req, res) => {
        res.send('All products');
    })
    .post('/', (req, res) => {
        /* ... add new product logic ... */
        res.send(req.body);
    })
    .get('/:id', (req, res) => {
        res.send(`Product with id: ${req.params.id}`);
    })
    .get('/:id/reviews', (req, res) => {
        res.send(`Reviews for a product with id: ${req.params.id}`);
    });
