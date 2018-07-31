"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "sich selbst";
    message.channel.send(
        `*reicht ${user} ein kühles Fiege Bier und genießt zusammen mit ihm das Plopp.*`
    );
    callback();
};
