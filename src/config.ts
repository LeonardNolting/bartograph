export type Meter = number;
export type Degree = number;
export type KMH = number;

const config = {
	map: {
		zoom: 7,
		center: {lat: 51.163392, lng: 10.447718},
		get options() {
			return {
				mapTypeId: 'terrain',
				disableDefaultUI: true,
				zoomControl: true,
				zoomControlOptions: {
					// @ts-ignore
					position: window.google.maps.ControlPosition.RIGHT_TOP
				},
				mapTypeControl: true,
				mapTypeControlOptions: {
					mapTypeIds: [
						"terrain",
						"hybrid",
						"roadmap"
					]
				},
				scaleControl: true,
				streetViewControl: false,
				rotateControl: true,
				fullscreenControl: false
			}
		},
		heatmap: {
			options: {
				maxIntensity: 8 // Prevent exceptional thermals from ruining the scale
			}
		},
		libraries: ["visualization"]
	},
	inputs: {
		windSpeed: {step: 5},
		windDirection: {step: 10, min: 0, max: 360},
		altitude: {step: 50},
		time: {step: 1800}
	},
	styles: {
		fab: {
			bottom: "24px",
			right: "10px",
			position: "absolute"
		}
	}
};
export default config