"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*dreht ${user} einen prall gefüllten Sargnagel mit feinstem Schwarzer Krauser.*`
    );
    callback();
};
