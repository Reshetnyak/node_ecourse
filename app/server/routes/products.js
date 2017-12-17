import { Router } from 'express';

export const productsRoute = app => {
    const PRODUCTS_PATH = '/api/products';
    const products = new Router();
    
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
    
    app.use(PRODUCTS_PATH, products);
}
