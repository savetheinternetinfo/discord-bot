"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*drischt mit einem großen Duden auf ${user} ein.*`
    );
    callback();
};
