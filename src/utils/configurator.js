"use strict";

let fs   = require("fs");
let path = require("path");

let log = require("./logger");

const packagefile = require("../../package.json");
const configPath  = path.resolve("config.json");

let createDir = function(name){
    log.info("Checking '" + name + "' directory...");
    let pathOf = path.resolve(name);

    if (!fs.existsSync(pathOf)){
        log.warn("'" + name + "' directory does not exist. Creating...");
        try { fs.mkdirSync(pathOf); }
        catch (err){
            log.error("Cannot create '" + name + "' directory: " + err);
            process.exit(1);
        }
        finally { log.info("'" + name + "' directory successfully created!"); }
    }
    else log.info("Found '" + name + "' directory!");
};

let init = function(){
    createDir("tempdata");
    createDir("logs");
    createDir("src/db/");

};

let validJson = function(obj){
    try { JSON.parse(obj); }
    catch (e){ return false; }
    return true;
};

let getconfig = function(){
    if (!fs.existsSync(configPath)){
        log.error("Config does not exist! Make sure you copy config.template.json and paste it as 'config.json'. Then configure it.");
        process.exit(1);
    }

    let jsondata;
    try { jsondata = fs.readFileSync(configPath); }
    catch (e){
        log.error("Cannot read config file: " + e);
        process.exit(1);
    }

    if (validJson(jsondata)) return JSON.parse(jsondata);

    else {
        log.error("Config is not valid JSON. Stopping...");
        process.exit(1);
    }
};

let getVersion = function(){ return packagefile.version; };
let getName    = function(){ return packagefile.name;    };

module.exports = {
    init:       init,
    getConfig:  getconfig,
    getVersion: getVersion,
    getName:    getName
};
