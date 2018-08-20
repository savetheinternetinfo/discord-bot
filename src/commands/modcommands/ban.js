;"use strict";

let conf = require("../../utils/configurator");
let cases = require("../../utils/cases");
let log  = require("../../utils/logger");

const config = conf.getConfig();
let Discord = require("discord.js");
let date = new Date();

exports.run = (client, message, args, callback) => {
    if (!message.mentions.members.first()) {
        message.reply("du hast keinen User angegeben!");
        return;
    }

    let reason = args.join(" ").replace(message.mentions.members.first(), "").trim();
    if (reason == "") {
        message.reply("Du musst einen Grund angeben!");
        log.warn("Es wurde kein Grund angegeben.");
        return;
    }

    let ban = function(del) {
        let days = 0;
        if(del === "ja") days = 7; else days = 0;

        let Embed = new Discord.RichEmbed()
            .setColor(0x424242)
            .setTitle(":triangular_flag_on_post: BANN")
            .addField("MODERATOR", message.author, true)
            .addField("USER", message.mentions.members.first(), true)
            .addField("BEGRÜNDUNG", reason, true)
            .setTimestamp(date.toISOString())
            .setFooter("ID: " + message.mentions.members.first().id);

        message.channel.send(Embed);
        cases.create(message.author,message.mentions.members.first(), reason, "Ban", date.toISOString(), message, cb => {
        });

        if(message.mentions.members.first().bannable) {
            message.mentions.members.first()
                .ban(days)
                .catch(log.error);
        }
    };

    let filter = m => m.author === message.author;
    message.channel.send(`Sollen die letzten Nachrichten von ${message.mentions.members.first()} gelöscht werden? (ja|nein)`)
        .then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time'],
            })
                .then((collected) => {
                    ban(collected.first().content.toLowerCase());
                })
                .catch(() => {
                    message.channel.send(console.log());
                })
        });


    callback();
};