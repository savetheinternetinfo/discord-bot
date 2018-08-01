"use strict";

exports.run = (client, message, args, callback) => {
    let user   = args[0] || message.author;
    message.channel.send(
        `<:pedalo:473114268435349504> <:pedalo:473114268435349504> <:pedalo:473114268435349504>*${user} fährt mit seinem Pedalo durch den Channel und presst sich dabei einen Monsterenergy. Lit.* :ok_hand: <:pedalo:473114268435349504> <:pedalo:473114268435349504> <:pedalo:473114268435349504>`
    );
    callback();
};
