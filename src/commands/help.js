"use strict";

let fs   = require("fs");
let path = require("path");

let conf = require("../utils/configurator");

const config = conf.getConfig();

exports.run = (client, message, args, callback) => {
    let commandArr = [];
    let commandDir = path.resolve("./src/commands");

    fs.readdirSync(commandDir).forEach(file => {
        let cmdPath = path.resolve(commandDir, file);
        let stats = fs.statSync(cmdPath);
        if (!stats.isDirectory()) commandArr.push(config.bot_settings.prefix.command_prefix + file.toLowerCase().replace(/\.js/gi, ""));
    });

    message.channel.send(
        "Hello, " + message.author + "!\n\n" +
        "Here is a list of commands:\n\n```" +
        commandArr.join(", ") +
        "```\n\n" +
        "Also, I am open source: <https://github.com/savetheinternetinfo/discord-bot>\n\n" +
        "if you have any questions or need assistance, please message @5yn74x#2605 or @ShadowByte#1337"
    );
    callback();
};
