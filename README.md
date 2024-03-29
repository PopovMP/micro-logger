# A simple Logger helper for nodejs

**micro-logger** is a straightforward, zero dependencies library for logging. It logs to a single predefined file.
When an option `{tee: true}` is given, **micro-logger** shows colored messages in the console.
If a log file is not defined, **micro-logger** writes to the console only.

Homepage: https://github.com/popovmp/micro-logger

## Synopsis

```javascript
// Intialize `micro-logger`in your index.js
const logger = require("@popovmp/micro-logger").init("./logs/log.txt");
logger.info("App started", "app::index");

// Use it in your other files
const logger = require("@popovmp/micro-logger");
logger.info("Hello World!", "app::sayHello");

// Alternative use
const {logInfo, logError, logText, logDebug, logSuccess} = require("@popovmp/micro-logger");
logInfo("Mamma mia!");
```

## Installation

```
npm install @popovmp/micro-logger
```

## Usage

**micro-logger** must be initialized with the path to the log file in order to write the log.
It is a good idea to set the path relative to `__dirname`.

If you don't want the logger to write to a file, you may skip the `init` part or to call it without args.
The logger will only show the messages in the terminal in that case.

If **micro-logger** is not initialized, it writes to the console.
It allows it to be used in modules without initialization.

You have to initialize the logger only once. It is best to do it in the application main script `index.js` or `app.js`.

**micro-logger** writes to the log file asynchronously (aka Fire and Forget).
You can log only a message, or a message and sender. Sender can be a method name or other hint.

There are three log methods: `logger.info`, `logger.error`, and `logger.text`.

The methods `logger.info`, `logger.error` logs:

  - a date and time in [yyyy-dd-MM hh:mm:ss] format
  - tag `[INFO]` or `[ERROR]`. the tags help to search the log file or `grep` it by a tag.
  - sender (optional) in `[sender]` format (if provided).

The `logger.text` method logs only the provided message. It doesn't log a date, a label or a sender.

```javascript
const path = require("path");
const {
 logInfo, logText, logError, logDebug, logSuccess, getLastError,
} = require("@popovmp/micro-logger").init( path.join(__dirname, "logs/log.txt"), {tee: true, suppress: ["debug"]} );

logInfo("Hello, World!");                          // => 2020-08-21 06:21:11 [INFO] Hello, World!
logInfo("GET index", "app::router");               // => 2020-08-21 06:21:11 [INFO] [app::router] GET index
logError("Ohh!", "bank::delete-account");          // => 2020-08-21 06:21:11 [ERROR] [bank::delete-account] Ohh!
logText("So Long, and Thanks for All the Fish!");  // => So Long, and Thanks for All the Fish!
```

## Last error

**micro-logger** has two methods for getting and resetting the last logged error message: `getLastError` and `resetLastError`.

`getLastError` returns the last logged error message by the `logError` or `logger.error` methods.

You can reset the last error with the `resetLastError` method. When `resetLastError` is called without parameters,
it sets the last error to `undefined`. `resetLastError` can be called with `null` to set the last error to `null`.


```javascript
getLastError();         // undefined
logError("some eror");
getLastError();         // some error
resetLastError();
getLastError();         // undefined
```
## Options

The `init` method accepts an options `options` parameter. It has two property `tee: boolean` and `suppress: string[]`.

When `tee` is set to `true`, the logger doubles the message on the console.

The `suppress` parameter accepts a string[]. It suppresses the logging of the tags included.

The possible values are:

```json
{
 "suppress": ["debug", "text", "info", "error", "success"]
}
```

The default values of `suppress` is an empty list.

```javascript
const path   = require("path");
const logger = require("@popovmp/micro-logger");
logger.init(path.join(__dirname, "logs/log.txt"), {tee: true});

logger.info("Foo"); // Logs 'Foo', Prints 'Foo' on the console.
```

## Methods

**micro-logger** exports the following methods:

```javascript
/**
 * Sets the log path
 * @function init
 *
 * @param {string} logFilePath
 * @param {LoggerOptions} [options]
 *
 * @returns { {init, error, info, text} }
 */
logger.init(logFilePath, options);
```

```javascript
/**
 * Logs a debug message to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logDebug(message, sender);
```

```javascript
/**
 * Logs a message to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logInfo(message, sender);
```

```javascript
/**
 * Logs an error to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logEror(message, sender);
```

```javascript
/**
 * Logs a success information to a log file
 *
 * @param {object|string} message
 * @param {string} [sender]
 */
logSuccess(message, sender);
```

```javascript
/**
 * Logs an error to a log file
 *
 * @param { string } message
 */
logText(message);
```

```javascript
/**
 * Logs a debug message to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logger.debug(message, sender);
```

```javascript
/**
 * Logs a message to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logger.info(message, sender);
```

```javascript
/**
 * Logs an error to a log file
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logger.error(message, sender);
```

```javascript
/**
 * Logs a success information to a log file
 *
 * @param {object|string} message
 * @param {string} [sender]
 */
logger.success(message, sender);
```

```javascript
/**
 * Logs an error to a log file
 *
 * @param { string } message
 */
logger.text(message);
```

## License

`micro-logger` is free for use and modification. No responsibilities for damages of any kind.

Copyright (c) 2020 Miroslav Popov
