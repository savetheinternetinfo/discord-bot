"use strict";

let fs      = require("fs");
let path    = require("path");
let Discord = require("discord.js");

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

client.on("ready", () => {
    log.info("Running...");
    log.info(`Got ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds`);
    client.user.setActivity(config.bot_status);
});

client.on("message", message => {
    if (message.author.bot) return;

    let args    = message.content.slice((config.command_prefix).length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    if (message.content.indexOf(config.command_prefix) === 0 && message.channel.type != "dm"){
        let commandArr = [];
        let commandDir = path.resolve("./src/commands");

        fs.readdirSync(commandDir).forEach(file => { commandArr.push(file.toLowerCase()); });

        if (!commandArr.includes(command.toLowerCase() + ".js")){
            return message.channel.send(
                "Hello, " + message.author + "!\n\n" +
                "It seems like you entered an unrecognized command (" + command + ").\n\n" +
                "Please use " + config.command_prefix + "help for a complete list of commands! :)"
            );
        }

        let commandHandler = require(path.join(commandDir, command));

        commandFile.run(client, message, args, function(err){
            if (err){
                message.channel.send(
                    "Sorry, there has been an error =(\n\n" +
                    "Please ask @371724846205239326 for help."
                );
                log.error(err);
            }
        });
    }

    /*let content = msg.content,
        author  = msg.author,
        chan    = msg.channel,
        log     = config.log_channel_id;

    if (author.id != client.user.id && content.startsWith(config.command_prefix)){
        let command = content.substr(1, content.length -1).split(" ")[0];

        if (content.split(" ")[1]){
            let user = content.split(" ")[1];
            switch(command){
                case "slap":
                    chan.send(
                        `*slaps ${user} around a bit with a large trout*`
                    );
                    break;
                case "kaffee":
                    chan.send(
                        `*serviert ${user} einen frisch gebrühten Kaffee aus aromatisch hochwertigen und laktosefreien Kaffeebohnen, die nach dem Vorbild der kolonisierten Ausbeutung herangewachsen und importiert worden sind; Prost!*`
                    );
                    break;
                case "bier":
                    chan.send(
                        `*schenkt ein kühles Blondes an ${user} aus.*`
                    );
                    break;
                case "kiss":
                    chan.send(
                        `*${author}, (づ｡◕‿‿◕｡)づ 。。・゜゜・。。・゜:heart: ${user} :heart:*`
                    );
                    break;
                case "hug":
                    chan.send(
                        `*${author}, ♡:heart:♡:hearts: ${user} :hearts:♡:heart:♡:hearts:*`
                    );
                    break;
                case "döner":
                    chan.send(
                        `*Döner für ${user} auf ${author}s Nacken!*`
                    );
                    break;
                case "hawaiipizza":
                    chan.send(
                        `*blickt verschämt auf die Hawaiipizza und übergibt diese an ${user}.*`
                    );
                    break;
                case "fiege":
                    chan.send(
                        `*reicht ${user} ein kühles Fiege Bier und genießt zusammen mit ihm das Plopp.*`
                    );
                    break;
                case "umtrunk":
                    let bier = content.split(' ')[2];
                    chan.send(
                        `*teilt mit ${user} ein kühles ${bier} und genießt diesen Moment inning.*`
                    );
                    break;
              }
          }
      }*/
});

log.info("Attempting token login...");
client.login(config.bot_token).then(function(){
    log.info("Token login was successful!");
}, function(err){
    log.error("Token login was not successful:\n\n" + err + "\n");
    log.error("Shutting down due to invalid login...\n\n");
    process.exit(1);
});
