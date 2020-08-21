"use strict";

const fs = require("fs");
const path = require("path");

/** @type {string} */
let logPath = "";
let isInit  = false;

/**
 * Sets the log path
 * @function init
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
 * @function error
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function error(message, sender) {
    logMessage("[ERROR]", message, sender);
}

/**
 * Logs a message to a log file
 * @function info
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function info(message, sender) {
    logMessage("[INFO]", message, sender);
}

/**
 * Logs a text message
 * @function text
 * @param {string} message
 */
function text(message) {
    const msg = message + "\r\n";

    fs.appendFile(logPath, msg,
        fs_appendFile_ready);
}

/**
 * Logs a message to a log file
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
    return `${year}-${month}-${day} ${hour}:${min}`;
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
