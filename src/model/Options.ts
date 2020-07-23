import {Meter, Wind} from "../config";

export default class Options {
	constructor(
		private height: Meter | null = null,
		private wind: Wind | null = null
	) {
	}
}