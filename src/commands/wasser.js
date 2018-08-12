"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "jedem";
    message.channel.send(
        `kippt ${user} einen Eimer Wasser über den Kopf.`
    );
    callback();
};
