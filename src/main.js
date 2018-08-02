"use strict";

let fs      = require("fs");
let path    = require("path");
let Discord = require("discord.js");
let githook = require("githubhook");

let conf    = require("./utils/configurator");
let log     = require("./utils/logger");

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

let github = githook({
    port: config.github_hook.port,
    path: config.github_hook.path,
    secret: config.github_hook.secret
});

client.on("ready", () => {
    log.info("Running...");
    log.info(`Got ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds`);
    client.user.setActivity(config.bot_settings.bot_status);
});

client.on("message", message => {
    if (message.author.bot || message.content.replace(/\./g, "") == "") return;

    let args    = message.content.slice((config.bot_settings.command_prefix).length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    if (message.content.indexOf(config.bot_settings.command_prefix) === 0 && message.channel.type != "dm"){
        let commandArr = [];
        let commandDir = path.resolve("./src/commands");

        fs.readdirSync(commandDir).forEach(file => { commandArr.push(file.toLowerCase()); });

        if (!commandArr.includes(command.toLowerCase() + ".js")){
            return message.channel.send(
                "Hello, " + message.author + "!\n\n" +
                "It seems like you entered an unrecognized command (" + command + ").\n\n" +
                "Please use " + config.bot_settings.command_prefix + "help for a complete list of commands! :)"
            );
        }

        let commandHandler = require(path.join(commandDir, command));

        try {
            commandHandler.run(client, message, args, function(err){
                if (err) message.channel.send(err);
            });
        }
        catch (err){
            message.channel.send(
                "Sorry, there has been an error =(\n\n" +
                "Please ask <@371724846205239326> for help."
            );
            log.error(err);
        }
    }
});

github.on("push", function(repo, data){
    log.info(`Received push event for ${repo}`);
    let command = "cd " + path.join(__dirname, "..");
    let cmdArr = config.github_hook.commands;
    for (let i in cmdArr) command += " && " + cmdArr[i];
    exec(command, puts);
});

log.info("Attempting token login...");
client.login(config.auth.bot_token).then(function(){
    log.info("Token login was successful!");
}, function(err){
    log.error("Token login was not successful:\n\n" + err + "\n");
    log.error("Shutting down due to invalid login...\n\n");
    process.exit(1);
});
