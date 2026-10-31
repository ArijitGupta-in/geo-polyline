# @arijitgupta/geo-polyline

Validated operations for ordered geographic coordinate sequences. Accepts decimal-degree and DMS coordinates and returns normalized decimal-degree coordinates. Coordinate types and normalization are provided by [`@arijitgupta/geo-core`](https://www.npmjs.com/package/@arijitgupta/geo-core); great-circle distances are provided by [`@arijitgupta/geo-distance`](https://www.npmjs.com/package/@arijitgupta/geo-distance).

## Install

```bash
npm install @arijitgupta/geo-polyline
```

The required geo packages are installed as runtime dependencies automatically.

## Example

```ts
import {
    deduplicatePolyline,
    getPolylineLength,
    reversePolyline,
    type Polyline,
} from "@arijitgupta/geo-polyline";

const route: Polyline = [
    { latitude: 22.5726, longitude: 88.3639 },
    { latitude: 22.595, longitude: 88.4 },
];

const lengthKm = getPolylineLength(route, "kilometers");
const cleanRoute = deduplicatePolyline(route, 2);
const reversedRoute = reversePolyline(cleanRoute);
```

Coordinates may also be provided in DMS format:

```ts
import type { DMSCoordinate } from "@arijitgupta/geo-polyline";

const point: DMSCoordinate = {
    latitude: { degrees: 22, minutes: 34, seconds: 21.36, direction: "N" },
    longitude: { degrees: 88, minutes: 21, seconds: 50.04, direction: "E" },
};
```

## API

All functions are exported from the package root. Inputs are not mutated.

| Function | Description |
| --- | --- |
| `normalizePolyline(polyline)` | Validate and convert every vertex to a fresh decimal-degree coordinate. |
| `getVertexCount(polyline)` | Count array entries after checking that the array is dense. Coordinate values are not validated. |
| `getSegmentCount(polyline)` | Return `max(0, vertexCount - 1)` after checking that the array is dense. Coordinate values are not validated. |
| `getPolylineLength(polyline, unit?)` | Sum great-circle distances between consecutive vertices. Defaults to meters. |
| `getSegment(polyline, index)` | Return the normalized coordinates at `index` and `index + 1`. |
| `reversePolyline(polyline)` | Return a normalized copy in reverse order. |
| `deduplicatePolyline(polyline, toleranceMeters?)` | Remove a vertex when it is within or exactly at the tolerance from the last retained vertex. Defaults to zero. |
| `mergePolylines(left, right, toleranceMeters?)` | Join paths if the left endpoint is within tolerance of the right start point. Defaults to zero. |
| `mapPolyline(polyline, transform)` | Transform each normalized vertex, then validate and normalize each result. |

`DistanceUnit` is re-exported from `geo-distance` and supports `"meters"`, `"kilometers"`, `"miles"`, `"feet"`, and `"nauticalMiles"`. `Polyline` is a readonly array of `CoordinateInput`; `CoordinateInput` accepts either a decimal-degree `Coordinate` or a `DMSCoordinate`.

### Input and edge-case behavior

- Empty and single-vertex paths are valid. Their lengths and segment counts are zero.
- Sparse arrays (arrays with missing vertex indices) are rejected. `getVertexCount` and `getSegmentCount` check array shape but do not validate coordinate contents.
- Coordinate values are validated by `geo-core`. Longitude `-180` is normalized to `180`; out-of-range values are rejected, not wrapped.
- Duplicates removed by `deduplicatePolyline` are consecutive only. The first point is retained, and later points are compared with the last retained point. Non-consecutive revisits remain.
- `mergePolylines` keeps the left path's endpoint and drops the right path's first vertex, even if their coordinates differ but are within tolerance. The endpoints are not averaged or snapped. If either path is empty, the other path is returned as a normalized copy.
- Non-finite or negative tolerances are rejected. Non-integer segment indices throw `TypeError`; out-of-range indices throw `RangeError`. Invalid coordinates and unsupported distance units are also rejected with `TypeError` or `RangeError`.

## Distance model

Polyline length, merging, and deduplication use `geo-distance`'s spherical Haversine model with a mean Earth radius of 6,371,000 m. Results are great-circle estimates, not ellipsoidal geodesics.

## Development

Requires Node.js 22.12+ and npm 10+.

```bash
npm install
npm test
npm run check
npm run build
npm run lint:md
```

Run `npm run test:coverage` to generate a coverage report.

## License

MIT
