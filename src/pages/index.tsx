import Map from "../components/Map";
import React from "react";
import config from "../config";
import {LoadScript} from "@react-google-maps/api";

const Home = () => (
	<LoadScript
		googleMapsApiKey={process.env.GOOGLE_API_KEY}
		libraries={config.map.libraries}>
		<Map center={config.map.center}
		     zoom={config.map.zoom} />
	</LoadScript>
)

Home.getInitialProps = () => ({
	namespacesRequired: ["map", "mapConfigurationInput"]
})

export default Home
