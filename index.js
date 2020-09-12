'use strict';

const os   = require('os');
const fs   = require('fs');
const path = require('path');

/**
 * @typedef {object} LoggerOptions
 *
 * @property { boolean  } [tee=false]
 * @property { string[] } [suppress=[]] - tags to suppress. Possibilities: ['debug', 'error', 'info', 'success', 'text']
 */

/**
 * @type {LoggerOptions}
 */
const loggerOptions = {
    tee: false,
    suppress: [],
};

/** @type {string} */
let logPath = "";
let isInit  = false;

const tags = {
    debug   : '[DEBUG]',
    error   : '[ERROR]',
    info    : '[INFO]',
    success : '[SUCCESS]',
    text    : '',
}

const colors = {
    reset   : '\x1b[0m',
    debug   : '\x1b[33m', // yellow
    error   : '\x1b[31m', // red
    info    : '',
    success : '\x1b[32m', // green
    text    : '',
}

/**
 * Sets the log path
 *
 * @param { string        } logFilePath
 * @param { LoggerOptions } [options]
 *
 * @return { {init, error, info, text} }
 */
function init(logFilePath, options) {
    if (isInit) {
        // Already initialised
        return module.exports;
    }

    logPath = logFilePath;
    isInit  = true;

    if (options) {
        if (typeof options.tee === 'boolean') {
            loggerOptions.tee = options.tee;
        }

        if (Array.isArray(options.suppress)) {
            loggerOptions.suppress = options.suppress.slice();
        }
    }

    if ( !fs.existsSync(logPath) ) {
        fs.mkdirSync(path.dirname(logPath), {recursive: true});
        fs.writeFileSync(logPath, '', 'utf8');
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
    logMessage('error', message, sender);
}

/**
 * Logs a debug message to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function debug(message, sender) {
    logMessage('debug', message, sender);
}

/**
 * Logs a message to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function info(message, sender) {
    logMessage('info', message, sender);
}

/**
 * Logs a success message to a log file
 *
 * @param { string } message
 * @param { string } [sender]
 */
function success(message, sender) {
    logMessage('success', message, sender);
}

/**
 * Logs a text message
 *
 * @param {string} message
 */
function text(message) {
    logMessage('text', message);
}

/**
 * Logs a message to a log file
 *
 * @param { string } tag
 * @param { Error|object|string } message
 * @param { string } [sender]
 */
function logMessage(tag, message, sender) {
    if (loggerOptions.suppress.includes(tag)) {
        return;
    }

    const text = ['info', 'error', 'debug', 'success'].includes(tag)
         ? composeMessage(tag, message, sender)
         : message;

    if (isInit) {
        fs.appendFile(logPath, text + os.EOL, err => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    if (!isInit || loggerOptions.tee) {
        console.log(colors[tag] + text + colors.reset);
    }
}

/**
 * Composes the log text
 *
 * @param {string} tag
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
function composeMessage(tag, message, sender) {
    const timeText    = timeToString( Date.now() );
    const senderText  = sender ? '[' + sender + '] ' : '';
    const messageText = typeof message === 'object' || Array.isArray(message)
        ? message.message
             ? message.message
             : JSON.stringify(message, null, 2)
        : String(message);

    return  timeText + ' ' + tags[tag] + ' ' + senderText + messageText;
}

/**
 * Formats time to string
 *
 * @param {number} time
 * @returns {string}
 */
function timeToString(time) {
    const date  = new Date(time);
    const year  = date.getFullYear();
    const month = date.getMonth()   <  9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day   = date.getDate()    < 10 ? '0' + date.getDate()        : date.getDate();
    const hour  = date.getHours()   < 10 ? '0' + date.getHours()       : date.getHours();
    const min   = date.getMinutes() < 10 ? '0' + date.getMinutes()     : date.getMinutes();
    const sec   = date.getSeconds() < 10 ? '0' + date.getSeconds()     : date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

module.exports = {
    init,
    error,
    info,
    text,
    debug,
    success,
    logError  : error,
    logInfo   : info,
    logText   : text,
    logDebug  : debug,
    logSuccess: success,
};
