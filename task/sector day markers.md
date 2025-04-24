Sector days markers
===================

I've inherited the use of radial lines for days markers, or more precisely day *separation* markers.

I'd like to try a different style of day marker that uses a small sector instead.
It'll be extra to calculate and render, but I'd like to see what it looks like, especially with a bit of nice CSS.

If it turns out okay it will be a good chance to try some [design improvements](<design improvements.md>).


sector day
----------
First try at a new theme using sectors for daya, similar layout to the wall clock.

I don't really love it in it's first incarnation, but i'll try a few things to spruce it up.

Being able to put in additional day markers of some sort - numbers, initial letter - would help I think.

I had another layout idea while doing it, but it requires some other changes which resulted in [task: dimension updates](<[done]/17 - dimension updates.md>).


Season out
----------
I can't think of a better name right now.

The idea for this one is to have three equally spaced rings on the clock face

* innermost - seasons
* middle - month
* outer - days

This is why needed the dimensions updates - I wanted to be able to divide the radius cleanly in 3 (400,800,1200) without needing to tweak it for external constraints.

I've run a little way with this, it's looking pretty interesting, and I've added some nifty day hovers.

But a bug has shown up - days are out by one.
