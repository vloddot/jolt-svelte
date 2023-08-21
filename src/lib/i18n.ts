import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('en_US', () => import('@locale/en_US.json'));
register('it', () => import('@locale/it.json'));
register('ar', () => import('@locale/ar.json'));

init({
	fallbackLocale: 'en_US',
	initialLocale: getLocaleFromNavigator()
});
