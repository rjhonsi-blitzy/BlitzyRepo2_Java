# Hello

## Summary of Changes

*Modified 2026-09-28.*

- *Added `package.json` and `package-lock.json`: express `^5.2.1`, resolved and pinned at 5.2.1.*
- *Added `server.js`: an Express service answering `GET /` and `GET /good-evening`.*
- *Added `test/server.test.js`: one assertion set per endpoint, run by `npm test`.*
- *Added `.gitignore` and `.nvmrc`: `node_modules/` untracked, Node 24.21.0 recorded.*
- *Updated `README.md`: prerequisites, run commands, output contract and layout.*
- *Updated `blitzy/documentation/Project Guide.md`: the same claims in the development record.*

## Overview

The repository holds two independently launchable components that share no code and no process: the Java console program `Hello` and an Express HTTP service in `server.js`. Neither one starts, calls or depends on the other.

`Hello` is a minimal single-class Java console application. It writes one fixed greeting to standard output and then terminates; it reads no input, opens no resource and keeps no state. The class is declared in the default package and imports nothing outside `java.lang`, which is why it is launched by the bare class name `Hello` rather than by a package-qualified name.

Source: Hello.java (class Hello)

`server.js` is an Express service that answers `GET /` with `Hello world` and `GET /good-evening` with `Good evening`, both as plain text. It is launched with `npm start`, independently of the Java program. `Hello.java` is not the source of any HTTP response, and neither HTTP body is the console greeting.

Source: server.js (route handlers)

## Requirements

For the Java program, a JDK is all that is required. This repository pins no Java version: it carries no `pom.xml`, `build.gradle`, `.java-version`, `.sdkmanrc`, CI descriptor or `module-info.java` in which a version could be recorded. The Java path also uses no dependency manifest (`package.json` belongs to the service alone), so nothing has to be resolved or downloaded before building `Hello.java`.

One prerequisite is specific to a single launch path. The direct source launch `java Hello.java` shown under Run is single-file source-code launch, which needs JDK 11 or later. The compile-then-run path carries no such floor and works on considerably older releases.

For the Express service, Node.js and npm are required. The supported floor is Node.js 20.0.0, declared as `>=20.0.0` in the `engines.node` field of `package.json`. The version the service is developed and verified on is Node.js 24.21.0, recorded in `.nvmrc`, with the npm 11.19.0 bundled in that release. `npm ci` installs the 68 packages pinned in `package-lock.json`, and on a machine whose npm cache is cold it needs access to the registry at `registry.npmjs.org` to fetch them. The lock file makes every install resolve the identical tree; it does not make the install work offline.

Any Node.js 24.21.0 on `PATH` serves; `node -v` then prints `v24.21.0`. The nvm version manager is optional. It can select the version recorded in `.nvmrc`, but it is a shell function rather than a program on `PATH`, so a shell that has not loaded it reports `nvm: command not found`. Load it from its install directory, named by `NVM_DIR`, then select the version from the repository root:

```bash
export NVM_DIR=/opt/nvm   # nvm's install directory; a default per-user install uses $HOME/.nvm
. "$NVM_DIR/nvm.sh"       # loads the nvm shell function into this shell
nvm install && nvm use    # reads .nvmrc and selects Node.js 24.21.0
```

In a shell that has already loaded nvm, where `command -v nvm` prints `nvm`, the last line alone is enough.

## Build

Compile from the repository root:

```bash
javac Hello.java
```

The compiler exits with status 0 and emits no diagnostics. Compiling this way leaves a `Hello.class` file next to the source, and the repository's `.gitignore` covers only `node_modules/`, so that file still shows up as untracked content in `git status`. To keep the working tree clean, direct the class output to a directory created fresh for the run outside the checkout, as in `B="$(mktemp -d)" && javac -d "$B" Hello.java`, then launch the class from there with `java -cp "$B" Hello`. Let `mktemp -d` generate that directory: it returns a uniquely named one readable only by its owner, whereas a fixed, predictable destination can be pre-created, replaced or redirected through a symbolic link by another local process before the compiler writes into it. Do not commit the class file either way.

The Express service has no build step: `server.js` runs as written, and `npm ci`, shown under Run, is its only preparation.

## Run

Launch the compiled class by its bare name, from the repository root:

```bash
java Hello
```

Alternatively, run the source file directly without compiling it first. This path needs JDK 11 or later and leaves no class file behind:

```bash
java Hello.java
```

Both paths produce byte-identical standard output. Command-line arguments are accepted but never consulted:

| Aspect | Contract |
| --- | --- |
| `String[] args` parameter | Accepted only to satisfy the entry-point signature that the JVM requires of a launchable class. |
| Arguments supplied at launch | Never read. The array is not dereferenced anywhere, so the output is identical whether or not arguments are passed. |

Source: Hello.java (Hello.main)

The Express service is launched separately. First install its dependencies strictly from the committed lock file, from the repository root:

```bash
npm ci
```

Then start the service:

```bash
npm start
```

It prints `Hello service listening on http://localhost:3000` and stays resident, answering requests until you stop it with Ctrl-C. The port defaults to 3000, and the `PORT` environment variable overrides it, as in `PORT=8080 npm start`; the startup line then names that port, and requests must be sent to it. An override must be a decimal integer from 1 to 65535, and leading zeros are dropped, so `PORT=08080` listens on and reports port 8080. Any other non-empty value, such as text, `0` or a number above 65535, is rejected before anything is bound: the service prints `Failed to bind port: PORT must be a decimal integer from 1 to 65535` to standard error and exits with a non-zero status. If the port is already in use, the service prints a `Failed to bind port` line to standard error and exits with a non-zero status.

From a second shell, request each endpoint. These requests assume the default port 3000:

```bash
curl -s http://localhost:3000/
curl -s http://localhost:3000/good-evening
```

After `PORT=8080 npm start`, send the same requests to port 8080 instead:

```bash
curl -s http://localhost:8080/
curl -s http://localhost:8080/good-evening
```

With `-s`, `curl` also stays silent when nothing is listening on the port: it prints nothing and exits with status 7, so a request that returns no output at all has not reached the service.

Neither body ends in a newline, so the shell prompt continues on the same line as the greeting.

Run the automated suite, which needs no running service because each test binds its own ephemeral port:

```bash
npm test
```

It reports three tests, three passing and none failing. With the TAP reporter, `npm test -- --test-reporter=tap` prints the counters `# tests 3`, `# pass 3` and `# fail 0`.

If you redirect the startup log, redirect it outside the checkout, for example `L="$(mktemp -d)" && npm start > "$L/start.log" 2>&1`. A log file written inside the checkout shows up as untracked content in `git status`, because `.gitignore` covers only `node_modules/`.

Source: server.js (route handlers, resolvePort and app.listen)

## Expected Output

Either launch path of the Java program writes the literal `Hello from Java!` followed by the platform line separator to standard output:

```text
Hello from Java!
```

The separator is the one the host defines, so the exact byte count varies between platforms; the literal and its single trailing separator do not. Standard error stays empty and the process exits with status 0. There is no `System.exit` call: `main` returns normally and the JVM then shuts down of its own accord, which is a deliberate property of the program rather than an omission.

The Express service answers two endpoints, each with a fixed plain-text body that is unrelated to the Java program's console greeting:

| Method | Path | Status | Content-Type | Body |
| --- | --- | --- | --- | --- |
| `GET` | `/` | 200 | `text/plain; charset=utf-8` | `Hello world` (11 bytes, no trailing newline) |
| `GET` | `/good-evening` | 200 | `text/plain; charset=utf-8` | `Good evening` (12 bytes, no trailing newline) |

Routes match exactly: paths are case-sensitive and a trailing slash is significant, so any other path, including `/GOOD-EVENING` and `/good-evening/`, gets the built-in Express 404 response, an HTML page; the service defines no custom 404 route.

## Project Layout

The repository holds eleven tracked files: eight at the root, one in `test/` and two in `blitzy/documentation/`.

| File | Purpose |
| --- | --- |
| [Hello.java](Hello.java) | The single Java source file: class `Hello` and its `main` entry point. |
| `server.js` | The Express service: both route handlers, the port binding and the exported `app`. |
| `package.json` | The npm manifest: the `express` dependency at `^5.2.1`, the `start` and `test` scripts, `engines.node` and the licence identifier. |
| `package-lock.json` | Generated by npm and never edited by hand: pins all 68 resolved packages by version and integrity hash. |
| `.gitignore` | The single rule `node_modules/`, which keeps installed packages out of version control. |
| `.nvmrc` | The Node.js version the service is verified on, `24.21.0`. |
| `README.md` | This project guide. |
| `LICENSE` | The full text of the GNU General Public License, Version 3. |
| `test/server.test.js` | The automated suite run by `npm test`: one test per endpoint and one for an unregistered path. |
| `blitzy/documentation/Project Guide.md` | The development record: project status, validation results, open items and operator reference. |
| `blitzy/documentation/Technical Specifications.md` | An archived earlier generation of the technical specification, kept as history; it does not describe the current tree. |

`node_modules/` is created by `npm ci`, is ignored by `.gitignore` and is never tracked.

## Licence

This project is licensed under the GNU General Public License, Version 3, 29 June 2007 (GPLv3). The full text is in [LICENSE](LICENSE).

`package.json` declares the same licence as `GPL-3.0-only`. The 68 packages that `npm ci` installs are all permissively licensed, 63 under MIT, 4 under ISC and 1 under BSD-3-Clause, with Express itself under MIT, and all three licences are compatible with GPLv3.
