'use strict';

// Express service answering two fixed plain-text endpoints. It is an entry
// point independent of Hello.java: launched with `npm start`, it serves no
// Java output, and Hello.java is not the source of any HTTP response.
const express = require('express');

const app = express();

// Match routes exactly. Express's defaults ignore letter case and a trailing
// slash, so variants such as /GOOD-EVENING and /good-evening/ would otherwise
// be answered with a greeting; with both settings on, every path other than
// the two registered ones falls through to Express's built-in 404. Both must
// be set before the first route: the router is created then and reads them
// only once.
app.set('case sensitive routing', true);
app.set('strict routing', true);

const DEFAULT_PORT = 3000;

// Returns the TCP port to bind, or null so a bad PORT is rejected before
// anything is bound. app.listen mishandles what the checks exclude: a
// non-numeric string binds an IPC socket path instead of a TCP port, 0 binds
// a port chosen by the OS that the startup line cannot name, and a number
// above 65535 throws instead of reaching the listen callback. Returning a
// number drops leading zeros, so the startup line names the port bound.
function resolvePort(value) {
  if (value === undefined || value === '') {
    return DEFAULT_PORT;
  }
  if (!/^[0-9]+$/.test(value)) {
    return null;
  }
  const port = Number(value);
  return port >= 1 && port <= 65535 ? port : null;
}

// Each handler sets text/plain explicitly: a bare res.send(string) would label
// the body text/html. The literals are sent as-is, with no trailing newline.
app.get('/', (req, res) => {
  res.type('text/plain').send('Hello world');
});

app.get('/good-evening', (req, res) => {
  res.type('text/plain').send('Good evening');
});

// Bind only when run directly, so a test can require the app and listen on a
// port of its own choosing; PORT is resolved here for the same reason, not
// at load. Express 5 passes a bind failure to the listen callback instead of
// throwing it. A rejected PORT is handed to that same callback before
// anything is bound, so the service keeps a single failure branch and its
// two console calls rather than growing a second error path. Shutdown is
// left to Node's default SIGINT/SIGTERM handling on purpose, with no
// server.close() and no drain: keep-alive or in-flight connections still
// open at that moment are cut. The handlers hold no state and write nothing,
// so a client can safely retry a request that was cut.
if (require.main === module) {
  const port = resolvePort(process.env.PORT);
  const onListen = (error) => {
    if (error) {
      // A rejected PORT has no port to name, and its raw text is never echoed.
      const target = port === null ? '' : ` ${port}`;
      console.error(`Failed to bind port${target}: ${error.message}`);
      process.exitCode = 1;
      return;
    }
    console.log(`Hello service listening on http://localhost:${port}`);
  };
  if (port === null) {
    onListen(new RangeError('PORT must be a decimal integer from 1 to 65535'));
  } else {
    app.listen(port, onListen);
  }
}

module.exports = { app };
