# @arijitgupta/geo-polyline

Validated operations for ordered geographic coordinate sequences. Accepts decimal-degree and DMS coordinates, validates geographic ranges, and normalizes inputs to decimal degrees using `@arijitgupta/geo-core`. Great-circle distances use `@arijitgupta/geo-distance`.

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
- `getPolylineLength(path, unit?)`: sum great-circle distances; defaults to meters. Units: meters, kilometers, miles, feet, nautical miles.
- `getSegment(path, index)`: get the segment starting at a zero-based vertex index.
- `reversePolyline(path)`: return a reversed copy.
- `deduplicatePolyline(path, toleranceMeters?)`: remove consecutive vertices within a threshold; defaults to exact duplicates.
- `mergePolylines(left, right, toleranceMeters?)`: join paths only when endpoints meet within tolerance. The left path's endpoint is kept and the right path's first vertex is dropped, even when they are merely within tolerance; endpoints are not averaged or snapped.
- `mapPolyline(path, transform)`: transform each vertex and validate the result.

Paths may be empty or contain one vertex. Sparse arrays (arrays with missing vertex indices) are invalid. Inputs are not mutated. Non-consecutive revisits are preserved. Coordinate normalization follows `geo-core`, including canonicalizing longitude `-180` to `180`. Invalid coordinates throw `TypeError` or `RangeError`; non-integer segment indices throw `TypeError`, out-of-range indices throw `RangeError`, and negative tolerances throw `RangeError`.

Distances use `@arijitgupta/geo-distance`'s spherical Haversine calculation with mean Earth radius 6,371,000 m. This is an estimate, not an ellipsoidal geodesic.

## Development

Requires Node.js 22.12+ and npm 10+. Run `npm install`, `npm test`, `npm run check`, `npm run build`, and `npm run lint:md`.

## License

MIT
