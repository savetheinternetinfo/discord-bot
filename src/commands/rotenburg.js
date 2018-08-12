"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "jeden";
    message.channel.send(
        `*verarbeitet ${user} zu Hackfleisch.*`
    );
    callback();
};
