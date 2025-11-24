Task
====

An overview of tasks, jobs, bugs etc.


Todo
----

Job reminders to wrap into other tasks.


### Needs fixing - bugs, quirks etc
* [October bug](<october bug.md>) eg: index.html?test=true&theme=vintage&date=2006-10-13



### General improvements
* [adjust labels for short weeks](<adjust labels for short weeks.md>)
* Have display changes update the URL so that reloads use current settings
* Add proper light/dark UI schemes; categorise theme styles into light/dark
* Option to have month-day rings always show 31 days, but have placeholders for non-functional days. Should reduce visual jarring when crossing months.
* Start looking into tools like linters
* Add license
* Find out if form `select` size can be controlled with css
* Investigate replacing/augmenting label rotation transforms with pure css - eg left and right can probably be applied just with css after the radial transform; also `writing-mode: vertical-lr;`
* Add another test mode to check for exceptions - something that would have caught the season-circle bug
* Get the wireframe background to switch on the grid properly - prob need to draw separately
* Improve the naming conventions for sector and general clock labels - it's a bit confusing right now
* Look into utilising some webservices for tasks like l10n
* Build a 180 degree year clock to force the point about split-season display -> 'fire danger' theme
* Revisit vintage theme lens and hand length
* Remove radians calcs from other date arrays in `date.js` (had already done some)
* Add option to hide the form
* Fonts - find some web-safe ones or figure out serving
* Rename hands to pointers
* Look into stroke gradients
* Make pointer-sector position configurable (start/middle/fractional)
* Look into: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#using_d_as_a_css_property


### In progress

* Removal of old theme-loading callback
* Moving to js modules and http-only
* Improve test page parameterisation
* Combining sector and label methods into unified 'ring' method
* Finish cleaning up new hands & promote to ThemeBase
* 'True' sectors using the origin (non-annular sectors) currently have an extra zero-arc -> one side removed, do other


### Done

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
