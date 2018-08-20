"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*jagt ${user} durch den Raum.*`
    );
    callback();
};
