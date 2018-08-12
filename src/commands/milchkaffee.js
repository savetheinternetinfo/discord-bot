"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*serviert ${user} einen heißen halbschwarzen Kaffee mit 99% Kondensmilchanteil.*`
    );
    callback();
};
