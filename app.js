// tracker.info('Info sample');
// tracker.warn('Warning sample');
// tracker.debug('Debugging Sample');
// tracker.error('Error Sample');

// tracker.error(new Error('Error sample with stack trace'));
const tracker = require('@middleware.io/node-apm');
tracker.track();
const {config} = require('./config')
console.log("config>>>>", config.traceExporter)

const http = require('http');


const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });
  
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


