"use strict";

exports.run = (client, message, args, callback) => {
    let user   = args[0] || "jemand anderen";
    let author = message.author;
    message.channel.send(
        `*blickt verschämt auf die Hawaiipizza und übergibt diese an ${user}.*`
    );
    callback();
};
