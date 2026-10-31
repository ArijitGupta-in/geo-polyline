# @arijitgupta/geo-polyline

Validated operations for ordered geographic coordinate sequences. Accepts decimal-degree and DMS coordinates through [`@arijitgupta/geo-core`](https://www.npmjs.com/package/@arijitgupta/geo-core).

## Install

```bash
npm install @arijitgupta/geo-polyline
```

## Example

```ts
import { getPolylineLength, deduplicatePolyline, reversePolyline } from "@arijitgupta/geo-polyline";
const route = [{ latitude: 22.5726, longitude: 88.3639 }, { latitude: 22.595, longitude: 88.4 }];
const lengthKm = getPolylineLength(route, "kilometers");
const clean = deduplicatePolyline(route, 2);
const reversed = reversePolyline(clean);
```

## API

- `normalizePolyline(path)`: validate and convert vertices to decimal degrees.
- `getVertexCount(path)`, `getSegmentCount(path)`: count vertices and consecutive segments.
- `getPolylineLength(path, unit?)`: sum great-circle distances; defaults to meters. Units: meters, kilometers, miles, feet, nauticalMiles.
- `getSegment(path, index)`: get the segment starting at a zero-based vertex index.
- `reversePolyline(path)`: return a reversed copy.
- `deduplicatePolyline(path, toleranceMeters?)`: remove consecutive vertices within a threshold; defaults to exact duplicates.
- `mergePolylines(left, right, toleranceMeters?)`: join paths only when endpoints meet within tolerance; the join vertex is included once.
- `mapPolyline(path, transform)`: transform each vertex and validate the result.

Paths may be empty or contain one vertex. Inputs are not mutated. Non-consecutive revisits are preserved. Invalid coordinates propagate `geo-core` errors; invalid indices and negative tolerances throw `RangeError`.

## Development

Requires Node.js 22.12+ and npm 10+. Run `npm install`, `npm test`, `npm run check`, `npm run build`, and `npm run lint:md`.

## License

MIT
