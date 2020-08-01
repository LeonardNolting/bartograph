import React, {Component} from "react";
import Fix, {fixes} from "../model/Fix";
import {GoogleMap, HeatmapLayer} from "@react-google-maps/api";
import config from "../config";
import {Fab, LinearProgress, Theme} from "@material-ui/core";
import MapConfigurationInput from "./MapConfigurationInput";
import {positions} from "../model/Position";
import Configuration from "../model/Configuration";
import isEqual from "lodash/isEqual"
import TuneIcon from '@material-ui/icons/Tune';
import {createStyles, WithStyles, withStyles} from "@material-ui/styles";
import {WithTranslation} from "next-i18next";
import {withTranslation} from "../../i18n";

const styles = (theme: Theme) => createStyles({
	fab: {
		bottom: "24px",
		right: "10px",
		position: "absolute"
	},
	fabIcon: {
		marginRight: theme.spacing(1)
	}
});

interface Props extends WithStyles<typeof styles>, WithTranslation {
	center: {
		lat: number,
		lng: number,
	},
	zoom: number,
}

interface State {
	fixes: Array<Fix>,
	configuring: boolean,
	loading: boolean,
	updating: boolean

	configuration: Configuration
}

export default withStyles(styles, {withTheme: true})(
	withTranslation("map")(
	class Map extends Component<Props, State> {
		state = {
			fixes: [],
			configuring: false,
			loading: true,
			updating: false,

			configuration: {
				altitude: null,
				windSpeed: null,
				windDirection: null,
				time: null
			}
		}

		async componentDidMount() {
			await this.update(this.state.configuration, true, true)
			this.setState({loading: false})
		}

		// onLoad = map => console.log("MAP LOADED")

		loadFixes = async (configuration: Configuration) => {
			this.setState({updating: true})
			this.setState({
				configuration,
				fixes: await fixes(configuration),
				updating: false
			})
		}
		update = async (configuration: Configuration, save: boolean, forceSave: boolean) => {
			this.setState({configuring: false})
			if (forceSave || (save && !isEqual(configuration, this.state.configuration))) await this.loadFixes(configuration)
		}

		render() {
			const mapContainerStyle = {height: "100%"};
			return <>
				<style jsx>{`
				.placeholder {
					background-image: url("static/google-maps-placeholder.jpg");
					background-size: cover;
					background-position: center;
					filter: grayscale(50%);
					height: 100%;
					width: 100%;
					z-index: 1
				}
				.map {
					z-index: 2
				}
            `}</style>
				{(this.state.loading || this.state.updating) &&
				<LinearProgress style={{position: "absolute", width: "100%", zIndex: 1}} />}
				{this.state.loading && <div className="placeholder" />}
				<MapConfigurationInput
					update={this.update}
					configuration={this.state.configuration}
					open={this.state.configuring} />
				{!this.state.loading &&
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					center={this.props.center}
					zoom={this.props.zoom}
					options={config.map.options}
					/*onLoad={this.onLoad}*/>
					<HeatmapLayer
						data={positions(...this.state.fixes)}
						options={config.map.heatmap.options} />
				</GoogleMap>}

				<Fab
					variant="extended"
					color="primary"
					aria-label="edit"
					className={this.props.classes.fab}
					disabled={this.state.loading}
					onClick={() => this.setState({configuring: true})}>
					<TuneIcon className={this.props.classes.fabIcon} />
					{this.props.t("fab")}
				</Fab>
			</>
		}
	}))