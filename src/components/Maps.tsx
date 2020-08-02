import React, {Children, cloneElement, Component, isValidElement} from "react";
import config from "../config";
import {LinearProgress} from "@material-ui/core";

interface ExtendedWindow extends Window {
	utils?
}

export default class Maps extends Component<{}, {
	loading: boolean,
	updating: boolean,
}> {
	state = {
		loading: true,
		updating: true
	}

	googleMapsUrl = (() => {
		const base = "https://maps.googleapis.com/maps/api/js",
			url = new URL(base),
			params = {
				key: process.env.GOOGLE_API_KEY,
				v: config.map.version,
				libraries: config.map.libraries.join(","),
				callback: "utils.google.maps.init"
			}
		url.search = new URLSearchParams(params).toString()
		return url.toString()
	})()

	placeholder = <>
		<div className="placeholder" />
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
		`}</style>
	</>

	setUpdating = updating => this.setState({updating})
	setLoading = loading => this.setState({loading})

	componentDidMount() {
		if ("utils" in window) return this.setLoading(false)
		const extendedWindow: ExtendedWindow = window
		extendedWindow.utils = {
			google: {
				maps: {
					isInit: false,
					init: async () => {
						await new Promise(resolve => setTimeout(resolve, 4000))
						extendedWindow.utils.google.maps.isInit = true
						this.setLoading(false)
					}
				}
			}
		}

		const script = document.createElement("script")
		script.src = this.googleMapsUrl
		script.async = true
		script.type = "text/javascript"
		document.head.appendChild(script)
	}

	render = () => {
		const children = Children.map(this.props.children, child => isValidElement(child) ? cloneElement(child, {setUpdating: this.setUpdating}) : child);
		return <>
			{(this.state.loading || this.state.updating) &&
			<LinearProgress style={{position: "absolute", width: "100%", zIndex: 1}} />}
			<div className="placeholder" hidden={!this.state.loading} />

			{!this.state.loading &&
			children}

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
    		`}</style>
		</>
	}
}