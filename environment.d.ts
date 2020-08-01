declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GOOGLE_API_KEY: string;
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			PWD: string;
			availableLanguages: Array<{code: string, label: string}>;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}