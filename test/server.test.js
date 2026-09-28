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
// `npm start`, and closes that server once fn settles, pass or fail.
//
// Each test takes its own server from this helper instead of sharing one set
// up by a root-level hook: on Node 20.0.0 root-level hooks do not run ahead of
// top-level tests, so a shared base URL would still be undefined when the
// first request is made. The per-test shape is what keeps the engines.node
// floor of >=20.0.0 in package.json true.
async function withServer(fn) {
  const server = app.listen(0);
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve()))
    );
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
