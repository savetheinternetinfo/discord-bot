"use strict";

let transform = function(c) {
    return Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase();
};

exports.run = (client, message, args, callback) => {
    let text = message.content.slice(".mock ".length);

    if (text.replace(/\s/g, "") == "") return callback(
        "You need to enter a text as well.\n\n" +
        "Usage: .mock your text here"
    );

    let mocked = text.split("").map(transform).join("");

    message.channel.send(mocked + " <:Wojak:457709127670693888>");
    callback();
};
