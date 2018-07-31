"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "jeden";
    message.channel.send(
        `*schenkt ein kühles Blondes an ${user} aus.*`
    );
    callback();
};
