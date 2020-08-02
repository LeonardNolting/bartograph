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