import '../styles.css'
import {AppProps} from 'next/app'
import React from "react";
// import Layout from "../components/Layout";

// const MyApp = ({Component, pageProps}: AppProps) => <Layout><Component {...pageProps} /></Layout>;
const MyApp = ({Component, pageProps}: AppProps) => <Component {...pageProps} />;

export default MyApp;