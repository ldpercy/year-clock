Car dashboard theme
===================

This is mostly just a lark/proof-of-concept.
I don't really think it's likely to look *good*, but it might be fun, and would be a good testcase for something I've been wondering about - different angular contexts.

In nearly all cases so far the various time periods have been represented by whole circles (360 degrees, 2pi radians) in keeping with the clock idea.
But in some cases it might be nice to be able to represent full-range by less than a whole a circle to get more of a dial effect.
Some fancy watches occasionally use sub-dials like this, but a more classic example is an old-school car dashboard.
The tacho, speedo, fuel gauge are all represented by cicle segments - 2/3 or 3/4 or a quarter circle or whatever.

Put together a car dashboard theme to try this out.
Could have the month as the tacho, year as the speedo, and odometer as the date/year of day. Maybe a fuel gauge for seasons.



Start hacking
-------------

Starting from the wall-clock.

index.html?theme=car-dashboard&date=1988-03-14&test=true


Don't think I have the circle centres right.
Some gridlines would help.

