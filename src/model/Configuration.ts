import {Degree, KMH, Meter} from "../config";

export default interface Configuration {
	altitude: Meter | null,
	windSpeed: KMH | null,
	windDirection: Degree | null,
	time: Date | null,
}