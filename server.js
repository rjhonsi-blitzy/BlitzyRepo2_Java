'use strict'; // Strict mode makes accidental globals and silent errors throw.

// Express service answering two fixed plain-text endpoints. It is an entry
// point independent of Hello.java: launched with `npm start`, it serves no
// Java output, and Hello.java is not the source of any HTTP response.

// Express 5 is the service's only dependency.
const express = require('express');

// One application serves both routes; it is exported below for the tests.
const app = express();

// Exact routing. Express's defaults ignore letter case and a trailing slash,
// so /GOOD-EVENING and /good-evening/ would otherwise get a greeting; with
// both settings on, every other path falls through to Express's built-in 404.
// Both must be set before the first route: the router is created then and
// reads them only once.
app.set('case sensitive routing', true); // /GOOD-EVENING is not /good-evening
app.set('strict routing', true); // /good-evening/ is not /good-evening

// Port bound when PORT is unset or empty.
const DEFAULT_PORT = 3000;

// Turns the raw PORT text into the TCP port to bind, or returns null so a bad
// value is rejected before anything is bound. Each check excludes a value
// that app.listen would mishandle.
function resolvePort(rawPort) {
  // Unset or empty: use the default.
  if (rawPort === undefined || rawPort === '') {
    return DEFAULT_PORT;
  }
  // Decimal digits only. Non-numeric text would bind an IPC socket path
  // instead of a TCP port, and signs, spaces, fractions, exponents and hex
  // would otherwise be converted by Number().
  if (!/^[0-9]+$/.test(rawPort)) {
    return null;
  }
  // Number() drops leading zeros, so the startup line names the port bound.
  const port = Number(rawPort);
  // 1 to 65535 only: 0 binds an OS-chosen port the startup line cannot name,
  // and a value above 65535 throws instead of reaching the listen callback.
  return port >= 1 && port <= 65535 ? port : null;
}

// Each handler sets text/plain explicitly: a bare res.send(string) would label
// the body text/html. The literals are sent as-is, with no trailing newline.

// GET / answers with the first greeting.
app.get('/', (req, res) => {
  res.type('text/plain').send('Hello world');
});

// GET /good-evening answers with the second greeting.
app.get('/good-evening', (req, res) => {
  res.type('text/plain').send('Good evening');
});

// Bind only when run directly, so a test can require the app and listen on a
// port of its own choosing; requiring the module binds nothing.
//
// Shutdown is left to Node's default SIGINT/SIGTERM handling on purpose, with
// no server.close() and no drain, so keep-alive or in-flight connections still
// open at that moment are cut. The handlers hold no state and write nothing,
// so a client can safely retry a request that was cut.
if (require.main === module) {
  // PORT is resolved here rather than at load for the same reason, so
  // requiring the module never reads PORT.
  const port = resolvePort(process.env.PORT);

  // Listen callback holding the service's single failure branch. Express 5
  // passes a bind failure such as EADDRINUSE here instead of throwing it.
  const onListen = (error) => {
    if (error) {
      // Failure, on stderr. A rejected PORT has no port to name, and its raw
      // text is never echoed.
      const portSuffix = port === null ? '' : ` ${port}`;
      console.error(`Failed to bind port${portSuffix}: ${error.message}`);
      process.exitCode = 1; // Nothing is bound, so the process then exits 1.
      return;
    }
    // Success: the startup line, on stdout.
    console.log(`Hello service listening on http://localhost:${port}`);
  };

  // A rejected PORT is handed to the same callback before anything is bound,
  // so the service keeps one failure branch and two console calls.
  if (port === null) {
    onListen(new RangeError('PORT must be a decimal integer from 1 to 65535'));
  } else {
    app.listen(port, onListen);
  }
}

// The app itself is exported, unbound, so tests can call app.listen(0).
module.exports = { app };
