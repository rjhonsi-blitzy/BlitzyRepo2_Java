// Express service answering two fixed plain-text endpoints. It is an entry
// point independent of Hello.java: launched with `npm start`, it serves no
// Java output, and Hello.java is not the source of any HTTP response.
const express = require('express');

const app = express();

// Listening port: 3000 by default, overridable through the PORT variable.
const PORT = process.env.PORT || 3000;

// Each handler sets text/plain explicitly: a bare res.send(string) would label
// the body text/html. The literals are sent as-is, with no trailing newline.
app.get('/', (req, res) => {
  res.type('text/plain').send('Hello world');
});

app.get('/good-evening', (req, res) => {
  res.type('text/plain').send('Good evening');
});

// Bind only when run directly, so a test can require the app and listen on a
// port of its own choosing. Express 5 passes a bind failure to this callback
// instead of throwing it. Shutdown is left to Node's default SIGINT/SIGTERM
// handling on purpose: the handlers hold no state and nothing needs draining.
if (require.main === module) {
  app.listen(PORT, (error) => {
    if (error) {
      console.error(`Failed to bind port ${PORT}: ${error.message}`);
      process.exitCode = 1;
      return;
    }
    console.log(`Hello service listening on http://localhost:${PORT}`);
  });
}

module.exports = { app };
