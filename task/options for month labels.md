Options for month labels
========================

Carried over from [15 - some cleanup](<[done]/15 - some cleanup.md>).

> remove the drawMonthLabels override in the wall-clock theme


I'll need to add an option or two to drawMonthLabels, and a format function.



Options
-------

* Position of label along sector - eg start/middle/end - could be a flag/enum or a real
* Whether to invert the bottom half of the labels
* Whether to rotate the labels

Looks like I've already added some options, but the invert one isn't properly functional yet.


Merge
-----
I've managed to merge the changes from wall-clock into the main drawMonthLabels function, so that the overridden function is no longer needed for wall-clock.

I'm haven't managed to prise the 'invert' option apart from the rotate one yet, but it's probably only really useful in that context anyway.
I'll leave that one for now, maybe revisit later.

Wrapup
------

Will close this here, the job of removing the main override is done.

* Added overridable month name formatter
* Label rotation now specified with a config flag
* Renamed a lot of angle vars to specify radians or degrees
* Added sector width for position calcs
* Month label position can now be specified as a proportion of sector width, eg 0 for the start of the sector (wall-clock), 0.5 for the original layouts


