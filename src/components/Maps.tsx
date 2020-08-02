import React, {Children, cloneElement, Component, isValidElement} from "react";
import config from "../config";
import {LinearProgress} from "@material-ui/core";

interface ExtendedWindow extends Window {
	utils?: {
		google: {
			maps
		}
	}
}

let stopping = false

interface Props {
	language: string,
	id: string,
}

interface State {
	loading: boolean,
	updating: boolean,
}

export default class Maps extends Component<Props, State> {
	state = {
		loading: true,
		updating: true
	}

	getUrl = (() => {
		const base = "https://maps.googleapis.com/maps/api/js",
			url = new URL(base),
			params = {
				key: process.env.GOOGLE_API_KEY,
				v: config.map.version,
				libraries: config.map.libraries.join(","),
				language: this.props.language,
				callback: "utils.google.maps.init"
			}
		url.search = new URLSearchParams(params).toString()
		return url.toString()
	})

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

	setUpdating = (updating: boolean, callback = () => {
	}) => this.setState({updating}, callback)
	setLoading = (loading: boolean, callback = () => {
	}) => this.setState({loading}, callback)

	stop = () => {
		stopping = true
		const script = document.getElementById(this.props.id)

		if (script && script.parentNode) script.parentNode.removeChild(script)

		Array.prototype.slice
			.call(document.getElementsByTagName('script'))
			.filter((script: HTMLScriptElement) => typeof script.src === 'string' && script.src.includes('maps.googleapis'))
			.forEach((script: HTMLScriptElement) => {
				if (script.parentNode) script.parentNode.removeChild(script)
			})

		Array.prototype.slice
			.call(document.getElementsByTagName('link'))
			.filter((link: HTMLLinkElement) => link.href === 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans')
			.forEach((link: HTMLLinkElement) => {
				if (link.parentNode) link.parentNode.removeChild(link)
			})

		Array.prototype.slice
			.call(document.getElementsByTagName('style'))
			.filter((style: HTMLStyleElement) => (
				style.innerText !== undefined &&
				style.innerText.length > 0 &&
				style.innerText.includes('.gm-')
			))
			.forEach((style: HTMLStyleElement) => {
				if (style.parentNode) style.parentNode.removeChild(style)
			})

		stopping = false
	}

	start = async () => {
		// from https://www.npmjs.com/package/@react-google-maps/api
		await new Promise(resolve => {
			if (!stopping) resolve()
			else if (typeof document !== "undefined") {
				const timer = setInterval(() => {
					if (!stopping) {
						clearInterval(timer)
						resolve()
					}
				}, 1)
			} return
		})

		const extendedWindow: ExtendedWindow = window
		extendedWindow.utils = {
			google: {
				maps: {
					isInit: false,
					init: async () => {
						await new Promise(resolve => setTimeout(resolve, 1000))
						extendedWindow.utils.google.maps.isInit = true
						this.setLoading(false)
					}
				}
			}
		}

		const script = document.createElement("script")
		script.id = this.props.id
		script.src = this.getUrl()
		script.async = true
		script.type = "text/javascript"
		document.head.appendChild(script)
	}

	componentDidMount() {
		if (window.google && window.google.maps && !stopping) return this.setLoading(false)
		this.start()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.language !== this.props.language && typeof document !== 'undefined')
			this.setLoading(true, () => {
				this.stop()
				delete window.google.maps
				delete (window as ExtendedWindow).utils.google.maps
				this.start()
			})
	}

	componentWillUnmount() {
		if (typeof document !== 'undefined') this.stop()
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