# PatternLab — Java DSA Academy

A visual, interactive workspace for understanding algorithms, building logic,
and practising Java interview problems.

## Features

- An expanded practice library (originally 365 entries) and an independent Core 75 starter track.
- Pattern-specific recognition guides: recognition clues, state, invariants, and counterexamples.
- 37 runnable visual lessons: eight foundations, twenty-two graph lessons, and seven string/HashMap labs.
- Graph BFS/DFS, Kahn topological sorting, Dijkstra, Union-Find, Kruskal MST,
  Bellman–Ford, Floyd–Warshall, and bipartite coloring.
- String windows, frequency maps, anagram groups, prefix-history maps,
  palindrome centers, and KMP.
- Java operation highlighting, variable watch, custom inputs, and playback controls.
- A complexity coach with loop/allocation worksheets, growth charts,
  recursion models, and time-versus-space quizzes.
- Staged practice hints, reasoning notes, manual solved tracking,
  scheduled recall cards, and progress export/import.

## Run locally

Open `index.html` in a browser, or serve this directory with any static server.
No build step or application dependencies are required. Google Fonts are optional;
the UI falls back to system fonts offline.

Optional example if Python is installed:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Validate

With Node.js installed:

```sh
npm test
```

Tests check the curriculum counts, known trace examples, randomized string/graph
results against independent oracles, and complexity estimates/uncertainty flags.

## Publish with GitHub Pages

For a public repository on GitHub Free, open **Settings → Pages**, choose
**Deploy from a branch → main → /(root)**, then save. Use the exact site URL
reported by GitHub. Assets use relative paths so project-page hosting works.

For Cloudflare Pages, upload the site assets with `index.html` at the upload root.
See [hosting instructions](docs/FREE-HOSTING.md).

## Scope

This is a static learning application. JavaScript trace generators simulate the
provided Java algorithms; it does not compile arbitrary Java or provide a custom
animation for every practice entry. Some Java scaffolds contain placeholders.

The complexity coach is a guided worksheet, not a universal verifier. Unclear
helpers, recursion, collection growth, object retention, library costs, and
unsupported syntax are flagged for further reasoning. Pasted code is not executed
or uploaded by the app.

Practice tracks are independent curated selections. NeetCode and RisingBrain are
linked as curriculum references; their full problem statements and solutions are
not reproduced. Difficulty labels are learning estimates.

Progress is saved only in the current browser. Export a backup before moving from
a local file to a hosted website; storage does not automatically cross origins.

## Source layout

- `app.js`: foundation lessons and traces.
- `catalogue.js`: practice library and question-specific notes.
- `teaching.js`: recognition guides and Java scaffolds.
- `labs.js`: graph and string/HashMap trace generators.
- `academy.js`: curriculum, practice, recall, and progress UI.
- `complexity.js`: complexity worksheet, teaching examples, and quizzes.
- `*.css`: responsive interface styling.
- `tests/`: validation scripts.

Graph expansion: 43 RisingBrain graph entries mapped across seven groups (checked 2026-10-16). BFS applications cover reachability, components, grids, multi-source spread, implicit states, coloring, and bitmask state. New visual lessons include multi-source BFS, connected components, and Shortest Path Visiting All Nodes. The full library is independently curated; only the graph checklist is mapped to the referenced sheet.

All 56 graph practice entries now have individual playbooks (state, transitions, example, counterexample, and complexity), organized across seven families. Additional visual models: directed cycle colors, low-link bridges/cut vertices, DAG path enumeration, reverse safe-state elimination, bottleneck Dijkstra, bounded-edge flights, global negative-cycle detection, transitive closure, DSU representative metadata, and Prim MST. Related models are labeled; a numbered graph demo is not a complete grid/string/problem simulation.
