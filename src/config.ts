export type Meter = number;
export type Degree = number;
export type KMH = number;
export type Wind = {
	direction: Degree,
	speed: KMH
}

export const config = {
	map: {
		zoom: 7,
		center: {lat: 51.163392, lng: 10.447718}
	}
};