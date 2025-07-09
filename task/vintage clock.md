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

However for getPeriodDayArray the angular context isn't necessarily obvious.
Probably it's usually going to be that the date range represents one revolution, but that isn't a given.
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


Calc radians on array
---------------------

Need to abstract out the radians calc.
Need something that I can apply to an array with a [].map() or similar

Done.
The radians calcs have been pulled out of getPeriodDayArray and moved to the themes.
It's a little bit messier now in a way, but the concerns and implementations are more properly grouped.


Design
------

Have it sort of how I'd envisioned early on, but I don't think it looks that good right now.
Will need some more experimentation to find something cohesive.
Probably need a more solid idea of 'vintage' to get the look right, so I'm going to to start working off actual clockface example photos for this one.
I think I want something sort of first half 20th century, fairly traditional.
Also the wallpaper I've done, while I like it, it's a bit retro and might not be the best match for this; might need something a touch more subdued, a colour tweak or two might be enough.


### Multiple formatters

I'm toying with the design and wondering if both month numbers and names in different rings might look interesting.
That would require having multiple formatters for certain fields, and ways to specify which to use where - I think they're hardcoded currently so need a way to parameterise that.


getMonthLabels & getSectorLabels
--------------------------------

`getMonthLabels` is one of the older methods that's been on the list for chopping for a while.
It's still widely used though so will have to see if can easily be replaced by getSectorLabels.
The name of the latter is a bit unfortunate, but not sure what would be better yet.

I speculated above about different kinds of angular contexts for some things like days/months and I've been half thinking about doing a car-dashboard theme to explore exactly that - year/month/day using circle parts to look like speedos/ tachos fuel gauges etc.
Think I'll add it as a new task for fun.

I was thinking that maybe in a different full-range content 'sector' might make less sense, but actually while the core shape is still a circle it's probably fine.

So I probably want to try rationalising these two methods first, then see what options I have for making the label formatting more flexible.

### Other methods that need to be rationalised/removed

I've removed getMonthLabels; some other methods that also need to be rationalised:

* getMonthSectors
* getDateLabel/getYearLabel
* getPeriodDayTicks



Different label formatting
--------------------------

getSectorLabels currently takes string sectorType arg that gets used for two things:
* the group (g) class
* passed to formatLabel as the labelType

So for now without changing anything else I can just use a different sectorType to do what I want.

### Text on a curve
https://css-tricks.com/snippets/svg/curved-text-along-path/

Would like to be able to do this - would need a section of the sector curve to use.

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/textPath

I've added an experimental application of this for the year text, but I need to sort out how to do negative angles for the bottom half of the clock.

Once that's figured out it needs to be applied to the month names here.
Probably also for the plain-svg theme.


