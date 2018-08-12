"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "jedem";
    message.channel.send(
        `*schenkt ${user} eine ~~{~[@}*`
    );
    callback();
};
