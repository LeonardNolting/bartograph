const {nextI18NextRewrites} = require('next-i18next/rewrites')

module.exports = {
	rewrites:            async () => nextI18NextRewrites({}),
	publicRuntimeConfig: {
	},
	env:                 {
		GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
		availableLanguages: Object.entries({
			en: "English",
			de: "Deutsch",
		}).map(entry => ({
			code: entry[0],
			label: entry[1]
		})),
	},
}