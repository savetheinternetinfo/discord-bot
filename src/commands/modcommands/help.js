"use strict";

let fs   = require("fs");
let path = require("path");

let conf = require("../../utils/configurator");

const config = conf.getConfig();

exports.run = (client, message, args, callback) => {
    let commandArr = [];
    let commandDir = path.resolve("./src/commands/modcommands");

    fs.readdirSync(commandDir).forEach(file => {
        let cmdPath = path.resolve(commandDir, file);
        let stats = fs.statSync(cmdPath);
        if (!stats.isDirectory()) commandArr.push(config.bot_settings.prefix.mod_prefix + file.toLowerCase().replace(/\.js/gi, ""));
    });

    message.channel.send("I've sent a PM to you, " + message.author + " :)");
    message.author.send(
        "Hello, " + message.author + "!\n\n" +
        "Here is a list of commands:\n\n```" +
        commandArr.join(", ") +
        "```"
    );
    callback();
};
