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
| `npm run test:coverage` | Run tests and enforce coverage thresholds |
| `npm run check` | Type-check source and tests |
| `npm run lint:md` | Lint Markdown files |
| `npm run build` | Compile TypeScript to `dist/` |

## Project conventions

- Source files live under `src/`; tests sit alongside their subjects.
- The public API is defined only by exports from `src/index.ts`.
- Use strict TypeScript and `import type` for type-only imports.
- Use `@arijitgupta/geo-core` for shared coordinate types and validation. Do not duplicate those contracts.
- Validate untrusted inputs at public API boundaries.
- Keep geographic assumptions and edge-case behavior explicit in documentation and tests.
- Every public function needs happy-path, boundary, and invalid-input tests.
- Avoid `as any` in tests unless deliberately testing unsafe input.

## Design before implementation

The package scope and API are not finalized. Open or discuss an issue before introducing public exports or committing to algorithmic behavior. Keep this library's responsibilities distinct from `geo-distance`, `geo-simplify`, and `geo-filter`.

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
