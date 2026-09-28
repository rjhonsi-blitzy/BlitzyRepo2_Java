// Express service answering two fixed plain-text endpoints. It is an entry
// point independent of Hello.java: launched with `npm start`, it serves no
// Java output, and Hello.java is not the source of any HTTP response.
const express = require('express');

const app = express();

// Listening port used when the PORT variable is unset or empty.
const DEFAULT_PORT = 3000;

// Maps a raw PORT value to the TCP port to bind, or to null when the value
// must be rejected. Unset or empty selects DEFAULT_PORT. An override must be
// decimal digits only and name a port from 1 to 65535; it is returned as a
// number, so leading zeros are dropped ('031000' becomes 31000) and the
// startup line names the port actually bound. Anything else (text,
// whitespace, a sign, hex, a decimal point, 0, or a number above 65535)
// yields null, because app.listen would mishandle it: a non-numeric string
// binds an IPC socket path instead of a TCP port, 0 binds a port chosen by
// the OS that the startup line cannot name, and an out-of-range number
// throws instead of reaching the listen callback.
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
// open at that moment are cut, and because the handlers hold no state and
// write nothing, a client whose request is interrupted simply retries it.
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
