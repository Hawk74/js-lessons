const requestHandlers = require('./request-handlers');
const {createServer} = require('http');
const {createReadStream, createWriteStream} = require('fs');
const {resolve, extname} = require('path');
const {Transform, Readable, Writable} = require('stream');
const {factory: filesRequestListenerFactory} = require('./files');


const server = createServer();
const eventsEmitter = server.listen(3000);
const {env: {DEFAULT_FILE_NAME = '/index.html', env = 'development', DEFAULT_MIME_TYPES = {}, DIST_FOLDER = `../dist`}} = process;
const isDev = env === 'development';
const contentType = 'Content-Type';
let mimeTypes;

const {text, json} = mimeTypes = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'text': 'plain/text',
    'json': 'application/json'
    , ...DEFAULT_MIME_TYPES
};

eventsEmitter.addListener('request', requestHandlers(({url: requestUrl, method}, res) => {
    const url = extname(requestUrl) === '' ? DEFAULT_FILE_NAME : requestUrl;
    const fileExtension = extname(url).split('.').pop();
    const filePath = resolve(`${DIST_FOLDER}${url}`);
    res.on('pipe', () => res.setHeader(contentType, mimeTypes[fileExtension] || text));
    createReadStream(filePath)
        .on('error', error => {
            res.writeHead(404, {[contentType]: (isDev ? json : text)});
            res.end(isDev ? JSON.stringify(error) : '');
        })
        .pipe(res);
}));

// eventsEmitter.addListener('request', filesRequestListenerFactory());
eventsEmitter.addListener('request', filesRequestListenerFactory({
    url: 'files\/(.*$)',
    params(source) {
        return new RegExp(this.url).exec(source)[1];
    }
}));
