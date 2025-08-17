Todo
====

Small job reminders to wrap into other tasks.

Todo
----

* Possibly combine sector and label methods into uniified 'ring' (or similar) method
* Changeover `getPeriodDaySectors` usages to `getSectors`
* Keyboard events/drawing - see if a debounce of some sort is needed for Chromium's benefit
* Add another test mode to check for exceptions - something that would have caught the season-circle bug
* Get the wireframe background to switch on the grid properly - prob need to draw separately
* Improve the naming conventions for sector and general clock labels - it's a bit confusing right now
* Look into utilising some webservices for tasks like l10n
* Consider reorgansing the global scripts (maths, date etc) into service objects with some autowiring
* Build a 180 degree year clock to force the point about split-season display
* Revisit vintage theme lens and hand length
* Remove radians calcs from other date arrays in `date.js` (had already done some)
* Do something with the footer
* Add option to hide the form
* Fonts - find some web-safe ones or figure out serving
* Rename hands to pointers
* Improve test page parameterisation
* Look into stroke gradients
* Make pointer-sector position configurable (start/middle/fractional)
* Look into: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#using_d_as_a_css_property


In progress
-----------
* Old plain-svg theme is now 'wheel' theme
* Finish cleaning up new hands & promote to ThemeBase
* 'True' sectors using the origin (non-annular sectors) currently have an extra zero-arc -> one side removed, do other

Done
----
* Have working examples of text knock-out now
* See if date presets (Pi Day etc) can be added as datalist suggestions -> work in Chromium, do nothing in FF, probably leave
* See if favicons can be controlled by css at all -> appears not
* Add extra label to wall-clock -> done
* Also figure out reliable way to use emojis -> settled for now
