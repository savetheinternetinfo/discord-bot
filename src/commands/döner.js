"use strict";

exports.run = (client, message, args, callback) => {
    let user   = args[0] || "jeden";
    let author = message.author;
    message.channel.send(
        `*Döner für ${user} auf ${author}s Nacken!*`
    );
    callback();
};
