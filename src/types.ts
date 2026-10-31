import type { Coordinate, DMSCoordinate } from "@arijitgupta/geo-distance";
export type { Coordinate, DMSCoordinate } from "@arijitgupta/geo-distance";
export type CoordinateInput = Coordinate | DMSCoordinate;
export type DistanceUnit = "meters" | "kilometers" | "miles" | "feet";
export type Polyline = readonly CoordinateInput[];
