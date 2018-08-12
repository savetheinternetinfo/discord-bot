"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*bereitet ${user} ein Blech Schore zu.* Viel Vergnügen du Siffscheiße.`
    );
    callback();
};
