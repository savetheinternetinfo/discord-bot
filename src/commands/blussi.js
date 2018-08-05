"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "jeden";
    message.channel.send(
        `*gebert ${user} ein <:blussi:456248770326167574>*`
    );
    callback();
};
