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
// `npm start`. A server that fails before 'listening' has bound nothing, so
// the helper rejects without closing it and fn never runs. Once listening, the
// server starts closing when fn settles, pass or fail, or as soon as it
// reports an error, and the helper settles only after close completes.
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
// - While fn runs, the error starts teardown immediately, and because fn
//   races serverFailed, the test fails with it once cleanup completes rather
//   than after fn finishes.
// - During close, the error fails the test once close completes, unless fn
//   has already failed it.
// Of several failures the test reports the first in this order: the error
// that settled the race (fn's own or the server's), a server error that
// arrived after fn passed, a close failure. A close failure is therefore
// reported only when nothing else failed and never replaces an earlier error.
// An error after 'listening' first stops the server accepting connections,
// then drops the HTTP connections it has already accepted. In that order none
// can be accepted after the drop and left to hold close() open.
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

  // A second server.close() reports ERR_SERVER_NOT_RUNNING, so the error
  // listener and the finally block share one close. It settles with close's
  // error, or undefined, rather than rejecting, so the listener can start it
  // without awaiting it and no rejection goes unhandled.
  let closed;
  const closeServer = () => {
    if (!closed) {
      closed = new Promise((resolve) => server.close((err) => resolve(err)));
    }
    return closed;
  };

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
    closeServer();
    server.closeAllConnections();
  };
  server.on('error', onServerError);

  let closeError;
  try {
    // Promise.race subscribes to both promises, so whichever settles second
    // is still handled and never surfaces as an unhandled rejection.
    await Promise.race([fn(baseUrl), serverFailed]);
  } finally {
    try {
      closeError = await closeServer();
    } finally {
      server.removeListener('error', onServerError);
    }
  }
  // Reached only when fn passed: a failed race has already propagated from the
  // try block, which closeServer() cannot override because it never rejects.
  if (serverErrored) {
    throw serverError;
  }
  if (closeError) {
    throw closeError;
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
