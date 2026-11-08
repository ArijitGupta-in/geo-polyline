# Changelog

All notable changes to this project will be documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-11-09

### Added

- Polyline normalization, great-circle length, segment access, reversal, deduplication, merging, and mapping.
- Unit tests for public operations and validation.

### Changed

- Re-exported `DistanceUnit` from `geo-distance` and added support for nautical-mile path lengths.
- Added TSDoc to all public polyline operations, including their input, error, and edge-case behavior.
- Reused `geo-core` for shared coordinate types and normalization, and `geo-distance` for path length and point-to-point measurements.
- Centralized geo package imports in the internal `src/geo.ts` module.
- Expanded the README with the complete public API, input semantics, distance model, and dependency details.

### Fixed

- Rejected sparse polylines instead of allowing array operations to skip missing vertices.
- Rejected unsupported distance units instead of allowing inherited object keys to produce invalid results.
- Documented and tested which endpoint is retained when merging paths within tolerance.
- Cleaned generated output before builds so removed source modules cannot remain in the published package.

### Internal

- Enforced the same 80% line, function, branch, and statement coverage thresholds used by the published `geo-core`, `geo-distance`, `geo-bearing`, and `geo-bounds` packages.
