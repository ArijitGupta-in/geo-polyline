import type { CoordinateInput } from "@arijitgupta/geo-core";

export type {
    Coordinate,
    CoordinateInput,
    DMSCoordinate,
    LatitudeDMS,
    LatitudeDirection,
    LongitudeDMS,
    LongitudeDirection,
} from "@arijitgupta/geo-core";

export type { DistanceUnit } from "@arijitgupta/geo-distance";
export type Polyline = readonly CoordinateInput[];
