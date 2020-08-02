import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
import muiLanguages from "./services/languages/mui";
import {i18n} from "../i18n"

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#fff',
		},
	},
}, muiLanguages[i18n.language]);

export default theme;