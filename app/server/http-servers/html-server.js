import http from 'http';
import fs from 'fs';
import path from 'path';
import through from 'through2';

const port = 8081;
const noIndexTemplate = `<html><head></head><body><h1>Somebody has stolen our template!!!</h1></body></html>\n`;

http.createServer( requestHandler )
    .listen(port, errorHandler);

function requestHandler(req, res) {

    const template = getTemplate('index.html');
    const contentType = {'Content-Type': 'text/html'};
    const stream = through( (chunk, _, cb) => {
        cb(null, setMessage(chunk.toString(), 'I wish you all the best!'));
    });

    res.writeHead(200, contentType);

    if (template) {
        _streamFromString(template)
            .pipe(stream)
            .pipe(res);
    } else {
        res.writeHead(500, contentType);
        res.end(noIndexTemplate);
    }
}

function getTemplate(fileName) {

    const fullPath = path.join(__dirname, fileName);
    const isExist  = fs.existsSync(fullPath);

    return isExist ? fs.readFileSync(fullPath, {encoding: 'utf8'}) : null;
}

function setMessage(template, message) {
    return template.replace('{message}', message);
}

function _streamFromString(content) {
    const rs = through();
    rs.write(content);
    return rs;
}

function errorHandler(err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is listening on port ${port}`);
}

