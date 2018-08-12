"use strict";

const fs   = require("fs");

// JSON DB
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('src/db/cases.json')
const db = low(adapter)

let log  = require("./logger");
let conf = require("./configurator");

const config = conf.getConfig();

let create = function(moderator, user, reason, action, ts, callback){
    db.defaults({ case: []})
        .write();
    db.get('case')
        .push({
            moderator: {id: moderator.id, nickname: moderator.username},
            user: {id: user.id, nickname: user.displayName},
            reason: reason,
            action: action,
            ts: ts
        })
        .write();
    callback();
};

let getbyusername = function(userid, callback) {
    let get = db.get('case')
        .filter({user: {id: userid}, action: "Warn"})
        .sortBy('ts')
        .value();
    callback(get);
}

module.exports = {
    create: create,
    getbyusername: getbyusername
};
