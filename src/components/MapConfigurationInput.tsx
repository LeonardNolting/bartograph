import React, {Component} from "react";
import config from "../config";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	InputAdornment,
	TextField
} from "@material-ui/core";
import {DatePicker, TimePicker} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MapConfiguration from "../model/MapConfiguration";
import {WithTranslation} from "next-i18next";
import {i18n, withTranslation} from "../../i18n"
import isEqual from "lodash/isEqual"

interface Props extends WithTranslation {
	update,
	open: boolean,
	configuration: MapConfiguration,
}

interface State {
	configuration: MapConfiguration
}

export default withTranslation("mapConfigurationInput")(
	class MapConfigurationInput extends Component<Props, State> {
		state = {configuration: this.props.configuration}

		handleClose = (save: boolean) => {
			if (!save) this.setState({configuration: this.props.configuration})
			this.props.update(this.state.configuration, save)
		}

		render = () => {
			/*console.log("language: ", this.props.i18n.language)
			console.log("availableLanguages: ", process.env.availableLanguages)
			console.log(process.env.availableLanguages.find(language => {
				console.log("default value found?", language.code, this.props.i18n.language)
				return language.code === this.props.i18n.language
			}))*/
			return !this.props.open ? null :
				<Dialog
					open={this.props.open}
					onClose={() => this.handleClose(false)}>
					<DialogTitle>{this.props.t("header")}</DialogTitle>
					<DialogContent>
						<DialogContentText>{this.props.t("description")}</DialogContentText>
						<Grid container spacing={3} direction="column">
							<Grid item>
								<Autocomplete
									// @ts-ignore
									options={process.env.availableLanguages}
									getOptionLabel={language => language.label}
									fullWidth
									autoHighlight
									disableClearable
									autoComplete
									// @ts-ignore
									value={process.env.availableLanguages.find(language => language.code === this.props.i18n.language)}
									onChange={(event, newValue: {code: string, label: string}) => i18n.changeLanguage(newValue.code)}
									getOptionSelected={(option, value) => isEqual(option, value)}
									renderInput={params =>
										<TextField
											{...params}
											label={this.props.t("language")}
										/>
									}
								/>
							</Grid>
							<Grid item>
								<TextField
									label={this.props.t("altitude")}
									type="number"
									onChange={e => this.setState({
										configuration: {
											...this.state.configuration,
											altitude: parseInt(e.target.value)
										}
									})}
									InputProps={{
										endAdornment: <InputAdornment position="end">m</InputAdornment>,
									}}
									value={this.state.configuration.altitude || ""}
									inputProps={config.inputs.altitude} fullWidth />
							</Grid>
							<Grid item>
								<TextField
									label={this.props.t("wind-speed")}
									type="number"
									onChange={e => this.setState({
										configuration: {
											...this.state.configuration,
											windSpeed: parseInt(e.target.value)
										}
									})}
									InputProps={{
										endAdornment: <InputAdornment position="end">km/h</InputAdornment>,
									}}
									value={this.state.configuration.windSpeed || ""}
									inputProps={config.inputs.windSpeed} fullWidth />
							</Grid>
							<Grid item>
								<TextField
									label={this.props.t("wind-direction")}
									type="number"
									onChange={e => this.setState({
										configuration: {
											...this.state.configuration,
											windDirection: parseInt(e.target.value)
										}
									})}
									InputProps={{
										endAdornment: <InputAdornment position="end">°</InputAdornment>,
									}}
									value={this.state.configuration.windDirection || ""}
									inputProps={config.inputs.windDirection} fullWidth />
							</Grid>
							<Grid item>
								<TimePicker
									label={this.props.t("time")}
									onChange={time => this.setState({
										configuration: {
											...this.state.configuration,
											time
										}
									})}
									views={["hours"]}
									format="HH"
									ampm={false}
									showTodayButton
									todayLabel={this.props.t("now")}
									value={this.state.configuration.time || new Date()}
									inputProps={config.inputs.time} fullWidth />
							</Grid>
							<Grid item>
								<DatePicker
									disableToolbar
									format="MMMM"
									autoOk
									views={["month"]}
									label={this.props.t("month")}
									onChange={month => this.setState({
										configuration: {
											...this.state.configuration,
											month
										}
									})}
									variant="inline"
									value={this.state.configuration.month || new Date()}
									inputProps={config.inputs.time} fullWidth />
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.handleClose(false)}
						        color="primary">{this.props.t("cancel")}</Button>
						<Button onClick={() => this.handleClose(true)}
						        color="primary"
						        autoFocus
						        variant="contained">{this.props.t("save")}</Button>
					</DialogActions>
				</Dialog>;
		}
	})