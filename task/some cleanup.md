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
