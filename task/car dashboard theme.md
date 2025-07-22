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



Transforms
----------

Turns out quite a lot can be done with just simple transforms.
CSS transforms are even working for me in both FF and Chromium, which is quite neat.
However they're having the unintended consequence of overwriting the rotation transforms on the hands, so I'll have to split those apart.

The hand code is getting a bit tortured...
I'd made some changes for the vintage theme to allow for specifying which drawing function to use.
Now I need to break the code apart again.

Sort of going.


Month Markers
-------------

I've split up the two dials, they're still full-circle though.
Was about to put some matching ticks in for the year hand when I realised I don't have a method for that.
The *only* tick method I have is the old `getPeriodDayTicks`.

So I need something newish.
I'd like to take the opportunity to think about ways to improve and abstract the old tick code while I'm at it.

For a while I've wanted to rename 'ticks' to something more general like 'markers'.
That could cover over a few other variants I've thought about at various times:
* circles / dots
* triangles or wedge shapes
* simplified (non-arc) or proper sectors as markers
* start or mid markers
* diamond shapes
* Characters/emojis as markers

Gonna come back to this - wanna tackle angles first.


Angular Context
---------------

