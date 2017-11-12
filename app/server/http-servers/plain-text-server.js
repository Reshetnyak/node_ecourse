import http from 'http';
const port = 8081;

http.createServer( requestHandler )
    .listen(port);

function requestHandler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World\n');
}

console.log(`Server is listening on port ${port}`);