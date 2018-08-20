"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*meditiert zusammen mit ${user} Metta.*`
    );
    callback();
};
