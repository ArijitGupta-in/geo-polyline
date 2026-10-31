# Review findings

Findings from the review of `@arijitgupta/geo-polyline`.

| Priority | Finding | Status |
| --- | --- | --- |
| Medium | `getPolylineLength` accepted inherited object keys such as `"toString"` as distance units, producing `NaN` rather than rejecting an unsupported unit. | Fixed: unit validation now checks own keys. |
| Low | Sparse input arrays could bypass coordinate normalization because `Array.map` skips holes; vertex counts could also silently include absent vertices. | Fixed: array operations now reject missing own vertex indices. |
| Low | A merge within tolerance drops the right path's first vertex and retains the left path's endpoint. The old API description did not specify which coordinate survives. | Fixed: documented and tested the endpoint retention behavior. |
| Enhancement | Repeated normalization allocated an additional coordinate array for aggregate length calculations. | Fixed: `getPolylineLength` uses `geo-distance`'s `pathLength`, which validates and prepares each point once. |
| Enhancement | Coordinate and DMS types, validation/normalization, and spherical distance calculations were duplicated from sibling geo packages. | Fixed: types and normalization are reused from `geo-core`; length and point-to-point distances are reused from `geo-distance`. |
| Enhancement | `DistanceUnit` was separately declared and omitted `geo-distance`'s nautical-mile unit. | Fixed: the public type is re-exported from `geo-distance`, and `getPolylineLength` now supports nautical miles. |
