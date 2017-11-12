import http from 'http';
const port = 8084;

http.createServer((req, res) => {
  res.writeHead(200);
  req.pipe(res);
})
.listen(port, errorHandler);

function errorHandler(err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is listening on port ${port}`);
}
