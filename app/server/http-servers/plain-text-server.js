import http from 'http';
const port = 8083;

http.createServer( requestHandler )
    .listen(port, errorHandler);

function requestHandler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World\n');
}

function errorHandler(err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is listening on port ${port}`);
}
