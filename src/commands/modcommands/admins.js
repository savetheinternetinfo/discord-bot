"use strict";

let conf = require("../../utils/configurator");

const config = conf.getConfig();

let listUsers = function(modcount, configRoles, message){
    let msg = "There " +
        (modcount == 1 ? "is" : "are") +
        " currently " + modcount + " permitted " +
        (modcount == 1 ? "user" : "users") + ":";

    for (let i in configRoles){
        let membersWithRole = message.guild.members.filter(member => {
            return member.roles.find("name", configRoles[i]);
        }).map(member => {
            return member.user.username + "#" + member.user.discriminator;
        });
        msg += "\n\n**" + configRoles[i] + "**: \n";
        msg += membersWithRole.length == 0 ? "-" : membersWithRole.join("\n");
    }

    return msg;
};

exports.run = (client, message, args, callback) => {
    let configRoles = config.bot_settings.moderator_roles;
    let modcount = 0;

    for (let i in configRoles) modcount += message.guild.roles.find("name", configRoles[i]).members.size;

    if (args.length !== 0){
        switch(args[0].toLowerCase()){
            case "list": {
                message.channel.send(listUsers(modcount, configRoles, message));
                break;
            }
            default: {
                message.channel.send(
                    "Unknown argument. Valid arguments: \n\n```list```"
                );
            }
        }
    }

    else message.channel.send(
        "Moderator roles: \n\n```" +
        configRoles.join(", ") +
        "```\n\nThere " + (modcount == 1 ? "is" : "are") + " currently " + modcount + " permitted " + (modcount == 1 ? "user" : "users") +
        "\n\nUse `admin list` to list all of them."
    );
    callback();
};
