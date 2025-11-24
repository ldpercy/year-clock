Theming
=======

Themes are stored in directories containing code and styles.


For `example-theme` this will be:

```
yearclock/
	theme/
		example-theme/
			theme.class.js
			theme.css
```

The directory name forms the 'canonical' name, which is used in requests/loading etc.


JavaScript Classes
------------------

Themes are written as JavaScript classes.


Example `yearclock/theme/example-theme/theme.class.js`:

```js
	import * as themebase from '../ThemeBase.js';


	class ExampleTheme extends themebase.ThemeBase {

		getClockSVG = function() {
			return `<svg> <text>example theme</text> </svg>`;
		}

	}/* ExampleTheme */


	export { ExampleTheme as Theme }
```

Note:
* Themes conventionally extend `ThemeBase` to gain access to the standard drawing functions (though this may change soon)
* Theme classes are exported as `Theme` for dynamic instantiation by the app.


