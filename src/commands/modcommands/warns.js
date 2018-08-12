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
        log.warn(`Es wurde kein User angegeben.`);
        return;
    }

    cases.getbyusername(message.mentions.members.first().id, cb => {
        if(cb.length === 0) {
            message.reply(`Es gibt keinen Eintrag für den Nutzer ${message.members.first()}`);
            log.warn(`Keinen Eintrag für den Nutzer ${message.members.first()} gefunden.`);
            return;
        }

        let reasons = [];
        cb.forEach(function (data) {
            let date = new Date(data.ts);
            reasons += `:triangular_flag_on_post: **${date.getDay()+'.'+date.getMonth()+'.'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()}:** ***for*** ${data.reason} ***by*** ${data.moderator.nickname}\n\n`
        });
        let Embed = new Discord.RichEmbed();
        Embed
            .setColor(0xFFC107)
            .setTitle(`:triangular_flag_on_post: VERWARNUNGEN VON ${message.mentions.members.first().displayName}`)
            .setDescription(reasons);
        message.channel.send(Embed);

    });


    callback();
};