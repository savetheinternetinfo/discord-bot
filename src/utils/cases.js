"use strict";

const fs   = require("fs");
const Discord = require("discord.js");

// JSON DB
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('src/db/cases.json')
const db = low(adapter)

let log  = require("./logger");
let conf = require("./configurator");

const config = conf.getConfig();

let logpost = function(moderator, user, reason, action, ts, message) {
    let color;
    switch (action) {
        case "Warn":
            color =  0xFF9800;
            break;
        case "Kick":
            color = 0x4E342E;
            break;
        case "Ban":
            color = 0x424242;
            break;
        case "Unban":
            color = 0x8BC34A;
            break;
        default:
            color = 0x9E9E9E;
    }

    let Embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(action)
        .addField("MODERATOR", moderator, true)
        .addField("USER", user, true)
        .addField("BEGRÜNDUNG", reason, true)
        .setTimestamp(ts)
        .setFooter("ID: " + user.id);
    message.guild.channels.find("id", "475599802701316107").send(Embed);
};

let create = function (moderator, user, reason, action, ts, message, callback) {
    db.defaults({case: []})
        .write();
    db.get('case')
        .push({
            moderator: {id: moderator.id, nickname: moderator.username},
            user: {id: user.id, nickname: user.displayName},
            reason: reason,
            action: action,
            ts: ts
        })
        .write();
    callback();

    logpost(moderator, user, reason, action, ts, message);
};

let getbyusername = function(userid, callback) {
    let get = db.get('case')
        .filter({user: {id: userid}, action: "Warn"})
        .sortBy('ts')
        .value();
    callback(get);
};

let modlog = function(userid, callback) {
    let get = db.get('case')
        .filter({user: {id: userid}})
        .sortBy('ts')
        .value();
    callback(get);
};


module.exports = {
    create: create,
    getbyusername: getbyusername,
    modlog: modlog
};
