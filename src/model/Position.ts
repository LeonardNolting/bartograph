import Fix from "./Fix";

export default interface Position {
	location,
	weight: number,
}

export function position(fix: Fix): Position {
	return {
		// @ts-ignore
		location: new window.google.maps.LatLng(fix.lat, fix.lng),
		weight: fix.vario,
	}
}
export function positions(...fixes: Array<Fix>): Array<Position> {
	return fixes.map(position)
}