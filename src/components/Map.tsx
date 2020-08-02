import React, {Component} from "react";
import Fix, {fixes} from "../model/Fix";
import config from "../config";
import {Fab, Theme} from "@material-ui/core";
import MapConfigurationInput from "./MapConfigurationInput";
import {positions} from "../model/Position";
import MapConfiguration from "../model/MapConfiguration";
import isEqual from "lodash/isEqual"
import TuneIcon from '@material-ui/icons/Tune';
import {createStyles, WithStyles, withStyles} from "@material-ui/styles";
import {WithTranslation} from "next-i18next";
import {withTranslation} from "../../i18n";
import Heatmap from "./Heatmap";

const styles = (theme: Theme) => createStyles({
	fab: {
		bottom: "24px",
		right: "10px",
		position: "absolute"
	},
	fabIcon: {
		marginRight: theme.spacing(1)
	},
	map: {height: "100%"},
});

interface Props extends WithStyles<typeof styles>, WithTranslation {
	/*center: {
		lat: number,
		lng: number,
	},
	zoom: number,*/
	setUpdating?: (updating: boolean) => void
}

interface State {
	map: google.maps.Map | null,
	fixes: Array<Fix>,
	configuring: boolean,

	configuration: MapConfiguration
}

export default withStyles(styles, {withTheme: true})(
	withTranslation("map")(
		class Map extends Component<Props, State> {
			state = {
				map: null,
				heatmap: null,
				fixes: [],
				configuring: false,

				configuration: {
					altitude: null,
					windSpeed: null,
					windDirection: null,
					time: null,
					month: null
				}
			}

			async componentDidMount() {
				await new Promise(resolve => this.setState({map: this.getMap()}, resolve))
				await this.update(this.state.configuration, true, true)
				this.props.setUpdating(false)
			}

			loadFixes = async (configuration: MapConfiguration) => {
				this.props.setUpdating(true)
				await new Promise(async resolve => this.setState({
					configuration,
					fixes: await fixes(configuration),
				}, resolve))
				this.props.setUpdating(false)
			}
			update = async (configuration: MapConfiguration, save: boolean, forceSave: boolean) => {
				this.setState({configuring: false})
				if (forceSave || (save && !isEqual(configuration, this.state.configuration))) await this.loadFixes(configuration)
			}

			div: HTMLDivElement | null = null
			getDiv = (ref: HTMLDivElement | null) => this.div = ref
			getMap = (): google.maps.Map | null => this.div === null ? null : new google.maps.Map(this.div, config.map.options)

			render = () => <>
				<MapConfigurationInput
					update={this.update}
					configuration={this.state.configuration}
					open={this.state.configuring} />
				{/*<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={this.props.center}
				zoom={this.props.zoom}
				options={mapOptions}>
				<HeatmapLayer
					data={positions(...this.state.fixes)}
					options={config.map.heatmap.options} />
			</GoogleMap>*/}

				<div ref={this.getDiv} className={this.props.classes.map}>
					{this.state.map &&
					<Heatmap
						setUpdating={this.props.setUpdating}
						map={this.state.map}
						data={positions(...this.state.fixes)}
						options={config.map.heatmap.options} />}
				</div>

				<Fab
					variant="extended"
					color="primary"
					aria-label="edit"
					className={this.props.classes.fab}
					onClick={() => this.setState({configuring: true})}>
					<TuneIcon className={this.props.classes.fabIcon} />
					{this.props.t("fab")}
				</Fab>
			</>
		}))