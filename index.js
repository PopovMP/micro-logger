"use strict";

const fs = require("fs");
const path = require("path");

/** @type {string} */
let logPath = "";
let isInit  = false;

/**
 * Sets the log path
 *
 * @param {string} logFilePath
 * @return { {init, error, info, text} }
 */
function init(logFilePath) {
    if (isInit) {
        // Already initialised
        return module.exports;
    }

    logPath = logFilePath;
    isInit  = true;

    if ( !fs.existsSync(logPath) ) {
        fs.mkdirSync(path.dirname(logPath), {recursive: true});
        fs.writeFileSync(logPath, "", "utf8");
    }

    return module.exports;
}

/**
 * Logs an error to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function error(message, sender) {
    logMessage("[ERROR]", message, sender);
}

/**
 * Logs a message to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function info(message, sender) {
    logMessage("[INFO]", message, sender);
}

/**
 * Logs a text message
 *
 * @param {string} message
 */
function text(message) {
    const msg = message + "\r\n";

    fs.appendFile(logPath, msg,
        fs_appendFile_ready);
}

/**
 * Logs a message to a log file
 *
 * @param {string} tag
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function logMessage(tag, message, sender) {
    const timeText    = timeToString( Date.now() );
    const senderText  = sender ? "[" + sender + "] " : "";
    const messageText = typeof message === "string" ? message : JSON.stringify(message);
    const logText     = timeText + " " + tag + " " + senderText + messageText + "\r\n";

    fs.appendFile(logPath, logText,
        fs_appendFile_ready);
}

function timeToString(time) {
    const date  = new Date(time);
    const year  = date.getFullYear();
    const month = date.getMonth()   <  9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day   = date.getDate()    < 10 ? "0" + date.getDate()        : date.getDate();
    const hour  = date.getHours()   < 10 ? "0" + date.getHours()       : date.getHours();
    const min   = date.getMinutes() < 10 ? "0" + date.getMinutes()     : date.getMinutes();
    const sec   = date.getSeconds() < 10 ? "0" + date.getSeconds()     : date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

function fs_appendFile_ready(err) {
    if (err) {
        console.error(err);
    }
}

module.exports = {
    init,
    error,
    info,
    text,
};
