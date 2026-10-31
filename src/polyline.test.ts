import { describe, expect, it } from "vitest";
import { deduplicatePolyline, getPolylineLength, getSegment, getSegmentCount, getVertexCount, mapPolyline, mergePolylines, normalizePolyline, reversePolyline } from "./index.js";
const a={latitude:0,longitude:0}, b={latitude:0,longitude:1}, c={latitude:1,longitude:1};
describe("polyline",()=>{
 it("normalizes and counts vertices and segments",()=>{expect(normalizePolyline([a])).toEqual([a]);expect(getVertexCount([a,b,c])).toBe(3);expect(getSegmentCount([a,b,c])).toBe(2);expect(getSegmentCount([])).toBe(0);});
 it("measures the sum of great-circle segment distances",()=>{expect(getPolylineLength([a,b],"kilometers")).toBeCloseTo(111.195,1);expect(getPolylineLength([])).toBe(0);});
 it("returns a segment and validates its index",()=>{expect(getSegment([a,b,c],1)).toEqual([b,c]);expect(()=>getSegment([a,b],-1)).toThrow(RangeError);expect(()=>getSegment([a,b],0.5)).toThrow(TypeError);});
 it("reverses without mutating input",()=>{const path=[a,b];expect(reversePolyline(path)).toEqual([b,a]);expect(path).toEqual([a,b]);});
 it("removes consecutive duplicates and near-duplicates",()=>{expect(deduplicatePolyline([a,a,b,a])).toEqual([a,b,a]);expect(deduplicatePolyline([a,{latitude:0,longitude:0.000001},b],1)).toEqual([a,b]);});
 it("merges only connected paths",()=>{expect(mergePolylines([a,b],[b,c])).toEqual([a,b,c]);expect(mergePolylines([], [b])).toEqual([b]);expect(()=>mergePolylines([a],[c])).toThrow(RangeError);});
 it("maps and validates transformed points",()=>{expect(mapPolyline([a],p=>({latitude:p.latitude+1,longitude:p.longitude}))).toEqual([{latitude:1,longitude:0}]);expect(()=>mapPolyline([a],()=>({latitude:91,longitude:0}))).toThrow(RangeError);});
 it("validates path and tolerance",()=>{expect(()=>normalizePolyline(null as never)).toThrow(TypeError);expect(()=>deduplicatePolyline([a],-1)).toThrow(RangeError);});
});
