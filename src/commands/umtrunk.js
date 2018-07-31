"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "sich selbst";
    let bier = args[1] || "bier";
    message.channel.send(
        `*teilt mit ${user} ein kühles ${bier} und genießt diesen Moment inning.*`
    );
    callback();
};
