"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "sich selbst";
    message.channel.send(
        `*notschlachtet ${user} und entsorgt die Leiche im Biomüll*`
    );
    callback();
};
