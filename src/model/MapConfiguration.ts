import {Degree, KMH, Meter} from "../config";

export default interface MapConfiguration {
	altitude: Meter | null,
	windSpeed: KMH | null,
	windDirection: Degree | null,
	time: Date | null,
	month: Date | null,
}