import Map from "../components/Map";
import React, {Component} from "react";
import Maps from "../components/Maps";
import {i18n} from "../../i18n"
import googleMapsLanguages from "../services/languages/googleMaps";

class MapPage extends Component<{}, {
	loading: boolean
}> {
	static getInitialProps = () => ({
		namespacesRequired: ["map", "mapConfigurationInput"]
	})
	render = () => (
		<Maps id="google-maps" language={googleMapsLanguages[i18n.language]}>
			<Map />
		</Maps>
	)
}

export default MapPage
