import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import Options from "../model/Options";
import Fix, {fixes} from "../model/Fix";

class Map extends Component<{
	center: {
		lat: number,
		lng: number,
	},
	zoom: number,
	options: Options,
}, {
	fixes: Array<Fix>
}> {
	componentDidMount() {
		this.setState({
			fixes: fixes(this.props.options)
		})
	}

	render() {
		return (
			<div style={{height: '100vh', width: '100%'}}>{
				this.state.fixes.length === 0 ? <span>Loading...</span> :
					<GoogleMapReact
						heatmap={{
							positions: this.state.fixes,
							options: {
								radius: 20,
								opacity: 1,
							},
						}}
						bootstrapURLKeys={{
							key: process.env.GOOGLE_API_KEY,
							libraries: ['visualization'],
						}}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
						options={{
							mapTypeId: 'hybrid',
							disableDefaultUI: true,
							zoomControl: true,
							mapTypeControl: false,
							scaleControl: true,
							streetViewControl: false,
							rotateControl: true,
							fullscreenControl: false
						}}
					/>
			}</div>
		);
	}

	/*render () {
		const div = (
			<div id="map" />
		)

		const map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 51.163392, lng: 10.447718},
			zoom: 7,
			mapTypeId: 'hybrid',
			disableDefaultUI: true,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: true,
			streetViewControl: false,
			rotateControl: true,
			fullscreenControl: false
		});

		fixes.forEach(fix => fix.location = new google.maps.LatLng(...fix.pos))
		/!*const data = []

		const random = {
			min: {
				lat: 35.127087,
				lng: 0.384122,
			},
			max: {
				lat: 61.199553,
				lng: 36.543144,
			},
		};

		for (let i = 0; i < 50000; i++) {
			const position = {
				lat: random.min.lat + Math.random() * (random.max.lat - random.min.lat),
				lng: random.min.lng + Math.random() * (random.max.lng - random.min.lng),
			};

			const location = new google.maps.LatLng(...Object.values(position)),
				weight = Math.random() * 10;
			data.push({location, weight})
		}*!/

		// const path = new google.maps.Polyline({
		//     path: pathCoordinates,
		//     geodesic: true,
		//     strokeColor: '#FF0000',
		//     strokeOpacity: 1.0,
		//     strokeWeight: 2
		// });
		// path.setMap(map);

		const heatmap = new google.maps.visualization.HeatmapLayer({
			fixes,
			maxIntensity: 8 // Prevent exceptional thermals from ruining the scale
		});
		heatmap.setMap(map);

		return div;
	}*/
}

export default Map;