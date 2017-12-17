import http from 'http';
const port = 8084;

http.createServer((req, res) => {
  res.writeHead(200);
  req.pipe(res);
})
.listen(port, errorHandler);

function errorHandler(err) {
    return err
        ? console.log(err)
        : console.log(`Server is listening on port ${port}`);
}
