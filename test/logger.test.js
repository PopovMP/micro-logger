'use strict'

const fs   = require('fs');
const path = require('path');

const { ok, match, doesNotMatch } = require('assert');
const { describe, it } = require('@popovmp/mocha-tiny');

const logPath = path.join(__dirname, '/logs/log.txt');

if (fs.existsSync(logPath)) {
    fs.unlinkSync(logPath);
}

const { logDebug, logError, logInfo, logText, logSuccess } = require('../index').init(logPath, {tee: true, suppress: ['text']});

describe('micro-logger', () => {
    describe('init(path, options)', () => {
        it('creates a log file', () => {
            ok(fs.existsSync(logPath));
        });
    });

    describe('logInfo(message, sender)', () => {
        it('log an information message', () => {
            logInfo('The quick brown fox jumps over the lazy dog', 'alphabet');
        });
    });

    describe('logError(message, sender)', () => {
        it('log an Error', () => {
            logError(new Error('This is a serious error!'), 'mission :: critical');
        });
    });

    describe('logDebug(message, sender)', () => {
        it('log a debug information', () => {
            logDebug('The logger logs debug information', 'logger :: debug');
        });
    });

    describe('logSuccess(message, sender)', () => {
        it('log a success information', () => {
            logSuccess('micro-logger is a very micro logger', 'the author');
        });
    });

    describe('logText(message)', () => {
        it('log text (being ignored)', () => {
            logText('ignore this');
        });
    });
});

// Sleep for 1 secs to give time for the log to update
// We hope that it will be enough.
// There is no callback report from the log to make it faster and simpler.
setTimeout(checkLogContent, 1000);

function checkLogContent() {
    const content = fs.readFileSync(logPath, 'utf-8');

    describe('Log content', () => {

        it('info content persists', () => {
            match(content, /INFO.*alphabet.*fox/);
        });

        it('error content persists', () => {
            match(content, /ERROR.*error/);
        });

        it('debug content persists', () => {
            match(content, /DEBUG.*debug.*debug/)
        });

        it('success content persists', () => {
            match(content, /SUCCESS.*logger/)
        });

        it('text content is ignored', () => {
            doesNotMatch(content, /ignore/);
        });
    });

    fs.unlinkSync(logPath);
    fs.rmdirSync(path.dirname(logPath));
}
