"use strict";

exports.run = (client, message, args, callback) => {
    let user   = args[0] || "alle";
    let author = message.author;
    message.channel.send(
        `*${author}, ♡:heart:♡:hearts: ${user} :hearts:♡:heart:♡:hearts:*`
    );
    callback();
};
