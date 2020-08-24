"use strict"

const fs     = require("fs");
const path   = require("path");
const assert = require("assert");
const {init, test, ensure} = require("@popovmp/micro-tester");

const logger = require("../index.js");

init("Test micro-logger");

const logPath = path.join(__dirname, "/logs/log.txt");
logger.init(logPath);

test("Have an `init` function", () => {
    assert.strictEqual(typeof logger.init, "function");
});

test("Have an `error` function", () => {
    assert.strictEqual(typeof logger.error, "function");
});

test("Have an `info` function", () => {
    assert.strictEqual(typeof logger.info, "function");
});

test("Have a `text` function", () => {
    assert.strictEqual(typeof logger.text, "function");
});

test("Log file is created", () => {
    assert.ok(fs.existsSync(logPath));
});

test("Log info", () => {
    logger.info("FOO", "sender.foo");
});

test("Log error", () => {
    logger.error("BAR");
});

test("Log text", () => {
    logger.text("foo-bar");
});

// Sleep for 1 secs to give time for the log to update
// We hope that it will be enough.
// There is no callback report from the log to make it faster and simpler.
setTimeout(checkLogContent, 1000);

function checkLogContent() {
    const content = fs.readFileSync(logPath, "utf-8");

    test("Check info content", () => {
        assert.match(content, /INFO.*FOO/);
    });

    test("Check error content", () => {
        content.match(/ERROR.*BAR/);
    });

    test("Check text content", () => {
        content.match(/INFO.*FOO/)
    });

    test("Check sender", () => {
        content.match(/INFO.*FOO/);
    });

    fs.unlinkSync(logPath);
    fs.rmdirSync(path.dirname(logPath));

    ensure();
}
