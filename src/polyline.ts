import { distanceBetween, normalizeCoordinate, pathLength } from "./geo.js";
import type { Coordinate, DistanceUnit, Polyline, CoordinateInput } from "./types.js";

function assertPolyline(polyline: Polyline): void {
    if (!Array.isArray(polyline)) throw new TypeError("Polyline must be an array");
    for (let i = 0; i < polyline.length; i += 1)
        if (!Object.hasOwn(polyline, i))
            throw new TypeError("Polyline is missing a vertex at index " + i);
}

/**
 * Validates and converts every vertex to a fresh decimal-degree coordinate.
 *
 * The input is not mutated. Empty and single-vertex polylines are valid.
 *
 * @param polyline - Ordered decimal-degree or DMS coordinates.
 * @returns A new array of normalized coordinates.
 * @throws {TypeError} If the input is not an array, is sparse, or contains malformed coordinates.
 * @throws {RangeError} If a coordinate is outside its valid geographic range.
 */
export function normalizePolyline(polyline: Polyline): Coordinate[] {
    assertPolyline(polyline);
    return polyline.map(normalizeCoordinate);
}

/**
 * Returns the number of vertices in a dense polyline array.
 *
 * This checks the array and its indices but does not normalize or validate
 * coordinate values.
 *
 * @param polyline - Polyline array to count.
 * @returns The number of array entries.
 * @throws {TypeError} If the input is not an array or has a missing vertex index.
 */
export function getVertexCount(polyline: Polyline): number {
    assertPolyline(polyline);
    return polyline.length;
}

/**
 * Returns the number of consecutive segments in a polyline.
 *
 * This checks the array and its indices but does not normalize or validate
 * coordinate values. Empty and single-vertex polylines have zero segments.
 *
 * @param polyline - Polyline array to count.
 * @returns `max(0, vertexCount - 1)`.
 * @throws {TypeError} If the input is not an array or has a missing vertex index.
 */
export function getSegmentCount(polyline: Polyline): number {
    return Math.max(0, getVertexCount(polyline) - 1);
}

/**
 * Sums the great-circle distances between consecutive vertices.
 *
 * Uses `geo-distance`'s spherical Haversine calculation. A path with fewer
 * than two vertices has zero length. The input is not mutated.
 *
 * @param polyline - Ordered decimal-degree or DMS coordinates.
 * @param unit - Output distance unit; defaults to meters.
 * @returns The total path length in `unit`.
 * @throws {TypeError} If the polyline is not a dense array, a coordinate is malformed,
 *   or the unit is unsupported.
 * @throws {RangeError} If a coordinate is outside its valid geographic range.
 */
export function getPolylineLength(polyline: Polyline, unit: DistanceUnit = "meters"): number {
    assertPolyline(polyline);
    return pathLength(polyline, unit);
}

/**
 * Returns the normalized endpoints of one segment.
 *
 * Segment `index` connects vertices `index` and `index + 1`. The input is not
 * mutated.
 *
 * @param polyline - Ordered decimal-degree or DMS coordinates.
 * @param index - Zero-based index of the segment's first vertex.
 * @returns A tuple containing the segment's start and end coordinates.
 * @throws {TypeError} If `index` is not an integer, or the polyline or a coordinate is invalid.
 * @throws {RangeError} If `index` is outside the segment range or a coordinate is out of range.
 */
export function getSegment(polyline: Polyline, index: number): [Coordinate, Coordinate] {
    const points = normalizePolyline(polyline);
    if (!Number.isInteger(index)) throw new TypeError("Segment index must be an integer");
    if (index < 0 || index >= points.length - 1)
        throw new RangeError("Segment index is outside the polyline");
    return [points[index]!, points[index + 1]!];
}

/**
 * Returns a normalized copy of the polyline in reverse vertex order.
 *
 * @param polyline - Ordered decimal-degree or DMS coordinates.
 * @returns A new array containing normalized coordinates in reverse order.
 * @throws {TypeError} If the polyline is not a dense array or contains malformed coordinates.
 * @throws {RangeError} If a coordinate is outside its valid geographic range.
 */
export function reversePolyline(polyline: Polyline): Coordinate[] {
    return normalizePolyline(polyline).reverse();
}

/**
 * Removes consecutive vertices whose distance from the last retained vertex
 * is less than or equal to the tolerance.
 *
 * The first vertex is retained when present. Non-consecutive revisits are not
 * removed. A zero tolerance removes exact consecutive duplicates. The input
 * is not mutated.
 *
 * @param polyline - Ordered decimal-degree or DMS coordinates.
 * @param toleranceMeters - Maximum distance in meters for a vertex to be removed; defaults to zero.
 * @returns A new array of normalized retained coordinates.
 * @throws {TypeError} If the tolerance is not finite, or the polyline/coordinate is invalid.
 * @throws {RangeError} If the tolerance is negative or a coordinate is outside its valid range.
 */
export function deduplicatePolyline(polyline: Polyline, toleranceMeters = 0): Coordinate[] {
    if (typeof toleranceMeters !== "number" || !Number.isFinite(toleranceMeters))
        throw new TypeError("toleranceMeters must be finite");
    if (toleranceMeters < 0) throw new RangeError("toleranceMeters must not be negative");
    const points = normalizePolyline(polyline);
    if (points.length < 2) return points;
    const result = [points[0]!];
    for (let i = 1; i < points.length; i += 1)
        if (distanceBetween(result[result.length - 1]!, points[i]!) > toleranceMeters)
            result.push(points[i]!);
    return result;
}

/**
 * Joins two polylines when the left endpoint and right start point are within
 * the given distance tolerance.
 *
 * The left endpoint is retained and the right polyline's first vertex is
 * dropped, even if the two endpoint coordinates differ within tolerance. An
 * empty input returns a normalized copy of the other input. Neither input is
 * mutated.
 *
 * @param left - Polyline that precedes the right polyline.
 * @param right - Polyline that follows the left polyline.
 * @param toleranceMeters - Maximum endpoint gap in meters; defaults to zero.
 * @returns A new array of normalized coordinates.
 * @throws {TypeError} If the tolerance is not finite, or either polyline/coordinate is invalid.
 * @throws {RangeError} If the tolerance is negative, a coordinate is outside its valid range,
 *   or the endpoints are farther apart than the tolerance.
 */
export function mergePolylines(left: Polyline, right: Polyline, toleranceMeters = 0): Coordinate[] {
    if (typeof toleranceMeters !== "number" || !Number.isFinite(toleranceMeters))
        throw new TypeError("toleranceMeters must be finite");
    if (toleranceMeters < 0) throw new RangeError("toleranceMeters must not be negative");
    const a = normalizePolyline(left),
        b = normalizePolyline(right);
    if (!a.length) return b;
    if (!b.length) return a;
    if (distanceBetween(a[a.length - 1]!, b[0]!) > toleranceMeters)
        throw new RangeError("Polylines do not meet within tolerance");
    return [...a, ...b.slice(1)];
}

/**
 * Applies a transform to each normalized vertex and validates each result.
 *
 * The callback receives the normalized coordinate and its zero-based index.
 * The input is not mutated.
 *
 * @param polyline - Ordered decimal-degree or DMS coordinates.
 * @param transform - Function returning a decimal-degree or DMS coordinate for each vertex.
 * @returns A new array of normalized transformed coordinates.
 * @throws {TypeError} If the transform is not a function, or the polyline/result coordinate is invalid.
 * @throws {RangeError} If an input or transformed coordinate is outside its valid geographic range.
 */
export function mapPolyline(
    polyline: Polyline,
    transform: (coordinate: Coordinate, index: number) => CoordinateInput,
): Coordinate[] {
    if (typeof transform !== "function") throw new TypeError("transform must be a function");
    return normalizePolyline(polyline).map((p, i) => normalizeCoordinate(transform(p, i)));
}
