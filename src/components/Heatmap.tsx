import {Component} from "react";

interface Props {
	setUpdating: (updating: boolean) => void,
	map: google.maps.Map,
	data,
	options
}

interface State {
	heatmap: google.maps.visualization.HeatmapLayer | null,
}

export default class Heatmap extends Component<Props, State> {
	state = {
		heatmap: null
	}
	componentDidMount() {
		this.props.setUpdating(true)
		const heatmap = new google.maps.visualization.HeatmapLayer({
			...(this.props.options || {}),
			data: this.props.data,
			map: this.props.map,
		})
		this.setState({heatmap}, () => this.props.setUpdating(false))
	}
	componentDidUpdate(prevProps: Readonly<Props>) {
		this.state.heatmap.setData(this.props.data)
		this.state.heatmap.setOptions(this.props.options)
	}

	render = () => null
}