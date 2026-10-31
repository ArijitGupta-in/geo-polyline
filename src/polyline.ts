import { distanceBetween } from "@arijitgupta/geo-distance";
import type { Coordinate } from "@arijitgupta/geo-distance";
import { normalizeCoordinate } from "./coordinate.js";
import type { DistanceUnit, Polyline, CoordinateInput } from "./types.js";
export function normalizePolyline(polyline: Polyline): Coordinate[] {
    if (!Array.isArray(polyline)) throw new TypeError("Polyline must be an array");
    return polyline.map(normalizeCoordinate);
}
export function getVertexCount(polyline: Polyline): number {
    if (!Array.isArray(polyline)) throw new TypeError("Polyline must be an array");
    return polyline.length;
}
export function getSegmentCount(polyline: Polyline): number { return Math.max(0, getVertexCount(polyline)-1); }
export function getPolylineLength(polyline: Polyline, unit: DistanceUnit = "meters"): number {
    const points=normalizePolyline(polyline);let total=0;
    for(let i=1;i<points.length;i+=1)total+=distanceBetween(points[i-1]!,points[i]!,unit);
    return total;
}
export function getSegment(polyline: Polyline,index:number):[Coordinate,Coordinate] {
    const points=normalizePolyline(polyline);
    if(!Number.isInteger(index))throw new TypeError("Segment index must be an integer");
    if(index<0||index>=points.length-1)throw new RangeError("Segment index is outside the polyline");
    return [points[index]!,points[index+1]!];
}
export function reversePolyline(polyline:Polyline):Coordinate[]{return normalizePolyline(polyline).reverse();}
export function deduplicatePolyline(polyline:Polyline,toleranceMeters=0):Coordinate[]{
    if(typeof toleranceMeters!=="number"||!Number.isFinite(toleranceMeters))throw new TypeError("toleranceMeters must be a finite number");
    if(toleranceMeters<0)throw new RangeError("toleranceMeters must not be negative");
    const points=normalizePolyline(polyline);if(points.length<2)return points;
    const result:Coordinate[]=[points[0]!];
    for(let i=1;i<points.length;i+=1)if(distanceBetween(result[result.length-1]!,points[i]!)>toleranceMeters)result.push(points[i]!);
    return result;
}
export function mergePolylines(left:Polyline,right:Polyline,toleranceMeters=0):Coordinate[]{
    if(typeof toleranceMeters!=="number"||!Number.isFinite(toleranceMeters))throw new TypeError("toleranceMeters must be a finite number");
    if(toleranceMeters<0)throw new RangeError("toleranceMeters must not be negative");
    const a=normalizePolyline(left),b=normalizePolyline(right);if(!a.length)return b;if(!b.length)return a;
    if(distanceBetween(a[a.length-1]!,b[0]!)>toleranceMeters)throw new RangeError("Polylines do not meet within tolerance");
    return [...a,...b.slice(1)];
}
export function mapPolyline(polyline:Polyline,transform:(coordinate:Coordinate,index:number)=>CoordinateInput):Coordinate[]{
    if(typeof transform!=="function")throw new TypeError("transform must be a function");
    return normalizePolyline(polyline).map((p,i)=>normalizeCoordinate(transform(p,i)));
}
