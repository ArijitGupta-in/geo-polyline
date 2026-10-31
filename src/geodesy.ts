import type { Coordinate } from "./types.js";
const EARTH_RADIUS_METERS=6_371_000;
const RAD=Math.PI/180;
/** Great-circle distance on a sphere using the Haversine formula. */
export function distanceMeters(a:Coordinate,b:Coordinate):number{
 const dLat=(b.latitude-a.latitude)*RAD,dLon=(b.longitude-a.longitude)*RAD;
 const lat1=a.latitude*RAD,lat2=b.latitude*RAD;
 const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
 const central=2*Math.atan2(Math.sqrt(Math.max(0,Math.min(1,h))),Math.sqrt(Math.max(0,1-h)));
 return EARTH_RADIUS_METERS*central;
}
