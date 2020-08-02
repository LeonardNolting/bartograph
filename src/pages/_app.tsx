import '../styles.css'
import {CssBaseline} from "@material-ui/core"
import App, {AppProps} from 'next/app'
import React from "react";
import Head from "next/head";
import {appWithTranslation} from "../../i18n"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from '../theme';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {i18n} from "../../i18n"
import dateFnsLanguages from "../services/languages/dateFns";

const MyApp = ({Component, pageProps}: AppProps) => <>
	<Head>
		<title>Bartograph</title>
		<meta charSet="UTF-8" />
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	</Head>
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateFnsLanguages[i18n.language]}>
			<Component {...pageProps} />
		</MuiPickersUtilsProvider>
	</ThemeProvider>
</>

MyApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext)
	return {...appProps}
}

export default appWithTranslation(MyApp)