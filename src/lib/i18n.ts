import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';

import en_US from '@locale/en_US.json';
import it from '@locale/it.json';
import ar from '@locale/ar.json';

addMessages('en_US', en_US);
addMessages('it', it);
addMessages('ar', ar);

init({
	fallbackLocale: 'en_US',
	initialLocale: getLocaleFromNavigator()
});
