"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*Jamba Fähigkeitenscanner: ${user} ist zu ${~~(Math.random() * 100 + 1)}% unfähig.*`
    );
    callback();
};
