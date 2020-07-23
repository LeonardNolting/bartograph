import {Meter, Wind} from "../config";

export default class Fix {
	constructor(
		public height: Meter,
		public wind: Wind
	) {
	}
}