"use strict";

let fs      = require("fs");
let path    = require("path");
let http    = require("http");
let Discord = require("discord.js");

let conf       = require("./utils/configurator");
let log        = require("./utils/logger");
let hook       = require("./utils/hook");
let cmdHandler = require("./utils/commandHandler");

const client = new Discord.Client();
const config = conf.getConfig();

let appname = conf.getName();
let version = conf.getVersion();

console.log(
    "\n" +
    " #" + "-".repeat(12 + appname.length + version.toString().length) + "#\n" +
    " # Started " + appname + " v" + version + " #\n" +
    " #" + "-".repeat(12 + appname.length + version.toString().length) + "#\n"
);

log.info("Starting bot...");

conf.init();
hook();
require("./utils/benisHandler")(client, Discord);

process.on("unhandledRejection", function(err, promise){
    log.error("Unhandled rejection (promise: " + promise + ", reason: " + err, ")");
});

client.on("ready", () => {
    log.info("Running...");
    log.info(`Got ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds`);
    client.user.setActivity(config.bot_settings.bot_status);
});

client.on("error", log.error);

client.on("message", message => {
    let nonBiased = message.content
        .replace(config.bot_settings.prefix.command_prefix, "")
        .replace(config.bot_settings.prefix.mod_prefix, "")
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(/\_/g, "");

    if (message.author.bot || nonBiased == "") return;

    if (message.channel.type != "dm"){
        if (message.content.indexOf(config.bot_settings.prefix.command_prefix) === 0){
            cmdHandler(message, client, false, function(err){
                if (err) message.channel.send(err);
            });
        }
        else if (message.content.indexOf(config.bot_settings.prefix.mod_prefix) === 0){
            cmdHandler(message, client, true, function(err){
                if (err) message.channel.send(err);
            });
        }
    }
});

log.info("Attempting token login...");
client.login(config.auth.bot_token).then(function(){
    log.info("Token login was successful!");
}, function(err){
    log.error("Token login was not successful:\n\n" + err + "\n");
    log.error("Shutting down due to invalid login...\n\n");
    process.exit(1);
});
