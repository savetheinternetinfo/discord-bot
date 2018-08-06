let http   = require("http");
let spawn  = require("child_process").spawn;
let crypto = require("crypto");
let path   = require("path");
let url    = require("url");

let conf    = require("./configurator");
let log     = require("./logger");

const config = conf.getConfig();

let secret = config.github_hook.secret;
let port   = config.github_hook.port;

let puts = function(err, stdout, stderr){
    if (err) return log.error(err);
    log.info(stdout);
};

module.exports = function(){
    http.createServer(function(req, res){
        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        let path = url.parse(req.url).pathname;

        if (path != config.github_hook.path || req.method != "POST"){
           let data = JSON.stringify({
               "error": "invalid request"
           });
           log.warn("Got invalid push request");
           return res.end(data);
        }

        let jsonString = "";

        req.on("data", function(data){
            jsonString += data;
        });

        req.on("end", function(){
            let hash = "sha1=" + crypto.createHmac("sha1", secret).update(jsonString).digest("hex");
            if (hash != req.headers["x-hub-signature"]){
                log.warn("invalid key for push request");
                let data = JSON.stringify({
                    "error": "invalid key", key: hash
                });
                return res.end(data);
            }

            log.info("successful push request");
            let command = "cd " + path.join(__dirname, "..");
            let cmdArr = config.github_hook.commands;
            for (let i in cmdArr) command += " && " + cmdArr[i];
            exec(command, puts);

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            let data = JSON.stringify({
                "success": true
            });
            return res.end(data);
        });
    }).listen(port);
}
