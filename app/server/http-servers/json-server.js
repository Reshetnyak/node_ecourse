import http from 'http';

const port = 8082;
const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
}

http.createServer( requestHandler )
    .listen(port, errorHandler);

function requestHandler(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'}); 
    res.end( JSON.stringify(product) );
}

function errorHandler(err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is listening on port ${port}`);
}
