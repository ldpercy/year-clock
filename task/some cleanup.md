Some Cleanup
============

The last task was dont kind of quickly, and wrapped it before cleaning up properly.

So things have gotten a little messy and I'd like to do a few smaller jobs before moving on.

* There's an annoying inheritance quirk in the base theme styles that I'd like to get rid of
* Want to rationalise some of the code duplication in a few places: day arrays, day ticks, hands
* Want to parameterise more of the draw functions, remove global scope
* Remove the drawMonthLabels override in the wall-clock theme

Probably a few other things, will update as I go.


Hands
-----

The hand functions are nearly the same, so they need to be sorted out.
So unify right?
Not too bad, but the obvious thing to do is to separate the drawing from the angle calculation.
Which means moving the calculations out to somwhere else.
Don't want to clutter up the main drawClock fn (yet) so will add another layer.

### Which hands to draw?

I've sort of got something starting to look better, but need a way to specify which hands to draw.

Off the top of my head I can think of a handful of ways, not sure which is best.
Ah actually this could get way too deep and theoretical, and I'd prefer a quick solution this time around.

I've also moved the drop shadows to the group rather than individual hands which I think looks better.



Day arrays
----------

getYearDayArray and getMonthDayArray

These are nearly the same, but have a slightly different setup and loop structure.
They *should* be able to be made into one function.

The main deal is that given a year or month give me back an array of info those dates.
Could it be generalised to any date range, like a quarter for instance?

Okay after beating my head against it for a while I *think* I've got it.
There are a bunch of gotchas and annoying quirks in js date handling.
Also have sorted out the UTC problem I was having, have moved to a lightweight dedicated ff profile.



Day ticks
---------

Next drawYearDayTicks and drawMonthDayTicks.

I really should have cleaned all this up in the previous task...

First iteration done.

Also rationalised the tick drawing code itself a bit.

There's so much more that could be done to make the ticks or day markers better though, both in code and presentation.



