"use strict";

exports.run = (client, message, args, callback) => {
    let user   = args[0] || "";
    let author = message.author;
    message.channel.send(
        `*${author}, (づ｡◕‿‿◕｡)づ 。。・゜゜・。。・゜:heart: ${user} :heart:*`
    );
    callback();
};
