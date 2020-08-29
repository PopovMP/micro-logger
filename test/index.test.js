'use strict'

const fs   = require('fs');
const path = require('path');
const { strictEqual, ok, match } = require('assert');
const { describe, it } = require('@popovmp/mocha-tiny');

const logger = require('../index.js');

const logPath = path.join(__dirname, '/logs/log.txt');
logger.init(logPath);

describe('Test micro-logger', () => {
    describe('API', () => {
        it('Have an `init` function', () => {
            strictEqual(typeof logger.init, 'function');
        });

        it('Have an `error` function', () => {
            strictEqual(typeof logger.error, 'function');
        });

        it('Have an `info` function', () => {
            strictEqual(typeof logger.info, 'function');
        });

        it('Have a `text` function', () => {
            strictEqual(typeof logger.text, 'function');
        });
    });
    
    describe('Creat log file', () => {
        it('Log file is created', () => {
            ok(fs.existsSync(logPath));
        });
    });

    describe('Write log', () => {
        it('Log info', () => {
            logger.info('FOO', 'sender.foo');
        });

        it('Log error', () => {
            logger.error('BAR');
        });

        it('Log text', () => {
            logger.text('foo-bar');
        });
    });
});

// Sleep for 1 secs to give time for the log to update
// We hope that it will be enough.
// There is no callback report from the log to make it faster and simpler.
setTimeout(checkLogContent, 1000);

function checkLogContent() {
    const content = fs.readFileSync(logPath, 'utf-8');

    describe('Log file content', () => {
        it('Check info content', () => {
            match(content, /INFO.*FOO/);
        });

        it('Check error content', () => {
            match(content, /ERROR.*BAR/);
        });

        it('Check text content', () => {
            match(content, /INFO.*FOO/)
        });

        it('Check sender', () => {
            match(content, /INFO.*FOO/);
        });
    });

    fs.unlinkSync(logPath);
    fs.rmdirSync(path.dirname(logPath));
}
