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


JavaScript Classes
------------------

Themes are written as JavaScript classes.


Example `yearclock/theme/example-theme/theme.class.js`:

```js
themeClass['example-theme'] = class extends ThemeBase {

	getClockSVG = function() {

		return `<svg> <text>example theme</text> </svg>`;
	}

}
```

Note
* Theme directory and class names must match
* Theme classes are defined into the `themeClass` namespace
* Themes conventionally extend `ThemeBase` to gain access to the standard drawing functions
* Theme names are lowercased and can have punctuation to match their directory names (in contrast to usual OO practise of CamelCase for class names)


