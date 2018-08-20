"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || message.author;
    message.channel.send(
        `*zapft ein Fläschchen feinsten Bullenurin, verarbeitet diesen zu Red-Bull und serviert ihn ${user} in Form einer Pfanddose.*`
    );
    callback();
};
