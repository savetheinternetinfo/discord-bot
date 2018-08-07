"use strict";

let fs   = require("fs");
let path = require("path");

let conf = require("../../utils/configurator");

const config = conf.getConfig();

exports.run = (client, message, args, callback) => {
    let commandArr = [];
    let commandDir = path.resolve("./src/commands/modcommands");

    fs.readdirSync(commandDir).forEach(file => {
        commandArr.push(config.bot_settings.prefix.mod_prefix + file.toLowerCase().replace(/\.js/gi, ""));
    });

    let author = message.author;
    message.channel.send(
        "Hello, " + message.author + "!\n\n" +
        "Here is a list of commands:\n\n```" +
        commandArr.join(", ") +
        "```"
    );
    callback();
};
