"use strict";

exports.run = (client, message, args, callback) => {
    let user = args[0] || "jedem";
    message.channel.send(
        `*serviert ${user} einen frisch gebrühten Kaffee aus aromatisch hochwertigen und laktosefreien Kaffeebohnen, die nach dem Vorbild der kolonisierten Ausbeutung herangewachsen und importiert worden sind; Prost!*`
    );
    callback();
};
