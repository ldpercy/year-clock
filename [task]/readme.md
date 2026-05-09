Task
====

An overview of tasks, jobs, bugs etc.


Top of the stack
----------------

* Proper scheme switching
* URL following the display
* Light/dark theming
* Solar theme



Todo
----
Job reminders to wrap into other tasks.


### Needs fixing - bugs, quirks etc
* [adjust labels for short weeks](<adjust labels for short weeks.md>)


### General improvements

* `app`		Have display changes update the URL so that reloads use current settings
* `ui`	Add option to hide the form
* `ui`	Add proper light/dark UI schemes; categorise theme styles into light/dark
* `date` Remove radians calcs from other date arrays in `date.js` (had already done some)
* `geometry`	See if some of the geometry calcs can be converted over to use PlanarSpace - will need svg coords first though
* `themebase`		Option to have month-day rings always show 31 days, but with placeholders for non-functional days. Should reduce visual jarring when crossing months.
* `themebase`	Option to have labels combined with their respective sectors instead of as a separate group
* `themebase`	Make pointer-sector position configurable (start/middle/fractional)
* `testing`		Convert testing over to use `html-common`'s testing lib
* `testing`		Add another test mode to check for exceptions - something that would have caught the season-circle bug
* `testing`		Get the wireframe background to switch on the grid properly - prob need to draw separately
* `naming`	Improve the naming conventions for sector and general clock labels - it's a bit confusing right now
* `naming`	Rename hands to pointers
* `theme/solar`	Git rid of the old solar branch for now; just feature flag it
* `theme/vintage`	Revisit vintage theme lens and hand length
* `theme/firedanger`	Build a 180 degree year clock to force the point about split-season display -> 'fire danger' theme
* `l10n`	Look into utilising some webservices for tasks like l10n
* `font`	Fonts - find some web-safe ones or figure out serving
* `css`		Find out if form `select` size can be controlled with css
* `css`		Investigate replacing/augmenting label rotation transforms with pure css - eg left and right can probably be applied just with css after the radial transform; also `writing-mode: vertical-lr;`
* `svg`		Look into stroke gradients
* `svg/css` Look into: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#using_d_as_a_css_property
* `license`		Add license
* `development`		Start looking into tools like linters



### In progress

* Improve test page parameterisation
* Combining sector and label methods into unified 'ring' method
* Finish cleaning up new hands & promote to ThemeBase
* 'True' sectors using the origin (non-annular sectors) currently have an extra zero-arc -> one side removed, do other


### Done

* Using html-common styles
* Fixed keyboard controls
* Split up the monolithic yearClockApp (controller, views etc)
* Reorganised directories and imports
* Keyboard controls sorted out for now
* Initial changeover to `html-common`
* Fixed october bug
* Removal of old theme-loading callback
* Moving to js modules and http-only
* Reorgansing the global scripts (maths, date etc) into classes
* Chromium's animation glitchiness remedied for now afaict
* Old footer removed, added small note to the form
* Old plain-svg theme is now 'wheel' theme
* `getPeriodDaySectors` removed, now all sectors drawn with `getSectors`
* Have working examples of text knock-out now
* See if date presets (Pi Day etc) can be added as datalist suggestions -> work in Chromium, do nothing in FF, probably leave
* See if favicons can be controlled by css at all -> appears not
* Add extra label to wall-clock -> done
* Also figure out reliable way to use emojis -> settled for now


Themes
------

In progress:
* Solar theme
* Space/alien theme

Future:
* Retro 60s clock
* Fire danger theme - https://afdrs.com.au/
* Roman theme
