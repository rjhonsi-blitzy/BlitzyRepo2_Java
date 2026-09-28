# 1. Executive Summary

## 1.1 Project Overview

A three-file Java repository carried no usable documentation: a five-line console program with no comments, and a 41-byte README declaring it held nothing specific. Both gaps are now closed. `Hello.java` carries one explanatory comment per written functionality, added without changing a byte of executable code. `README.md` is an eight-section project guide opening with an italic summary of exactly those changes, then prerequisites, build and run instructions, the program's observable output, the repository layout and the licence pointer. Anyone cloning the repository now finds the toolchain, the commands and the program's contract written down rather than inferred. After commit `2a78292`, the repository also carries an Express service with two plain-text endpoints — `GET /` answering `Hello world` and `GET /good-evening` answering `Good evening` — alongside the unchanged Java program.

## 1.2 Completion Status

```mermaid
pie title Completion — 84.2%
    "Completed Work (#5B39F3)" : 32
    "Remaining Work (#FFFFFF)" : 6
```

**84.2% complete** — 32.0 of 38.0 hours. Completed = Dark Blue `#5B39F3`; Remaining = White `#FFFFFF`. Sections 2.1 and 2.2 itemise both.

| Metric | Value |
|---|---|
| Total Hours | 38.0 |
| Completed Hours (AI + Manual) | 32.0 |
| Remaining Hours | 6.0 |
| Percent Complete | 84.2% |

These figures describe the documentation change as of `2a78292`, as do the line citations in Sections 2 and 5; the Express service change dated 2026-09-28 is recorded separately and is not folded into them.

## 1.3 Key Accomplishments

The documentation change, as recorded at `2a78292`:

- Four comments in `Hello.java`, one per written functionality, each attached to the construct it documents.
- Behaviour provably unchanged: output, error stream and exit status byte-identical to a pre-comment build.
- Stored formatting intact: CRLF on all 20 source lines, pure ASCII, five code lines byte-identical.
- Eight-section project guide in `README.md`, every build and run command executed as written.
- Two wholly-italic summary entries, one per changed file; italics appear nowhere else.
- Documentable-member coverage at two of three; documentation-tool warnings down from three to one.
- Build, run and expected-output gaps closed, output stated as the literal plus the platform separator.
- `LICENSE` untouched; no build, CI, ignore or generator file added by that change.

The Express service change, dated 2026-09-28:

- One Express 5.2.1 application in `server.js` answers `GET /` with `Hello world` and `GET /good-evening` with `Good evening`, each with status 200 and `text/plain; charset=utf-8`.
- Eleven tracked files: the six added are `package.json`, `package-lock.json`, `server.js`, `.gitignore`, `.nvmrc` and `test/server.test.js`. `Hello.java` and `LICENSE` are untouched, and no CI or generator file exists.

## 1.4 Critical Unresolved Issues

No defect is open in the delivered code. **11 items remain open** — 10 of the 12 the specification tracks, this work having closed 2, plus 1 verification-invocation item. Each was declined by the specification's own scope boundaries or is reserved for the owner.

| Issue | Impact | Owner | ETA |
|---|---|---|---|
| Verification-invocation baseline (1 item) — the comment-census check compares the working source against the current commit, so with its default baseline it reports failures against the committed tree | A correct tree scores 33 of 37 checks unless the pre-comment revision is supplied as the baseline | Maintainer | 1.0 h |
| Repository-hygiene exclusions (4 items) — no per-file copyright notice, now absent from three source files (`Hello.java`, `server.js`, `test/server.test.js`); no pinned Java version, while Node is recorded by `.nvmrc` and `engines.node`; no line-ending policy file; the ignore rule only partly closed, with `node_modules/` covered and class output still deferred | An in-tree compile leaves untracked output; Java builds are not version-pinned; a per-file notice would need a copyright holder and year the repository does not record | Owner decision | 2.0 h |
| No automated gate committed (1 item) — a manifest and a committed Node suite (`npm test`) now exist, but no CI workflow does | No CI executor re-runs the documentation checks or the service suite on future changes | Owner decision | Deferred |
| `javadoc` default-constructor warning (1 item) — the implicit constructor can carry no doc comment | Coverage stands at two of three documentable members; no functional impact | Accepted | None |
| Non-documentation items outside this scope (4 items) — verification-oracle, release, policy and commit-signing infrastructure | None on this change; each would add infrastructure the request did not ask for | Owner decision | Deferred |

## 1.5 Access Issues

No access issues identified. The repository, its branch, the JDK and Node toolchains and the npm registry were reachable throughout, and no credential, key or secret is used by anything in this project. `PORT` is the only environment variable a tracked file reads.

| System/Resource | Type of Access | Issue Description | Resolution Status | Owner |
|---|---|---|---|---|
| Repository and branch | Read/write clone | None — working tree clean, four commits authored on the branch for the documentation change | Resolved | — |
| JDK toolchain (`javac`, `java`, `javadoc`) | Local execution | None — resolved on PATH and exercised | Resolved | — |
| Node toolchain (`node`, `npm`) | Local execution | None — Node 24.21.0 and npm 11.19.0 resolved on PATH and exercised | Resolved | — |
| npm registry (`registry.npmjs.org`), external services, credentials | Read-only, no credential | None — `npm ci` reaches the registry only on a cold cache, and it was reachable when verified; the service binds local TCP port 3000; no other external service and no credential is used | Resolved | — |

## 1.6 Recommended Next Steps

1. **[High]** Run the comment-census verification with the pre-comment revision as its baseline (1.0 h).
2. **[High]** Push the branch and merge the two-file change (0.5 h).
3. **[Medium]** Decide citation coverage — two references, or every section with the budget and its check amended first (1.0 h).
4. **[Medium]** Confirm the `JDK 11 or later` floor on a JDK 11 runtime, or soften the claim (1.0 h).
5. **[Low]** Take the deferred hygiene decisions: licence notice, ignore rule for class output, line-ending policy, Java version pin (2.0 h).

# 2. Project Hours Breakdown

## 2.1 Completed Work Detail

| Component | Hours | Description |
|---|---|---|
| `Hello.java` in-source documentation | 4.0 | Enumerating the four written functionalities of the compilation unit and authoring one comment each — class Javadoc at column 0, entry-point Javadoc at four-space indent with `@param args`, and two eight-space line comments — to Oracle's doc-comment conventions, with every added line re-emitted with CRLF so the stored format survives (`Hello.java:1-18`) |
| `README.md` project guide | 8.0 | Replacing the placeholder line with 77 lines of operator guidance across eight sections: overview, prerequisites with the source-launch version floor, build with the artifact warning, both launch paths with the argument-contract table, expected output expressed portably, project layout and licence pointer (`README.md:10-77`) |
| Italic change highlighting and summary block | 2.5 | Placing the change summary as the guide's first content block, holding it to 55 words across 3 source lines, wrapping one entry per changed file wholly in emphasis with the file name in a code span, adding the dated modification notice required for a modified GPLv3 work, and keeping emphasis out of every other section (`README.md:3-8`) |
| Behaviour and byte-format preservation | 3.5 | Proving the edit changed nothing executable: compile parity, stdout/stderr/exit comparison against a build of the pre-comment source, debug-free bytecode equality, argument-variant runs, and the line-ending, encoding and tab censuses on both changed files |
| Comment-coverage measurement | 1.5 | Measuring documentable-member coverage with `javadoc` and `-Xdoclint:all` before and after, confirming the fall from three warnings to one, zero doclint errors, correct tag usage, and that the generated HTML carries both comment blocks |
| Acceptance-check execution and discrimination controls | 4.5 | Running the nine-group check suite end to end, plus negative and tamper controls that prove each assertion discriminates — normalised line endings, an edited output literal, a removed comment, a detached Javadoc block, a renamed section, a wrong date, emphasis moved into a code span, an added link, an injected line locator |
| Guide-to-toolchain seam validation | 2.5 | Executing every command the guide documents in scratch copies of the repository, comparing the guide's expected-output block byte-for-byte against real stdout, and proving the untracked-artifact claim by compiling inside a throwaway clone |
| Scope and continuity discipline | 1.5 | Confirming `LICENSE` byte-identical at base, commit and working tree; a 21-name sweep for build, CI, ignore and documentation-generator files; no build artifact in the checkout; commit authorship and a clean working tree |
| Documentation and code quality review | 4.0 | Claim-by-claim verification of the guide against the source it describes, citation/link/emphasis censuses, comment prose read line-by-line against the code, and a safety review of every documented command |
| **Total** | **32.0** | Matches Completed Hours in Section 1.2 |

## 2.2 Remaining Work Detail

| Category | Hours | Priority |
|---|---|---|
| Verification baseline — supply the pre-comment revision to the comment-census check and record the invocation | 1.0 | High |
| Branch publication and merge — push, review the two-file diff, merge | 0.5 | High |
| Citation-coverage decision — keep two stable-symbol references or extend to every body section (amend the budget and its check first) | 1.0 | Medium |
| `JDK 11 or later` confirmation on a JDK 11 runtime, or softening the claim | 1.0 | Medium |
| Rendered-guide review on the hosting platform — emphasis, tables, fenced blocks, relative links | 0.5 | Medium |
| Deferred repository-hygiene decisions — per-file licence notice, ignore rule for build output (`node_modules/` now covered, class output still open), line-ending policy, Java version pin (Node now recorded by `.nvmrc` and `engines.node`) | 2.0 | Low |
| **Total** | **6.0** | — |

## 2.3 Hours Reconciliation

| Quantity | Hours | Source |
|---|---|---|
| Completed | 32.0 | Section 2.1 total |
| Remaining | 6.0 | Section 2.2 total |
| Total Project Hours | 38.0 | 32.0 + 6.0, as stated in Section 1.2 |
| Percent Complete | 84.2% | 32.0 / 38.0 × 100 |

Confidence is **high** on the completed figures: the deliverable is two files and 92 added lines, every one of which was read, and each verification claim rests on a command that was executed. Confidence is **medium** on the remaining figures, because four of the six items are decisions whose scope the owner sets rather than fixed units of work — the hour values assume each decision is taken and implemented once, with no change of direction.

# 3. Test Results

As of `2a78292` the repository carried no committed test suite, and adding one was outside the documentation change's scope, so there was no unit- or integration-test coverage figure to report for it. What exists instead is a nine-group acceptance check suite (V1–V9) covering compilation, runtime behaviour, comment structure, byte format, comment coverage and every structural property of the guide. All figures in the first table are results as of `2a78292`, observed first-hand on JDK 25.0.3: **49 checks executed, 49 passed, 0 failed** — the 37 assertions of the acceptance suite plus 12 direct toolchain checks.

| Area / Category | Framework | Tests | Passed | Failed | Coverage | What This Proves |
|---|---|---|---|---|---|---|
| Compilation and static diagnostics | JDK `javac` 25.0.3 | 2 | 2 | 0 | 1 of 1 compilation unit | The annotated source compiles with zero diagnostics, including under `-Xlint:all -Werror` |
| Runtime behaviour and parity | Acceptance V2 + JDK launcher | 6 | 6 | 0 | Both documented launch paths | Output, error stream and exit status are byte-identical to a build of the pre-comment source, and arguments never alter the result |
| Comment structure and placement | Acceptance V3 | 7 | 7 | 0 | 4 of 4 functionalities | The change adds exactly four comments, each attached to the construct it documents, and alters no code line |
| Stored byte format | Acceptance V4 | 7 | 7 | 0 | Both changed files | `Hello.java` keeps CRLF on every line, pure ASCII and no tabs; the guide stays LF-only, UTF-8 and newline-terminated |
| Comment coverage | `javadoc` 25.0.3 + Acceptance V5 | 2 | 2 | 0 | 2 of 3 documentable members | The class and entry point are documented; only the implicit constructor, which can carry no doc comment, is not |
| Guide structure, summary and highlighting | Acceptance V6–V7 | 8 | 8 | 0 | 8 of 8 sections | The change summary is the guide's first content block, sections run in the required order, and italics mark the two changed files and nothing else |
| Guide links, literals and citations | Acceptance V8–V9 | 10 | 10 | 0 | 2 of 2 links, 2 of 2 citations | Both relative links resolve on disk, every mandated operator literal is present, and sources are cited by stable symbol with no line-number locators |
| Cross-release compilation | JDK `--release` / `--source` | 7 | 7 | 0 | Release targets 11, 17, 21 | The compile-then-run path carries no recent-JDK floor, which is what the guide's Requirements section claims |

**Express service suite — 2026-09-28.** A separate record, not counted in the 49-check tally above.

| Area / Category | Framework | Tests | Passed | Failed | Coverage | What This Proves |
|---|---|---|---|---|---|---|
| Express endpoint contracts (`test/server.test.js`) | Node built-in runner (`node --test`), on Node 24.21.0 and 20.0.0 | 3 | 3 | 0 | 2 of 2 endpoints plus the unregistered-path 404 | `GET /` and `GET /good-evening` each return 200, `text/plain; charset=utf-8` and their exact body, and `GET /nope` returns 404; each test binds its own ephemeral port through a per-test helper, so no running service is needed |

The 20.0.0 run was recorded when the change was planned. On the implementation host, which permits no 20.x release below 20.20.2, the floor run used Node 20.20.2 and also passed 3 of 3.

**Not Covered**

- **No committed test covers the Java program, and nothing runs the service suite automatically.** The Java component still has no committed test file, so for it the acceptance checks above remain the entire automated surface. The service now has `test/server.test.js`, run by `npm test`, but no CI executor invokes it. A human wanting regression protection on future edits must decide whether to introduce a gate (Section 2.2, Low priority).
- **The guide's rendered appearance.** As of `2a78292`, emphasis, the two tables, the four fenced blocks and both relative links were asserted against the Markdown source, never against a rendered page, and the guide as rewritten for the Express service has not been reviewed rendered either. Open the guide once on the hosting platform before release.
- **The `JDK 11 or later` floor on a JDK 11 runtime.** It was corroborated only by compiling at release targets 11, 17 and 21 and by `java --source 11` on a JDK 25 toolchain. Confirm it on a real JDK 11 install, or soften the claim.
- **The wording of the four comments and of the guide prose.** Comment text is not executed and prose accuracy is not machine-checkable; both were read against the source they describe, but no check asserts them.
- **The comment-census checks under their default baseline.** They compare the working source against the current commit, so they measure the added comments only when handed the pre-comment revision; with the default baseline the suite's own tally on a correct tree is 33 of 37.

# 4. Runtime Validation & UI Verification

The Java program is a console application with no user interface and no hosted page; it binds no port and has no external integration, so its runtime validation means driving the compiler, the launcher, the documentation tool and every command the guide tells an operator to type. All of the following were executed and observed, and form the record as of `2a78292`.

- ✅ **Operational — Compile.** `javac -Xlint:all -Werror` exits 0 with an empty error stream; class output directed outside the checkout, which stays clean.
- ✅ **Operational — Compiled-class launch.** `java -cp <out> Hello` prints `Hello from Java!` followed by one newline (17 bytes on this host), with an empty error stream and exit status 0.
- ✅ **Operational — Direct source launch.** `java Hello.java` prints the same payload and leaves no class file behind.
- ✅ **Operational — Behaviour parity.** Both streams and the exit status compare byte-identical against a build of the pre-comment source; suppressing debug information makes the two class files identical.
- ✅ **Operational — Argument contract.** Runs with no arguments, many arguments, and hostile arguments including shell and injection payloads all produce identical output; the parameter is never dereferenced.
- ✅ **Operational — Documentation tool.** `javadoc -quiet` exits 0 with exactly one warning, for the implicit default constructor, and the generated HTML carries both comment blocks and the parameter table.
- ✅ **Operational — Guide's build guidance.** The guide's alternate destination, a freshly generated owner-only directory, compiles and launches clean end to end.
- ✅ **Operational — Guide's expected output.** The fenced expected-output block compares byte-identical to real standard output.
- ✅ **Operational — Untracked-artifact claim.** Compiling inside a throwaway clone leaves the class file untracked and unignored, exactly as the Build section states.
- ⚠ **Partial — Version-floor claim.** The compile-then-run path was exercised at release targets 11, 17 and 21, but the `JDK 11 or later` floor for the direct source launch has not been run on a JDK 11 runtime; only JDK 25 was available.

**Express service checks — 2026-09-28.** The service was driven through the commands `README.md` publishes. All of the following were executed and observed.

- ✅ **Operational — Install.** `npm ci` installs 68 packages strictly from `package-lock.json`, and `npm ls express` shows `express@5.2.1`.
- ✅ **Operational — Startup.** `npm start` prints `Hello service listening on http://localhost:3000` and stays resident; `PORT` moves it to another port.
- ✅ **Operational — Endpoint contracts.** `GET /` returns 200, `text/plain; charset=utf-8` and the 11 bytes `Hello world`; `GET /good-evening` returns 200, the same content type and the 12 bytes `Good evening`; `GET /nope` returns 404.
- ✅ **Operational — Bind failure.** With the port already held, the service writes `Failed to bind port 3000: listen EADDRINUSE: address already in use :::3000` to standard error and exits non-zero.
- ✅ **Operational — Clean tree.** `git status --short` shows no new entry after an install and a run.
- ✅ **Operational — Java program unchanged.** `java Hello.java` prints the 17-byte greeting with exit 0 and an empty error stream, and `javac -Xlint:all -Werror -d "$(mktemp -d)" Hello.java` exits 0 with no output — on OpenJDK 25.0.4.1 when the change was planned, and on 25.0.3 on the implementation host.

**Never exercised at runtime:** the guide's rendered appearance. There is still no UI and no hosted page: the service's HTTP contract is verified with `curl` and the test suite, not a browser, and the guide's structure was asserted against its Markdown source rather than a rendered page, so nothing here was verified through a browser.

# 5. Compliance & Quality Review

## 5.1 Compliance Matrix

Sections 5.1 and 5.2 review the documentation change as of `2a78292`; their `README.md:N` citations refer to the guide at that commit.

| # | Deliverable / Benchmark | Status | Progress | Evidence |
|---|---|---|---|---|
| 1 | One explanatory comment per written functionality | ✅ Pass | 4 of 4 | `Hello.java:1-5`, `:7-14`, `:16`, `:18` — class, entry point, output statement, termination path |
| 2 | Comment form and placement follow the language's conventions | ✅ Pass | 2 Javadoc + 2 line comments | Class block opens at column 0, member block at four spaces with a `@param args` tag and no `@return`; both line comments at eight spaces |
| 3 | Comment-only edit — no behaviour, signature or formatting change | ✅ Pass | 15 added / 0 removed | The five original code lines are byte-identical to the pre-comment revision; debug-free bytecode identical |
| 4 | Stored formatting preserved per file | ✅ Pass | 20 of 20 lines CRLF | `Hello.java` CRLF throughout, pure ASCII, zero tabs; `README.md` LF-only with a trailing newline |
| 5 | Change summary is the guide's first content block | ✅ Pass | 1 title + summary | `README.md:1` is the title, `:3` the summary heading |
| 6 | Summary held to a small budget | ✅ Pass | 55 / 70 words, 3 / 8 lines | `README.md:5-8` |
| 7 | Every change highlighted in italics, one entry per changed file | ✅ Pass | 2 of 2 changes | `README.md:7-8`; emphasis appears nowhere else in the guide |
| 8 | Dated modification notice for a modified GPLv3 work | ✅ Pass | 1 notice | `README.md:5` |
| 9 | Guide sections present and in the required order | ✅ Pass | 8 of 8 | Headings at `README.md:3,10,16,22,32,55,65,75` |
| 10 | Operator guidance: build, run, expected output, version floor, artifact warning | ✅ Pass | 5 of 5 literals | `README.md:22-63`, every command executed as written |
| 11 | Source cited by stable symbol, never by line number | ⚠ Partial | 2 of 2 required references, 2 of 7 body sections | `README.md:14,53`; zero line-number locators. See divergence 1 |
| 12 | Documentable-member coverage | ⚠ Partial | 2 of 3 members | `javadoc` reports one remaining warning, for the implicit default constructor. See divergence 4 |

Rule compliance: the user rule requiring clean code with a comment on each functionality written is satisfied — four functionalities, four comments, and cleanliness achieved by commenting rather than restructuring, with an additions-only diff proving no member was renamed, reordered or reformatted. The second user rule declares itself to be for testing only and states no technical constraint; nothing in the delivered work was derived from it and no requirement was invented on its behalf. The Express service change of 2026-09-28 operated under no user rules.

## 5.2 AAP & Rule Divergences and Gaps

| # | What the AAP/Rule Required | What Was Delivered Instead | Why It Diverged | Impact | Remediation |
|---|---|---|---|---|---|
| 1 | "Every guide section references the source it documents by stable symbol" | Two references only, in Overview and Run; five body sections carry none | The plan also fixes the reference budget at exactly two and asserts that count mechanically; the two instructions conflict | None on correctness — every documented fact still traces to an authority | Owner decision: extend coverage only after amending the budget and its check |
| 2 | Comment-census verification compares the edited source against the current commit | The authoritative run compares against the pre-comment revision instead | The comment work is committed, so at the current commit the comparison is empty and the census degenerates to zero | A correct tree scores 33 of 37 checks when the baseline is not supplied | Pass the pre-comment revision as the baseline argument |
| 3 | Build section = the fenced compile command plus the untracked-artifact note | Also documents an alternate output directory and the matching launch command | Safe-command guidance permitted retaining an external destination if freshly generated, quoted and used consistently | None adverse; the primary commands are unchanged and both alternates run clean | Optional: delete the third sentence of `README.md:30` for the minimal form |
| 4 | Close the comment-coverage gap by documenting all three documentable members | Two of three documented; one `javadoc` warning remains | A default constructor can carry no doc comment, and declaring one is a structural change the comment-only constraint forbids | Coverage 2 of 3; no functional impact | None, unless the owner accepts an explicit constructor |
| 5 | Repository-hygiene items placed out of scope: per-file licence notice, version pin, line-ending policy, ignore rule, automated gate | None added; mixed CRLF/LF retained; the untracked class file documented rather than ignored. Subsequently, the Express change added `package.json`, `package-lock.json`, `.gitignore` (`node_modules/` only), `.nvmrc` and `test/server.test.js`; the class-output ignore rule, Java version pin, line-ending policy, CI workflow and per-file notice remain deferred | Sanctioned exclusions — the notice needs a copyright holder the repository does not record, and normalising line endings would change the source file's content digest | In-tree compiles leave untracked output; Java builds are unpinned; no CI gate re-runs the checks | Owner decisions, each independent of the delivered documentation |

**1 — Citation coverage.** The plan carries two instructions that cannot both hold: a general one requiring every guide section to cite its source by stable symbol, and an enumerated one fixing the guide at exactly two references. The enumerated count is the specific contract and is asserted mechanically, so it governs. The guide cites `Source: Hello.java (class Hello)` at `README.md:14` and `Source: Hello.java (Hello.main)` at `README.md:53`; Requirements, Build, Expected Output, Project Layout and Licence carry none. Nothing is unattributed — the Overview reference covers the class and default-package facts, the Run reference the argument, single-line-output and normal-return facts. To extend coverage, amend the two-reference budget and its check first.

**2 — Verification baseline.** The comment-census check proves the edit is additions-only by diffing the working source against a named revision, and the plan names the current commit. That held while the comment work was uncommitted; it no longer does. At the current commit the diff is empty, so the census counts zero comment blocks and the indentation and placement assertions fail vacuously — four failures against a correct tree. Handing the check the pre-comment revision restores the intent, additions-only relative to the pre-edit source, and the suite then passes 37 of 37. The V1–V9 script is provisioned outside the repository and stays outside the checkout, so the remedy is the invocation.

**3 — Build section scope.** The plan specifies the Build section as the fenced compile command plus a note that compiling in place leaves an untracked class file. `README.md:30` goes further: it documents `B="$(mktemp -d)" && javac -d "$B" Hello.java` with the matching `java -cp "$B" Hello`, and one sentence on why a freshly generated owner-only directory beats a fixed, predictable one. Safe-command guidance permitted keeping an external destination provided it is uniquely generated, quoted and used consistently, and a guide that says compile elsewhere without saying how to launch from elsewhere is incomplete. Both commands were executed as written. Deleting that third sentence is all the minimal form needs.

**4 — Documentable-member coverage.** The specification's original closing condition for the comment-coverage gap was three comment blocks, one per member the documentation tool reports. Only two of those members are written in the source. The third is the implicit default constructor the language supplies because the class declares none, and such a constructor can carry no doc comment: the only way to attach one is to declare the constructor, a structural change the comment-only constraint forbids. The plan itself revises the target to two of three and warnings from three to one, which is exactly what `Hello.java` delivers — one warning remains at `Hello.java:6`. Closing it fully is a separate structural decision.

**5 — Deferred hygiene items.** Five adjacent gaps were identified and deliberately not closed. `Hello.java` carries no per-file copyright and warranty notice, which the licence's appendix advises, because that notice needs a named holder and year and no tracked file records either — commit metadata identifies an author, not a rights holder. No Java version is pinned, and the guide says so plainly rather than choosing one this change had no authority to choose. Line endings stay as stored, CRLF in the source and LF in the guide, because normalising them would rewrite all five code lines and change the file's content digest. Neither an ignore rule nor a build, test or CI descriptor was added. Subsequently, on 2026-09-28, the Express service change added `package.json`, `package-lock.json`, `.gitignore` (covering `node_modules/` only), `.nvmrc` and `test/server.test.js`. The class-output ignore rule, the Java version pin, the line-ending policy, a CI workflow and the per-file notice remain deferred.

# 6. Risk Assessment

Whole categories of risk remain absent for the Java program and are listed once rather than as rows: it reads no input, dereferences no argument, opens no resource, binds no port, makes no network call and declares no manifest, so it carries no injection surface, no supply-chain exposure, no authentication or authorisation surface and no data-at-rest concern. The Express service changes that picture in bounded ways. It binds TCP port 3000 on all interfaces and reads the `PORT` variable, but serves fixed strings only: it reads no request input, needs no authentication and stores nothing. Its 68 npm packages introduce supply-chain exposure. What remains is forward-looking risk to the documentation, to future edits and to that dependency tree.

| Risk | Category | Severity | Probability | Mitigation | Status |
|---|---|---|---|---|---|
| The comment-census verification, run with its default baseline, reports failures against the committed tree; a contributor could read that as a broken deliverable or "correct" source that is already right | Technical | Medium | High | Always pass the pre-comment revision as the baseline, and record that invocation with the verification procedure | Open |
| `Hello.java` is stored with CRLF on every line and no line-ending policy file exists; an editor or tool that writes LF rewrites all five code lines and changes the file's content digest | Technical | Medium | Medium | Edit in byte mode, re-emit CRLF on added lines, and re-run the line-ending census after any edit | Open — accepted by design |
| No CI workflow: a committed Node suite (`npm test`) exists, but nothing runs it or the documentation checks automatically; guide claims can drift from the source as the program changes | Operational | Medium | Medium | The guide cites its source by stable symbol so each claim can be checked at origin; the service suite can be run by hand; the owner may adopt a gate | Open |
| The ignore rule now covers `node_modules/` only, so a compile run in place still leaves an untracked, unignored class file that can be committed by accident | Operational | Low | Medium | The guide documents a fresh output directory outside the checkout and instructs the reader not to commit the class file | Open |
| The Java toolchain is unpinned (Node is recorded by `.nvmrc` and `engines.node`); a future JDK could change documentation-tool defaults or single-file launch behaviour and move the warning count the guide implies | Technical | Low | Low | Verified at release targets 11, 17 and 21; revisit if a Java version pin is adopted | Open |
| The documented `JDK 11 or later` floor for the direct source launch has not been exercised on a JDK 11 runtime | Integration | Low | Low | Confirm once on a JDK 11 install, or soften the claim to the release targets actually exercised | Open |
| A future edit to the Build section could reintroduce a fixed, predictable compiler-output path that another local process can pre-create or redirect through a symbolic link | Security | Low | Low | The guide's command generates a fresh owner-only directory and states the reason beside it, so the rationale is visible to the next editor | Mitigated |
| The branch is ahead of its remote and unpublished, so the documentation is not yet visible to anyone cloning the default branch | Operational | Low | High | Push the branch and merge the two-file change | Open |
| Supply-chain exposure through the 68 npm packages the service installs | Security | Medium | Low | Every package is pinned by version and integrity hash in `package-lock.json` and installed with `npm ci`; no automated audit runs | Open |
| The listener binds all interfaces, so the service is reachable beyond localhost wherever the host firewall allows | Security | Low | Low | It serves fixed public strings and reads no request input; run it locally | Open — accepted |
| `npm ci` needs `registry.npmjs.org` on a cold cache: the offline build property is partitioned, with the Java path still offline and the Node path not | Operational | Low | Medium | Prime the npm cache, then install with `npm ci --offline --no-audit --no-fund` | Open — accepted by design |
| A future edit to `test/server.test.js` that moves setup into root-level `before` hooks would break on Node 20.0.0, where such hooks do not run ahead of top-level tests | Technical | Low | Low | Keep the per-test helper and re-run the suite on 20.0.0 after any change to its shape | Open |

# 7. Visual Project Status

Colour key throughout: Completed work = Dark Blue `#5B39F3`; Remaining work = White `#FFFFFF`.

```mermaid
pie title Project Hours Breakdown — 84.2% Complete
    "Completed Work" : 32
    "Remaining Work" : 6
```

```mermaid
pie title Requirement Status — 23 Specification Requirements
    "Completed" : 22
    "Partially Completed" : 1
```

Remaining hours by category, from Section 2.2 (6.0 hours total):

| Category | Hours | Share | Priority |
|---|---|---|---|
| Deferred repository-hygiene decisions | 2.0 | 33% | Low |
| Verification baseline | 1.0 | 17% | High |
| Citation-coverage decision | 1.0 | 17% | Medium |
| `JDK 11 or later` confirmation | 1.0 | 17% | Medium |
| Branch publication and merge | 0.5 | 8% | High |
| Rendered-guide review | 0.5 | 8% | Medium |
| **Total** | **6.0** | **100%** | — |

By priority: High 1.5 hours, Medium 2.5 hours, Low 2.0 hours.

# 8. Summary & Recommendations

What was asked for has been delivered on both counts. `Hello.java` now explains itself: four comments, one per written functionality, covering the class contract, the entry point and its never-read `args` parameter, the single write to standard output, and the fact that the method returns normally with no explicit exit call. `README.md` is now a project guide rather than a placeholder, opening with an italic summary of exactly these two changes and continuing through prerequisites, build, both launch paths, the expected output, the layout and the licence. The project stands at **84.2% complete — 32.0 of 38.0 hours** — with every specification requirement either delivered or, in one case, delivered and awaiting a change to how its verification is invoked.

The evidence behind that is narrow but deep, as it should be for a two-file change. The delivered source compiles with zero diagnostics under `-Xlint:all -Werror`; its standard output, error stream and exit status are byte-identical to a build of the pre-comment source, and its bytecode is identical once debug information is suppressed — so the claim that nothing but comments was added is proven rather than asserted. Every command the guide tells an operator to type was executed as written, including the alternate build destination, and the guide's expected-output block compares byte-for-byte against real standard output. Forty-nine acceptance checks were executed and all forty-nine passed. The stored formatting that makes this repository awkward to edit — CRLF on every source line, LF in the guide — survived intact.

Three gaps are worth the reader's attention, none of them a defect. First, the comment-census verification needs the pre-comment revision handed to it as a baseline; run without one it reports four failures against a tree that is correct, and that is the single most likely thing to mislead the next person. Second, the guide has never been looked at rendered — its structure was proven against the Markdown source, which is not the same as confirming that two italic entries, two tables and four fenced blocks display as intended. Third, the `JDK 11 or later` floor for the direct source launch is documented but was only corroborated by compiling at release targets 11, 17 and 21 on a JDK 25 toolchain.

The critical path to production is short: supply the verification baseline, glance at the rendered guide, then push and merge. That is two hours of work, and nothing in it depends on a decision. The remaining four hours are genuine decisions rather than tasks — whether to extend source citations to every guide section (which requires amending the two-reference budget and its check first), whether to confirm the version floor on a real JDK 11 runtime or soften the claim, and whether to close the five hygiene items the plan deliberately declined: the per-file copyright notice that needs a rights holder the repository does not record, an ignore rule for build output, an explicit line-ending policy, a version pin, and an automated gate.

Production readiness: **ready to merge.** For a documentation change to a program whose behaviour is provably untouched, the risk of releasing is close to zero, and the guide measurably closes the gaps that made this repository opaque. The one recommendation that outlives this change is the third risk in Section 6 — with no CI gate, and a committed Node suite that nothing runs automatically, the guide's accuracy depends on future editors honouring the stable-symbol citations that let each claim be checked at its origin. Success is measurable and already measured: four of four functionalities commented, eight of eight guide sections present, two of two changes highlighted, three of three observable behaviours documented, and documentable-member coverage at two of three with the third unreachable by design.

**Express service change — 2026-09-28.** The repository now also serves two plain-text endpoints from one Express 5.2.1 application: `GET /` answers `Hello world` and `GET /good-evening` answers `Good evening`, while `Hello.java` and its `Hello from Java!` console contract are untouched. The evidence: `test/server.test.js` passes 3 of 3 on Node 24.21.0 and on the 20.0.0 floor (Section 3), `npm ci` installs the 68 locked packages, the working tree stays clean after an install and a run, and the Java program re-checks clean on OpenJDK 25.0.4.1 (Section 4). Of the five hygiene items above, the change partly settles two — `.gitignore` covers `node_modules/` but not class output, and Node is recorded by `.nvmrc` and `engines.node` while Java stays unpinned — and it commits a suite that no CI gate yet runs. The effort and completion figures above are not re-estimated for it.

# 9. Development Guide

Every command below was executed against this repository on a Linux host, and the outputs shown are the real ones. The Java outputs are those recorded on OpenJDK 25.0.3; for the Express change the Java commands were re-checked on OpenJDK 25.0.4.1 and again on 25.0.3. The Node commands ran on Node 24.21.0 with npm 11.19.0, and the test suite also on the 20.0.0 floor (Section 3). All commands are run from the repository root unless stated otherwise.

## 9.1 System Prerequisites

- A JDK, for the Java program. The repository pins no Java version: it has no Java build descriptor, no Java version file and no continuous-integration descriptor; `.nvmrc` and `engines.node` record the Node version only. The compile-then-run path works on considerably older releases — it was exercised at release targets 11, 17 and 21 — while the direct source launch needs JDK 11 or later.
- Node.js and npm, needed only for the Express service. The floor is `>=20.0.0`, declared in `engines.node` of `package.json`; the target is Node 24.21.0, recorded in `.nvmrc`, with the npm 11.19.0 it bundles. `curl` is used to request the endpoints.
- `git`, for cloning and for the baseline comparisons in the verification steps.
- A POSIX shell with GNU `grep`, `diff`, `awk` and `coreutils` if you intend to run the structural verification commands.
- The Java path still needs no package manager step and resolves nothing: the source imports nothing outside `java.lang`. The service resolves one direct dependency, `express`, into 68 locked packages, and binds TCP port 3000. There is still no virtual environment, container, database or broker.

```bash
java -version      # openjdk version "25.0.3" ...
javac -version     # javac 25.0.3
javadoc --version  # javadoc 25.0.3
```

Where nvm is installed, select the Node version recorded in `.nvmrc` and confirm it:

```bash
nvm install && nvm use   # reads .nvmrc
node -v                  # v24.21.0
npm -v                   # 11.19.0
```

## 9.2 Environment Setup

No secret is read by any tracked file, and the only environment variable read is `PORT`: optional, read by `server.js` to choose the service's TCP port, default 3000. `JAVA_HOME` is not required, because the compiler and launcher are on `PATH`; if a tool of yours needs it, derive it from the toolchain already on `PATH` rather than hard-coding an install location:

```bash
JAVA_HOME="$(dirname "$(dirname "$(readlink -f "$(command -v javac)")")")"
[ -x "$JAVA_HOME/bin/javac" ] && echo "JAVA_HOME=$JAVA_HOME"
```

Confirm the checkout is in the state you expect:

```bash
git status --short     # expect no output
git ls-files           # expect the eleven paths listed below, in this order
git ls-files | wc -l   # expect 11
git log --oneline -4
```

```text
.gitignore
.nvmrc
Hello.java
LICENSE
README.md
blitzy/documentation/Project Guide.md
blitzy/documentation/Technical Specifications.md
package-lock.json
package.json
server.js
test/server.test.js
```

`git status --short` stays empty after `npm ci`, because `node_modules/` is ignored.

## 9.3 Dependency Installation

The Java path needs none: there is no `pom.xml`, `build.gradle` or `Makefile`, and nothing is downloaded to build `Hello.java`. The Express service installs strictly from the committed lock file:

```bash
npm ci                   # installs the 68 packages pinned in package-lock.json
npm ls express           # ends with: └── express@5.2.1
```

On a cold npm cache, `npm ci` fetches the packages from `registry.npmjs.org` (read-only, no credential): the lock file supplies reproducibility, not tarballs. With a primed cache, `npm ci --offline --no-audit --no-fund` installs without the network. `package-lock.json` was generated once by `npm install express@5.2.1` under npm 11.19.0; never hand-edit it.

## 9.4 Build

Two paths for the Java program, both documented in the project's own guide. The first is the shortest; the second keeps the working tree clean, which matters because the ignore rule covers only `node_modules/`, not `Hello.class`. The Express service has no build step: `server.js` runs as written.

```bash
# Path A — compile in place. Leaves an untracked Hello.class beside the source.
javac Hello.java

# Path B — compile to a fresh directory outside the checkout (recommended).
B="$(mktemp -d)"
javac -Xlint:all -d "$B" Hello.java
```

Expected result for both: exit status 0 and no output at all. `-Xlint:all` is clean, and so is `-Werror`. If you used Path A, remove the artifact before committing:

```bash
rm -f Hello.class && git status --short   # expect no output
```

## 9.5 Application Startup

The Java program is not a service — it writes one line and exits. Three launch forms, all verified:

```bash
java -cp "$B" Hello    # from the Path B build directory
java Hello             # after a Path A in-place compile, from the repository root
java Hello.java        # direct source launch, no compile step, leaves no artifact
```

Each prints:

```text
Hello from Java!
```

Exit status is 0, the error stream is empty, and command-line arguments are accepted but never read — the output is identical whether or not you pass any.

**Express service.** Install once with `npm ci` (Section 9.3), then start the service:

```bash
npm start                # PORT=<n> npm start listens on port <n> instead of 3000
```

It prints the following and stays resident until stopped with Ctrl-C or SIGTERM:

```text
> hello@1.0.0 start
> node server.js

Hello service listening on http://localhost:3000
```

From a second shell, request each endpoint:

```bash
curl -s http://localhost:3000/               # Hello world
curl -s http://localhost:3000/good-evening   # Good evening
```

Both bodies are plain text (`text/plain; charset=utf-8`) with no trailing newline, so the shell prompt continues on the same line. Any other path gets Express's built-in 404. If the port is already held, the service writes `Failed to bind port 3000: listen EADDRINUSE: address already in use :::3000` to standard error and exits non-zero.

## 9.6 Verification Steps

Measure comment coverage. Exactly one warning is expected, for the implicit default constructor, which cannot carry a doc comment:

```bash
javadoc -d "$B/jd" -quiet Hello.java
# Hello.java:6: warning: use of default constructor, which does not provide a comment
```

Prove the annotated source still behaves like the pre-comment source. `BASE` is the revision before the comment work landed:

```bash
BASE=0726b1d
O="$(mktemp -d)"; mkdir -p "$O/base"
git show "$BASE:Hello.java" > "$O/base/Hello.java"   # the file name must match the public class
javac -d "$O/old" "$O/base/Hello.java"
java -cp "$O/old" Hello > "$O/old.out" 2> "$O/old.err"
java -cp "$B"     Hello > "$O/new.out" 2> "$O/new.err"
cmp "$O/old.out" "$O/new.out" && cmp "$O/old.err" "$O/new.err" && echo "behaviour identical"
```

Prove the edit added comments and nothing else:

```bash
diff "$O/base/Hello.java" Hello.java > "$O/d"
grep -cE '^(<|[0-9,]+[dc][0-9,]+)' "$O/d"                 # expect 0 — no deletions or modifications
grep '^> ' "$O/d" | sed 's/^> //' | tr -d '\r' > "$O/add"
printf 'added=%s /**=%s */=%s //=%s\n' "$(wc -l < "$O/add")" \
  "$(grep -c '^\s*/\*\*' "$O/add")" "$(grep -c '^\s*\*/' "$O/add")" "$(grep -c '^\s*//' "$O/add")"
# expect: added=15 /**=2 */=2 //=2
```

Check the stored byte format, which is deliberately different per file:

```bash
printf 'Hello.java lf=%s cr=%s crlf=%s\n' "$(tr -cd '\n' < Hello.java | wc -c)" \
  "$(tr -cd '\r' < Hello.java | wc -c)" "$(grep -c $'\r$' Hello.java)"   # expect 20 20 20
printf 'README.md cr=%s\n' "$(tr -cd '\r' < README.md | wc -c)"          # expect 0
tail -c 1 README.md | od -An -c                                          # expect \n
```

Check the guide's structure, summary budget and links:

```bash
grep '^## ' README.md    # expect the eight sections in order, Summary of Changes first
awk '/^## Summary of Changes$/{f=1;next} /^## /{f=0} f' README.md | wc -w   # expect 69 (limit 70); 55 as of 2a78292
grep -oE '\[[^]]+\]\([^)]+\)' README.md    # expect exactly the two relative links, [Hello.java](Hello.java) and [LICENSE](LICENSE)
```

Run the Express service suite. It needs no running service, because each test binds its own ephemeral port:

```bash
npm test                               # expect 3 tests: 3 passing, 0 failing
npm test -- --test-reporter=tap        # expect the counter lines "# tests 3", "# pass 3", "# fail 0"
```

The project's full acceptance suite (checks V1–V9) is an external, uncommitted procedure reproduced in the project specification, and it encodes the guide as of `2a78292`. Save it to a scratch file outside the checkout and run it there, never inside the checkout. The committed test suite is the Express service's own, in `test/server.test.js`, run by `npm test` above:

```bash
S="$(mktemp -d)"     # paste the suite into "$S/verify.sh"
bash "$S/verify.sh" "$PWD" "$PWD/Hello.java" "$PWD/README.md" "$(date -u +%F)"
```

Its comment-census check compares the working source against a baseline revision. Give it the pre-comment revision (`0726b1d`); with the current commit as the baseline the comparison is empty and four checks fail on a tree that is correct.

Finally, clean up the scratch directories:

```bash
rm -rf "$B" "$O" "$S" && git status --short   # expect no output
```

## 9.7 Example Usage

```bash
$ javac Hello.java && java Hello
Hello from Java!

$ java Hello.java one two three     # arguments are accepted and never read
Hello from Java!

$ java Hello; echo "exit=$?"
Hello from Java!
exit=0
```

A service session: install and start in one shell, then request from a second. The `; echo` supplies the newline the bodies do not carry.

```bash
$ npm ci                 # its summary line begins "added 68 packages"
$ npm start

> hello@1.0.0 start
> node server.js

Hello service listening on http://localhost:3000
```

```bash
$ curl -s http://localhost:3000/; echo
Hello world

$ curl -s http://localhost:3000/good-evening; echo
Good evening
```

## 9.8 Troubleshooting

| Symptom | Cause | Resolution |
|---|---|---|
| `Could not find or load main class Hello` | No compiled class on the classpath, or you are not in the directory holding it | Compile first, or launch with `java -cp <build dir> Hello`; the class is in the default package, so the bare name is correct |
| `error: class Hello is public, should be declared in a file named Hello.java` | You exported the source under another name — common when writing a baseline revision to a scratch file | Export into a directory as `Hello.java`, as the verification steps above do |
| `javac Hello.java` leaves `Hello.class` in `git status` | `.gitignore` covers only `node_modules/`; class output is deliberately not ignored | Delete it, or compile to a directory outside the checkout with `-d` |
| Verification reports `block census wrong: /**=0 */=0 //=0` | The census was given the current commit as its baseline, where the comments are already committed | Re-run with the pre-comment revision as the baseline |
| Verification reports mixed line endings or `final terminator not CRLF` | An editor normalised `Hello.java` to LF on save | Restore the file and re-apply the edit in byte mode, re-emitting CRLF on every line including added ones |
| `javadoc` reports one warning | Expected: the implicit default constructor can carry no doc comment | No action; documenting it would require declaring a constructor, which is out of scope |
| The direct source launch fails on an older JDK | Single-file source launch needs JDK 11 or later | Use the compile-then-run path, which has no such floor |
| `npm start` reports `Failed to bind port 3000: listen EADDRINUSE: address already in use :::3000` | Another process already holds the port | Start on another port with `PORT=<n> npm start`, or stop that process |
| `npm ci` refuses to install because `package.json` and `package-lock.json` are not in sync | The manifest and the lock file disagree | Do not hand-edit the lock; regenerate it with `npm install express@5.2.1` and commit both files |
| `npm ci` cannot reach `registry.npmjs.org` | Cold npm cache with no network access | Run it with network access, or prime the cache and use `npm ci --offline --no-audit --no-fund` |
| `node --test test/` fails with `MODULE_NOT_FOUND` | The runner does not accept the directory form as a test path | Use `npm test`, which runs the bare `node --test` and auto-discovers `test/*.test.js` |

# 10. Appendices

## A. Command Reference

| Purpose | Command | Expected Result |
|---|---|---|
| Compile in place | `javac Hello.java` | Exit 0, no output, `Hello.class` beside the source |
| Compile outside the checkout | `B="$(mktemp -d)"; javac -Xlint:all -d "$B" Hello.java` | Exit 0, no diagnostics, working tree unchanged |
| Launch a compiled class | `java -cp "$B" Hello` | `Hello from Java!`, empty error stream, exit 0 |
| Launch from the repository root after an in-place compile | `java Hello` | Same output |
| Launch the source directly | `java Hello.java` | Same output, no artifact; needs JDK 11 or later |
| Measure comment coverage | `javadoc -d "$B/jd" -quiet Hello.java` | Exit 0 with exactly one warning, for the implicit default constructor |
| Strictest static check | `javac -Xlint:all -Werror -d "$B" Hello.java` | Exit 0, empty error stream |
| Install the service's dependencies | `npm ci` | 68 packages installed strictly from `package-lock.json` |
| Confirm the Express version | `npm ls express` | `└── express@5.2.1` |
| Start the service | `npm start` | `Hello service listening on http://localhost:3000`; stays resident |
| Start the service on another port | `PORT=<n> npm start` | The same line, with port `<n>` |
| Request the root endpoint | `curl -s http://localhost:3000/` | `Hello world`, no trailing newline |
| Request the second endpoint | `curl -s http://localhost:3000/good-evening` | `Good evening`, no trailing newline |
| Check status and media type | `curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://localhost:3000/` | `200 text/plain; charset=utf-8` |
| Run the service suite | `npm test` | 3 tests: 3 pass, 0 fail |
| Inspect the documentation change | `git diff 0726b1d 2a78292 --stat -- Hello.java README.md` | `Hello.java` +15, `README.md` +77 −1 (2 files changed, 92 insertions, 1 deletion) |
| Confirm a clean tree | `git status --short` | No output |

## B. Port Reference

| Port | Protocol | Bound by | Interface | Override |
|---|---|---|---|---|
| 3000 | TCP | `npm start`, through `server.js` (`app.listen`) | All interfaces | `PORT` environment variable |

The Java program binds no port, starts no listener and makes no network call. The test suite binds an ephemeral port per test through `app.listen(0)` and closes it afterwards. There is no database, broker or cache in this project.

## C. Key File Locations

| Path | Role | Size |
|---|---|---|
| `Hello.java` | The only compilation unit: `public class Hello` in the default package with its `main` entry point, now carrying four explanatory comments | 20 lines / 1073 bytes |
| `server.js` | The Express service: both route handlers, the guarded `app.listen` binding and the exported `{ app }` | 36 lines / 1347 bytes |
| `package.json` | The npm manifest: `express` at `^5.2.1`, the `start` and `test` scripts, `engines.node` `>=20.0.0` and the licence `GPL-3.0-only` | 17 lines / 374 bytes |
| `package-lock.json` | Generated by npm and never hand-edited: `lockfileVersion` 3, 69 `packages` entries pinning 68 packages by version and integrity hash | 893 lines / 31108 bytes |
| `.gitignore` | The single rule `node_modules/` | 1 line / 14 bytes |
| `.nvmrc` | The Node version the service is verified on, `24.21.0` | 1 line / 8 bytes |
| `README.md` | The project guide: change summary as the first content block, then overview, requirements, build, run, expected output, layout and licence, covering both the Java program and the service | 147 lines / 9197 bytes |
| `LICENSE` | Verbatim GNU General Public License, Version 3, 29 June 2007; referenced by the guide and never modified | 674 lines / 35149 bytes |
| `test/server.test.js` | The service suite run by `npm test`: one test per endpoint and one for an unregistered path | 69 lines / 2714 bytes |
| `blitzy/documentation/Project Guide.md` | The development record: status, validation results, open items and operator reference | This file |
| `blitzy/documentation/Technical Specifications.md` | An archived earlier generation of the technical specification, kept as history; it does not describe the current tree | 8321 lines / 839724 bytes |

The repository holds eleven tracked files: eight at the root, one in `test/` and two in `blitzy/documentation/`. `node_modules/` is created by `npm ci`, ignored by `.gitignore` and never tracked.

## D. Technology Versions

| Component | Version Used | Notes |
|---|---|---|
| OpenJDK (`java`, `javac`, `javadoc`) | 25.0.3 (record); 25.0.4.1 (re-check) | 25.0.3 produced every Java result recorded as of `2a78292`; 25.0.4.1 ran the Java re-check for the Express change, which also passed on 25.0.3. The repository pins no Java version; the compile-then-run path was exercised at release targets 11, 17 and 21 |
| Node.js | 24.21.0 | Target recorded in `.nvmrc`; floor `>=20.0.0` in `engines.node`; the suite was also run on 20.0.0, and on 20.20.2 on the implementation host |
| npm | 11.19.0 | Bundled with Node 24.21.0; generated `package-lock.json` at `lockfileVersion` 3 |
| Express | 5.2.1 | Declared as `^5.2.1` and pinned at 5.2.1 by the lock file; MIT licence |
| Node test runner | Built in | Ships with the Node runtime; no separate version and no added dependency |
| Java language level | None declared | No `--release` or `--source` setting is recorded anywhere in the repository |
| Markdown dialect | GitHub Flavored Markdown over CommonMark | Determined by the hosting platform; no generator or renderer is part of the project |
| `git` | 2.51.0 | Used for the baseline comparisons in the verification steps |

## E. Environment Variable Reference

| Variable | Required | Purpose |
|---|---|---|
| `JAVA_HOME` | No | Not used by anything in this project; the `PATH` binaries are sufficient. Set it inline if one of your own tools needs it |
| `PORT` | No | TCP port for `server.js`; default 3000 |
| `NODE_ENV` | No | Read by Express itself to select its environment mode; this project neither sets nor requires it |
| — | — | No other variable and no secret is read by any tracked file |

## F. Developer Tools Guide

| Tool | Role in this project |
|---|---|
| `javac` | Compiles the single source file; `-Xlint:all -Werror` is the project's static-analysis surface, as no linter is configured |
| `javadoc` | Measures comment coverage; `-Xdoclint:all` validates doc-comment syntax and tag usage. Its HTML output is never committed |
| `git` | Supplies the pre-comment revision used as the baseline for behaviour and comment-census comparisons |
| GNU `grep`, `awk`, `diff`, `tr`, `od`, `cmp`, `iconv` | Assert the guide's structure and both files' stored byte format directly against the source, so verification needs no renderer and no extra runtime |
| `mktemp -d` | Generates the per-run build and scratch directories, keeping class output out of the checkout |
| Node test runner (`node --test`) | Runs `test/server.test.js` through `npm test`, auto-discovering `test/*.test.js` with no configuration file |
| `npm` | Installs the locked tree with `npm ci`, starts the service with `npm start` and runs the suite with `npm test` |
| `nvm` | Optional; `nvm install && nvm use` reads `.nvmrc` and selects Node 24.21.0 |
| `curl` | Requests the two endpoints and checks their status and media type |

No linter, formatter, documentation generator or build tool is configured in the repository. The only test tooling is Node's built-in runner, run by `npm test`, with no configuration file and no added dependency.

## G. Glossary

| Term | Meaning in this project |
|---|---|
| Written functionality | A construct actually present in the source that takes exactly one explanatory comment: the class declaration, the entry-point signature and its parameter, the output statement, and the termination path |
| Stable-symbol citation | A source reference written as a symbol, `Source: Hello.java (Hello.main)`, rather than a line number, because inserting comments shifts every line below them |
| Default package | The absence of a `package` statement, which is why the class launches by the bare name `Hello` |
| Single-file source launch | Running `java Hello.java` without a compile step; available from JDK 11 onward and leaves no class file |
| Platform line separator | The newline sequence the host defines, appended by the program's single output call — the reason the guide states the literal plus a separator rather than a fixed byte count |
| Comment-only edit | A change in which every added line is a comment and no existing line is deleted or modified, provable by an additions-only comparison against the pre-comment revision |
| Implicit default constructor | The no-argument constructor the language supplies because the class declares none; it can carry no doc comment, which is why one documentation-tool warning remains by design |
