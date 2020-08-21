"use strict"

const fs   = require("fs");
const path = require("path");

const logger = require("../index.js");

const logPath = path.join(__dirname, "/logs/log.txt");
logger.init(logPath);

test("Have an `init` function", () =>
    typeof logger.init === "function"
);

test("Have an `error` function", () =>
    typeof logger.error === "function"
);

test("Have an `info` function", () =>
    typeof logger.info === "function"
);

test("Have a `text` function", () =>
    typeof logger.text === "function"
);

test("Log file is created", () =>
    fs.existsSync(logPath)
);

test("Log info", () =>
    logger.info("FOO", "sender.foo") || true
);

test("Log error", () =>
    logger.error("BAR") || true
);

test("Log text", () =>
    logger.text("foo-bar") || true
);

// Sleep for 1 secs to give time for the log to update
// We hope that it will be enough.
// There is no callback report form the log to make it faster and simpler.
setTimeout(checkLogContent, 1000);

function checkLogContent() {
    const content = fs.readFileSync(logPath, "utf-8");

    test("Check info content", () =>
        content.match(/INFO.*FOO/)
    );

    test("Check error content", () =>
        content.match(/ERROR.*BAR/)
    );

    test("Check text content", () =>
        content.match(/foo-bar/)
    );

    test("Check sender", () =>
        content.match(/sender\.foo/)
    );

    fs.unlinkSync(logPath);
    fs.rmdirSync(path.dirname(logPath));

    // Tests end
    done();
}

function test(message, test) {
    if (!global.__testResults) {
        global.__testResults = {index: 0, success: 0, fail: 0};
    }

    global.__testResults.index++;

    try {
        const ans = test();
        if (ans) {
            console.log(global.__testResults.index + ". ✅ " + message);
            global.__testResults.success++;
        } else {
            console.error(global.__testResults.index + ". ❌ " + message);
            global.__testResults.fail++;
        }
    } catch (e) {
        console.error(global.__testResults.index + ". ❌ " + message + ": " + e.message);
        global.__testResults.fail++;
    }
}

function done() {
    const message = `Success: ${global.__testResults.success}` +
        ` of ${global.__testResults.index}` +
        `, Failed: ${global.__testResults.fail}`;
    delete global.__testResults;
    console.log(message);
}
