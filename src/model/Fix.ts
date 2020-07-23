import {Meter, Wind} from "../config";
import Options from "./Options";

export function fixes(options: Options): Array<Fix> {
	// Use firestore
	return [/* fixes */]
}

export function positions(fixes: Array<Fix>): Array<{
	lat: number,
	lng: number
}> {
	return []
}

export default class Fix {
	constructor(
		public height: Meter,
		public wind: Wind
	) {
	}
}