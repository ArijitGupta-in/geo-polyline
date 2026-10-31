# Contributing to @arijitgupta/geo-polyline

## Prerequisites

- Node.js 22.12 or later
- npm 10 or later

## Setup

```bash
git clone https://github.com/ArijitGupta-in/geo-polyline.git
cd geo-polyline
npm install
```

## Development commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run tests with Vitest |
| `npm run test:coverage` | Run tests and generate a coverage report |
| `npm run check` | Type-check source and tests |
| `npm run lint:md` | Lint Markdown files |
| `npm run clean` | Remove generated `dist/` output |
| `npm run build` | Clean and compile TypeScript to `dist/` |

## Project conventions

- Source files live under `src/`; tests sit alongside their subjects.
- The public API is defined only by exports from `src/index.ts`.
- Use strict TypeScript and `import type` for type-only imports.
- Use `@arijitgupta/geo-core` for shared coordinate types and normalization. Keep imports of shared geo functions centralized in `src/geo.ts`; do not duplicate those contracts or calculations.
- Reuse `@arijitgupta/geo-distance` for great-circle distances and path lengths rather than implementing a second distance model.
- Validate untrusted inputs at public API boundaries.
- Keep geographic assumptions and edge-case behavior explicit in documentation and tests.
- Every public function needs happy-path, boundary, and invalid-input tests.
- Add TSDoc for each exported function and update the README and changelog when public behavior or API changes.
- Avoid `as any` in tests unless deliberately testing unsafe input.

## Design before implementation

Keep this package focused on operations over ordered coordinate sequences. Discuss new public exports and algorithmic behavior in an issue before implementation, and keep responsibilities distinct from `geo-distance`, `geo-simplify`, and `geo-filter`.

## Commit messages

Use Conventional Commits, for example:

```text
feat: add polyline segment iterator
fix: handle antimeridian crossing
test: cover empty path behavior
docs: clarify coordinate ordering
chore: update Vitest
```

## Changelog

Add user-visible changes under [Unreleased] in `CHANGELOG.md`, using Keep a Changelog categories.

## Pull requests

1. Create a branch from `main`.
2. Make a focused change and add tests.
3. Run `npm run check`, `npm run lint:md`, and `npm run test:coverage`.
4. Explain what changed and why; link related issues.

## License

By contributing, you agree that contributions will be licensed under the MIT License.
