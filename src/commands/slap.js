"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "everyone";
    message.channel.send(
        `*slaps ${user} around a bit with a large trout*`
    );
    callback();
};
