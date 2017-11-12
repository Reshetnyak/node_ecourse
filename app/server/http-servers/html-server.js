import http from 'http';
import fs from 'fs';
import path from 'path';
import through from 'through2';

const port = 8080;
const noIndexTemplate = `<html><head></head><body><h1>Somebody has stolen our template!!!</h1></body></html>\n`;

http.createServer( requestHandler )
    .listen(port);

function requestHandler(req, res) {

    const template = getTemplate('index.html');

    res.writeHead(200, {'Content-Type': 'text/html'});

    if (template) {
        _streamFromString(template)
            .pipe( through( (chunk, enc, cb) => {
                cb(null, setMessage(chunk.toString(), 'I wish you all the best!'));
            }))
            .pipe(res);
    } else {
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

console.log(`Server is listening on port ${port}`);