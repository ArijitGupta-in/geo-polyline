import { distanceBetween } from "@arijitgupta/geo-distance";
import type { Coordinate } from "./types.js";
/** Great-circle distance on a sphere using the Haversine formula. */
export function distanceMeters(a: Coordinate, b: Coordinate): number {
    return distanceBetween(a, b);
}
