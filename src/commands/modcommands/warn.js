"use strict";

let conf = require("../../utils/configurator");
let cases = require("../../utils/cases");
let log  = require("../../utils/logger");

const config = conf.getConfig();
let Discord = require("discord.js");
let date = new Date();

exports.run = (client, message, args, callback) => {
    if(!message.mentions.members.first()) {
        message.reply("du hast keinen User angegeben!");
        return;
    }

    let reason = args.join(" ").replace(message.mentions.members.first(), "").trim();
    if (reason == "") {
        message.reply("Du musst einen Grund angeben!");
        log.warn("Es wurde kein Grund angegeben.");
        return;
    }
    let Embed = new Discord.RichEmbed()
    .setColor(0xFF9800)
    .setTitle(":triangular_flag_on_post: VERWARNUNG")
    .addField("MODERATOR", message.author, true)
    .addField("USER", message.mentions.members.first(), true)
    .addField("BEGRÜNDUNG", reason, true)
    .setTimestamp(date.toISOString())
    .setFooter("ID: " + message.mentions.members.first().id);

    message.channel.send(Embed);
    cases.create(message.author,message.mentions.members.first(), reason, "Warn", date.toISOString(), message, cb => {

    });

    callback();
};