import type { Coordinate } from "./types.js";
import { normalizeCoordinate } from "./coordinate.js";
import { distanceMeters } from "./geodesy.js";
import type { DistanceUnit, Polyline, CoordinateInput } from "./types.js";
const factor:Record<DistanceUnit,number>={meters:1,kilometers:0.001,miles:1/1609.344,feet:1/0.3048};
export function normalizePolyline(polyline:Polyline):Coordinate[]{if(!Array.isArray(polyline))throw new TypeError("Polyline must be an array");return polyline.map(normalizeCoordinate);}
export function getVertexCount(polyline:Polyline):number{if(!Array.isArray(polyline))throw new TypeError("Polyline must be an array");return polyline.length;}
export function getSegmentCount(polyline:Polyline):number{return Math.max(0,getVertexCount(polyline)-1);}
export function getPolylineLength(polyline:Polyline,unit:DistanceUnit="meters"):number{
 if(!(unit in factor))throw new TypeError("Unsupported distance unit: "+unit);
 const points=normalizePolyline(polyline);let total=0;for(let i=1;i<points.length;i+=1)total+=distanceMeters(points[i-1]!,points[i]!);return total*factor[unit];
}
export function getSegment(polyline:Polyline,index:number):[Coordinate,Coordinate]{
 const points=normalizePolyline(polyline);if(!Number.isInteger(index))throw new TypeError("Segment index must be an integer");
 if(index<0||index>=points.length-1)throw new RangeError("Segment index is outside the polyline");return[points[index]!,points[index+1]!];
}
export function reversePolyline(polyline:Polyline):Coordinate[]{return normalizePolyline(polyline).reverse();}
export function deduplicatePolyline(polyline:Polyline,toleranceMeters=0):Coordinate[]{
 if(typeof toleranceMeters!=="number"||!Number.isFinite(toleranceMeters))throw new TypeError("toleranceMeters must be finite");
 if(toleranceMeters<0)throw new RangeError("toleranceMeters must not be negative");
 const points=normalizePolyline(polyline);if(points.length<2)return points;const result=[points[0]!];
 for(let i=1;i<points.length;i+=1)if(distanceMeters(result[result.length-1]!,points[i]!)>toleranceMeters)result.push(points[i]!);return result;
}
export function mergePolylines(left:Polyline,right:Polyline,toleranceMeters=0):Coordinate[]{
 if(typeof toleranceMeters!=="number"||!Number.isFinite(toleranceMeters))throw new TypeError("toleranceMeters must be finite");
 if(toleranceMeters<0)throw new RangeError("toleranceMeters must not be negative");
 const a=normalizePolyline(left),b=normalizePolyline(right);if(!a.length)return b;if(!b.length)return a;
 if(distanceMeters(a[a.length-1]!,b[0]!)>toleranceMeters)throw new RangeError("Polylines do not meet within tolerance");return[...a,...b.slice(1)];
}
export function mapPolyline(polyline:Polyline,transform:(coordinate:Coordinate,index:number)=>CoordinateInput):Coordinate[]{
 if(typeof transform!=="function")throw new TypeError("transform must be a function");return normalizePolyline(polyline).map((p,i)=>normalizeCoordinate(transform(p,i)));
}
