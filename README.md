# A simple Logger helper for nodejs

**micro-logger** is a very simple, zero dependencies library for logging.

Homepage: https://github.com/popovmp/micro-logger

## Synopsis

```javascript
// Intialize `micro-logger`in your index.js
const logger = require("micro-logger").init("./logs/log.txt");
logger.info("App started", "app::index");

// Use it in your other files
const logger = require("micro-logger");
logger.info("Hello World!", "app::sayHello");
```

## Installation

```
npm install @popovmp/micro-logger
```

## Usage

**micro-logger** must be initialized with the path to the log file in order to write the log.
It is a good idea to set the path relative to `__dirname`.

If **micro-logger** is not initialized, it writes to teh console.
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
const logger = require("micro-logger").init( path.join(__dirname, "logs/log.txt") );

logger.info("Hello World");                    // 2020-08-21 06:21:11 [INFO] Hello World
logger.info("GET index", "app::router");       // 2020-08-21 06:21:11 [INFO] [app::router] GET index
logger.error("Ohh!", "bank::delete-account");  // 2020-08-21 06:21:11 [ERROR] [bank::delete-account] Ohh!
logger.text("So Long, and Thanks for All the Fish!");  // So Long, and Thanks for All the Fish!
```

## Options

The `init` method accepts an options `options` parameter. It has one property `tee: boolean`. 

When `tee` is set to `true`, the logger doubles the message on the console.

```javascript
const path = require("path");
const logger = require("micro-logger");
logger.init( path.join(__dirname, "logs/log.txt"), {tee: true} );

logger.info("Foo"); // Logs "Foo", Prints "Foo" on the console.
```

## Methods

**micro-logger** exports four methods:

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
 * Logs a message to a log file
 * @function info
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logger.info(message, sender);
```

```javascript
/**
 * Logs an error to a log file
 * @function error
 *
 * @param {Error|object|string} message
 * @param {string} [sender]
 */
logger.error(message, sender);
```

```javascript
/**
 * Logs an error to a log file
 * @function text
 *
 * @param { string } message
 */
logger.text(message);
```

## License

`micro-logger` is free for use and modification. No responsibilities for damages of any kind.

Copyright (c) 2020 Miroslav Popov
