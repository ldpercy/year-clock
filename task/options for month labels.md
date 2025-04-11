Options for month labels
========================

Carried over from [15 - some cleanup](<[done]/15 - some cleanup.md>).

> remove the drawMonthLabels override in the wall-clock theme


I'll need to add an option or two to drawMonthLabels, and a format function.



Options
-------

* Position of label along sector - eg start/middle/end - could be a flag/enum or a real
* Whether to invert the bottom half of the lablels
* Whether to rotate the labels

Looks like I've already added some options, nut the invert one isn't oroperly funtional yet.