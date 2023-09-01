import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@components': './src/components',
			'@locale': './locale',
			'@routes': './src/routes'
		},
		adapter: adapter({ fallback: 'app.html' })
	}
};

export default config;
