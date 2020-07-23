import {Meter, Wind} from "../config";

export default class Options {
	constructor(
		public height: Meter | null = null,
		public wind: Wind | null = null,
		public time: Date | null = null,
	) {
	}
}