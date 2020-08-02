import {Degree, KMH, Meter} from "../config";
import MapConfiguration from "./MapConfiguration";

export default interface Fix {
	altitude: Meter,
	windDirection: Degree,
	windSpeed: KMH,
	lat: number,
	lng: number,
	vario: number
}

export async function fixes(configuration: MapConfiguration): Promise<Array<Fix>> {
	await new Promise(resolve => setTimeout(resolve, 2000))
	return [
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.782, lng: -122.447, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.782, lng: -122.445, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.782, lng: -122.443, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.782, lng: -122.441, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.782, lng: -122.439, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.782, lng: -122.437, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.782, lng: -122.435, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.785, lng: -122.447, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.785, lng: -122.445, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.785, lng: -122.443, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.785, lng: -122.441, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.785, lng: -122.439, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.785, lng: -122.437, vario: 1},
		{altitude: 100, windDirection: 0, windSpeed: 10, lat: 37.785, lng: -122.435, vario: 1}
	].map(fix => {
		fix.lng += configuration.altitude || 0 // for obvious changes after configuring (the altitude)
		return fix
	})
	// Use firestore
	// return [/* fixes */]
}