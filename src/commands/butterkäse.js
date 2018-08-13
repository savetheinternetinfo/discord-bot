"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "jedem im Kanal";
    message.channel.send(
        `*drischt mit einem großen Stück Butterkäse auf ${user} ein.*`
    );
    callback();
};
