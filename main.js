const http = require('http');
const fs = require("fs");
const redis = require('redis');

var redisClient = redis.createClient(); //creates a new client
const hostname = '127.0.0.1';
const port = 420;
const template = fs.readFileSync('website/template.html', 'utf8');

function respond404(req,res) {
    res.statusCode = 404;
    res.res.setHeader('Content-Type', 'text/plaintext');
    res.end("cease and desist immediately - this is a 404 btw")
}

function respond(req,res) {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        redisClient.get('index', function(err, reply) {
            var content = reply
        });
        res.end(template.replace("{{content}}", reply));
    }
    if (req.url === "/resource") {
        var arguments = url.parse(req.url,true).query;
        try {
            //check to see if they're trying to access something outside current directory
            if (arguments.file.indexOf(__dirname) > -1){
                throw("../ detected");
            }
            var file = fs.readFileSync(merge('website/', arguments.file))
        }
    }
}
const server = http.createServer((req, res) => {
    respond(req,res)
});

//get all files in a directory - recursive
var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
};

//get all the files in the website directory
getDirectories('website', function (err, res) {
    if (err) {
        console.log('Error', err);
    } else {
        var files = res;
    }
});

//read all the files in the website directory and put them in redis
files.forEach(function(value){
    if (process.env.unloadable.indexOf(value) > -1) {
        console.log('Not loading ' + value + ' because it is in unloadable');
    } else {
        client.set(value,fs.readFileSync('website/' + value, 'utf8');,function(err) {
            if (err) { 
                throw err; /* in production, handle errors more gracefully */
            }
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
