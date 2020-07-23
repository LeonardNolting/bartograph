import Map from "../components/Map";
import React from "react";
import Head from "next/head";
import {config} from "../config";

const Home = () => <>
	<Head>
		{/*<script async
		        defer
		        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCdSMsdxyhSxfQbj0Tw-cDc8y1OmWHKi4&callback=initMap&v=3.exp&libraries=visualization" />*/}
		<title>Bartograph Map</title>
	</Head>
	<Map center={config.map.center}
	     zoom={config.map.zoom} />
</>

export default Home
