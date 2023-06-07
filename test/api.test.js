"use strict";

const {strictEqual}  = require("assert");
const {describe, it} = require("node:test");

const logger                                             = require("../index.js");
const {logDebug, logError, logInfo, logText, logSuccess} = require("../index");

describe("Test micro-logger", () => {
    describe("API", () => {
        it("init(path, options)", () => {
            strictEqual(typeof logger.init, "function");
        });

        it("logger.error(message, sender)", () => {
            strictEqual(typeof logger.error, "function");
            strictEqual(logger.error.length, 2);
        });

        it("logger.debug(message, sender)", () => {
            strictEqual(typeof logger.debug, "function");
            strictEqual(logger.debug.length, 2);
        });

        it("logger.info(message, sender)", () => {
            strictEqual(typeof logger.info, "function");
            strictEqual(logger.info.length, 2);
        });

        it("logger.success(message, sender)", () => {
            strictEqual(typeof logger.success, "function");
            strictEqual(logger.success.length, 2);
        });

        it("logger.text(message)", () => {
            strictEqual(typeof logger.text, "function");
            strictEqual(logger.text.length, 1);
        });

        it("logError(message, sender)", () => {
            strictEqual(typeof logError, "function");
            strictEqual(logError.length, 2);
        });

        it("logDebug(message, sender)", () => {
            strictEqual(typeof logDebug, "function");
            strictEqual(logDebug.length, 2);
        });

        it("logInfo(message, sender)", () => {
            strictEqual(typeof logInfo, "function");
            strictEqual(logInfo.length, 2);
        });

        it("logSuccess(message, sender)", () => {
            strictEqual(typeof logSuccess, "function");
            strictEqual(logSuccess.length, 2);
        });

        it("logText(message)", () => {
            strictEqual(typeof logText, "function");
            strictEqual(logText.length, 1);
        });
    });
});
