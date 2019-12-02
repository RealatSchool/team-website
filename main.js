const http = require('http');
const fs = require("fs");
const redis = require('redis');

var redisClient = redis.createClient(); //creates a new client
const hostname = '127.0.0.1';
const port = 420;
const template = fs.readFileSync('website/template.html', 'utf8');

function respond(req,res) {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        redisClient.get('index', function(err, reply) {
            var content = reply
        });
        res.end(template.replace("{{content}}", reply));
    }
}
const server = http.createServer((req, res) => {
    respond(req,res)
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
