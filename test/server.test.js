'use strict';

// Contract tests for the two plain-text endpoints served by server.js.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../server.js');

// Media type both endpoints must declare. res.type('text/plain') in server.js
// produces it; a bare res.send(string) would label the body text/html instead.
const PLAIN_TEXT = 'text/plain; charset=utf-8';

// Runs fn(baseUrl) against a fresh server bound to an ephemeral port chosen by
// the operating system, so the suite never collides with a service started by
// `npm start`, and closes that server once fn settles, pass or fail, or as
// soon as the server itself reports an error.
//
// Each test takes its own server from this helper instead of sharing one set
// up by a root-level hook: on Node 20.0.0 root-level hooks do not run ahead of
// top-level tests, so a shared base URL would still be undefined when the
// first request is made. The per-test shape is what keeps the engines.node
// floor of >=20.0.0 in package.json true.
//
// A server 'error' fails the test at whichever stage it arrives, and no
// listener outlives the stage it serves. A listener left behind would still
// absorb later errors, so Node would neither throw them nor fail the test:
// - Before 'listening', the helper rejects with the error and fn never runs.
//   Whichever of the two readiness events fires first removes the listener
//   for the other.
// - While fn runs, fn races serverFailed, so the error fails the test at once
//   rather than after fn finishes.
// - During close, the error is thrown once close completes, unless fn has
//   already failed the test with an error of its own.
// An error after 'listening' also drops the open connections, so a request
// still in flight cannot hold close() open and hang the test.
async function withServer(fn) {
  const server = app.listen(0);
  await new Promise((resolve, reject) => {
    const onListening = () => {
      server.removeListener('error', onSetupError);
      resolve();
    };
    const onSetupError = (err) => {
      server.removeListener('listening', onListening);
      reject(err);
    };
    server.once('listening', onListening);
    server.once('error', onSetupError);
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  // Stays installed from here until close completes. Only the first error is
  // kept; a flag rather than the value marks it, so even an 'error' emitted
  // without an argument is not mistaken for no error.
  let serverErrored = false;
  let serverError;
  let failTest;
  const serverFailed = new Promise((resolve, reject) => {
    failTest = reject;
  });
  const onServerError = (err) => {
    if (!serverErrored) {
      serverErrored = true;
      serverError = err;
      failTest(err);
    }
    server.closeAllConnections();
  };
  server.on('error', onServerError);

  try {
    // Promise.race subscribes to both promises, so whichever settles second
    // is still handled and never surfaces as an unhandled rejection.
    await Promise.race([fn(baseUrl), serverFailed]);
  } finally {
    try {
      await new Promise((resolve, reject) =>
        server.close((err) => (err ? reject(err) : resolve()))
      );
    } finally {
      server.removeListener('error', onServerError);
    }
  }
  if (serverErrored) {
    throw serverError;
  }
}

// Every test reads the body in full before asserting anything, so no response
// stream is left pending when the helper closes the server, even on failure.

test('GET / responds 200 text/plain "Hello world"', async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/`);
    const body = await res.text();
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-type'), PLAIN_TEXT);
    assert.equal(body, 'Hello world');
  });
});

test('GET /good-evening responds 200 text/plain "Good evening"', async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/good-evening`);
    const body = await res.text();
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-type'), PLAIN_TEXT);
    assert.equal(body, 'Good evening');
  });
});

test('GET /nope responds 404 for an unregistered path', async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/nope`);
    // Express's default final handler writes an HTML page that embeds the
    // requested path. That page is not part of the contract, so only the
    // status is asserted; the body is read solely to drain the stream.
    await res.text();
    assert.equal(res.status, 404);
  });
});
