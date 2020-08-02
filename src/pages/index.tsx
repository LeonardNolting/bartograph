import Map from "../components/Map";
import React, {Component} from "react";
import Maps from "../components/Maps";

class MapPage extends Component<{}, {
	loading: boolean
}> {
	static getInitialProps = () => ({
		namespacesRequired: ["map", "mapConfigurationInput"]
	})
	render = () => <>

		<Maps>
			<Map />
		</Maps>
	</>
}

export default MapPage
