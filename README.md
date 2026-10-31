# @arijitgupta/geo-polyline

A lightweight TypeScript library for working with ordered geographic coordinate paths (polylines).

This package is in its initial scaffold stage. Its public API and exact operation set will be defined through design issues before implementation.

## Planned scope

The library will focus on the representation and fundamental operations of geographic paths. Candidate areas include path construction and inspection, segment access, and path-level transformations that do not belong in distance or simplification packages.

Algorithm selection and API contracts are intentionally not frozen.

## Coordinate model

Shared coordinate types, DMS conversion, normalization, and validation are provided by [`@arijitgupta/geo-core`](https://www.npmjs.com/package/@arijitgupta/geo-core).

## Development

Requires Node.js 22.12+ and npm 10+.

```bash
npm install
npm test
npm run test:coverage
npm run check
npm run lint:md
npm run build
```

## Status

Under initial development. No stable public API has been released.

## License

MIT
