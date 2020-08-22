"use strict";

/**
 * Testing stats
 * @type {object}
 * @property {number} index
 * @property {number} passed
 * @property {number} failed
 */
const stats = {};

/**
 * Resets the stats and shows teh message
 * @param {string} message
 */
function init(message) {
    console.log(message);
    resetStats();
}

/**
 * Performs a test
 *
 * @param {string} message
 * @param {function} testFunction - When return: truthy - test pass, faulty - test fails
 */
function test(message, testFunction) {
    stats.index++;

    try {
        const ans = testFunction();
        if (ans) {
            console.log(stats.index + ". ✅ " + message);
            stats.passed++;
        } else {
            console.error(stats.index + ". ❌ " + message);
            stats.failed++;
        }
    } catch (e) {
        console.error(stats.index + ". ❌ " + message + ": " + e.message);
        stats.failed++;
    }
}

/**
 * Called at the end of testing.
 * It resets the stats.
 * It throws error on failed tests.
 */
function done() {
    console.log(`Passed: ${stats.passed} of ${stats.index}, Failed: ${stats.failed}`);
    const failed = stats.failed;

    resetStats();

    if (failed) {
        throw new Error("Tests failed: " + failed);
    }
}

function resetStats() {
    stats.index  = 0;
    stats.passed = 0;
    stats.failed = 0;
}

module.exports = {
    init,
    test,
    done
}
