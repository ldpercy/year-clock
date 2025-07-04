Vintage clock
=============

I've been messing about with different fonts and colours on the wall clock to try to get a more old-timey look.
Only so much I can do with styles, will begin a new theme.

This one could use some more fancy SVG features like gradients to try simulating things wood grain, embossing, aging etc.
Could finally add some different hand shapes as well.

I'll reuse the old sector-day theme that's been sitting neglected.

Wallpaper and body
------------------
Have these added using some basic gradients - looks okay in a cartoony sort of way.

Will start working on the actual clock face next.


Plain-svg & Hands
-----------------
Also have tweaked the old plain-svg theme for fun to produce a translucent glassy sort of effect that looks nice with darker backgrounds.
The stroke-width for the hand needs to be sorted out though.
I've used it to fatten the hand in some cases, but that messes up setting an actual outline, which I want in this case.
I want to create some new hands for the vintage clock so will try to sort them out together.


Day label bug
-------------

Working on the clock face now, it's a bit of a mishmash of ideas so far.

Trying to draw labels for the month-day sectors and something weird is turning up - I think there's a small bug in `getPeriodDayArray`.

It uses `dateRangeRadians` to generate sector angles, but that particular function assumes that the date range takes place within the context of years.
I did generalise it a while back though so that it should work across year boundaries (fingers crossed).

For getPeriodDayArray the angular context isn't necessarily obvious - probably it's usually going to be that the date range represents one revolution, but that isn't a given.
You could be doing a dial/meter type readout where the full range is represented by a third of a circle.

Probably the angle calculations should actually be separated from the array creation as they're separate concerns.

Removing the current radians calc from getPeriodDayArray breaks lightning, debug and vintage.

In each case it's getSectorLabels that breaks because it relies on the stock yearDayArray created in createDisplayDate:

	result.yearDayArray = getPeriodDayArray(startOfYear(date), nextYear(date), date);

So what to do here?
Not every clock needs a yearDayArray, though nearly all do.
They should possibly be removed from createDisplayDate and only implemented when needed.
The season array should also be moved out. The month array is the only reasonably common one for now.
Also, not every clock breaks when I remove the sector angles, so I might need to do a quick audit of how each clock is actually doing it.

Even though it needs it, I don't won't to go too much into cleaning up the displayDate object right now.


















Multiple formatters
-------------------

I'm tinkering with the design and wondering if both month numbers and names in different rings might look interesting.
That would require having multiple formatters for certain fields, and ways to specify which to use where - I think they're hardcoded currently so need a way to parameterise that.




