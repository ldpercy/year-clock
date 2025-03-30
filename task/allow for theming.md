Allow For Theming
=================

With luck swapping a single directory path will load a different skin for the clock.

Nice to have:
* Provide sensible defaults that can be used as fallbacks
* Allow for custom scripting for extra features
* Custom graphic resources

Not sure if the custom skins should implement the entire drawClock function, or just parts of it.


Thoughts on implementation
--------------------------

Not sure if the custom skins should implement the entire drawClock function, or just parts of it.
It doesn't matter too much, but having fallbacks would probably require the latter.

For instance you could template it out something like:

* clock body/face/background - draw statically
* clock months/seasons/other markers (such as date/year) - draw dynamically
* hands/other pointers - draw dynamically

If the main draw fn finds an implementation in the skin it uses it, otherwise it uses a default.
Also think I might use the term 'theme' instead.


Theming Ideas
-------------

The dark theme relies on having the original as a base and only overrides a handful of colours.

In general this probably isn't a bad way to go about things - a theme could declare a base then add some overrides.

The theme base could be itself for something entirely new, or another theme that you just want to apply tweaks to.

You could even add subthemes - for example original-dark could be a subtheme of original instead of a whole new theme.

This also deals with the default theme problem - like this there isn't a special theme named 'default', there's just whatever you choose to use as your base, and your own overrides.


Wrapup
------

The base-theme task took care of most of the above so will close this off, and do further work in dedicated tasks.


