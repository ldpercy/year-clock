Lightning theme
===============

This is just a theme variant for a bit of fun.

Instead of using a hand to point to the current date, light up the current sectors for season, month, week and day - might look a little like lightning.

Might change this one to use quarters instead of seasons.

New requirements:
* Quarter array
* week array
* 'current' sector class additions


Quarters and hovers
-------------------

Have the new lightning theme setup, this one using quarters instead of seasons.
Quarters wasn't hard to set up, and i've the sector draw function generic so can be used for them and seasons.

Have added a few more titles, and playing a bit more with hovers.
For the lightning theme I've added hovers on all sectors, and it's quite fun to play with.

There is an effect I'd *like*, but am not sure how it could be implemented.
What I have in mind is that when when hovering over a subpart, eg day, all it's conceptual parent groups would highlight as well.
Problem is they're not strictly grouped as parent-child in terms of actual elements in the markup.
I could try to bucket them all, but that seems like a massively unnecessary overhaul for a minor bit of eye candy.

I did find this though that might be worth looking in to:

	https://stackoverflow.com/a/74816531
	https://developer.mozilla.org/en-US/docs/Web/CSS/:has

Would probably need to add some more classes or data for the selectors to work with i think.
Not big priority though.


Week array
----------

I want to add an extra ring for weeks.

It's around about here that adding some types would really start to come in handy.

https://en.wikipedia.org/wiki/ISO_week_date

Turns out there's a standard week system, and that sometimes the first few days of the year aren't considered part of the *official* week 1:

> If 1 January is on a Monday, Tuesday, Wednesday or Thursday, it is in W01. If it is on a Friday, it is part of W53 of the previous year. If it is on a Saturday, it is part of the last week of the previous year which is numbered W52 in a common year and W53 in a leap year. If it is on a Sunday, it is part of W52 of the previous year.


Not sure what I want to do about that - for my needs I'd rather just have everything start at 1 (or zero) and count up from there incrementing every time a Monday rolls around.

Will sit on it for a bit.

### Start with a basic array

For now I'll start with a basic array and leave ISO week support for a later task.


Have the week ring going now and added a bit of overlap, looking good so far.
Next need a way to highlight the current date, or dates in general.



Date Highlighting
-----------------

For this theme all I really need is to mark the appropriate sectors for the current display date.
So for example you add a class 'current' to the current quarter, month, week and day.

That would probably do for now, but I feel like this tends to hint pretty strongly at general highlighting.

New task: [custom date highlighting](<custom date highlighting.md >)

Lightning
---------
I have a basic version of highlighting working for the display date now, so the 'lightning' theme is starting to look as I'd intended.

The generic date highlighting I'd talked about above is it's own topic, with it's own concerns and problems so will defer that to sometime later.

For now I've just managed to squeeze in a few extra classes for the current display date so they can be highlighted.

There a few things that I want to try before wrapping this, and there'll be some follow up tasks as well.


Labels
------

So far I only have year and month labels, but I don't really like the year positioned in the middle.
With so many sectors in this theme I'd prefer to move the year off the clockface altogether and out into the background space, and add some sector labels for the quarters and months.

To get the sector labels really nice will probably require a bit of overall refactoring, but I might be able to bodge something together for now.

But before that I want to try placing some date labels outside the clock border, which I haven't done yet.

Have year and month-day out on the corners now.
Looks akay, still thinking though.


### label rotation
I'd also like an extra option or two for the label rotation, eg rotate left/right, and allow for adaptive inversions for those options as well.



Bug in Quarter radian calculations
----------------------------------

The quarters are defined as absolute half-open date ranges.
This won't produce the desired result for the last quarter though (yearclock/script/date.js:269):

	dayOfYear(quarter.dateEnd)

I need something like 366 back instead of 0 or 1, or to change how the quarter boundaries are calculated.

The problem is:

	function dateRangeRadians(year, dayOfYear1, dayOfYear2) {

Which works off day-of-year.
It really needs to work off absolute dates rather than day-of-year to facilitate things like half-open dates for end-of-year, ranges crossing year boundaries generally etc.
So far only used in newer array creation functions: season, quarter, week

Have converted dateRangeRadians to work off absolute dates, and added allowances for year-spanning ranges to add/subtract extra 2pi revolutions; seems to be working though haven't fully tested yet.


Labels, rotations and another bug
---------------------------------

I need a couple more additions here:
* Label rotation options - already mentioned
* Different formats for labels and hovers (titles)

### Week array bug
There's also a week-array bug for the year 2024, eg:

	yearclock.html?theme=lightning&date=2024-07-30

Bug sorted (I think), but it took way longer than I'd have liked.
Have repurposed the old 'test' theme to become a general debugging theme.


Label and sector formatting and titles
--------------------------------------

I've started tinkering with this, but it's gotten a bit messy as there are still dedicated label and sector functions for months and days.
Seasons, quarters and weeks use the generic functions.
Not sure if they can be combined yet.
I think this could use a proper treatment in a different task.


Label rotation options
----------------------

Want to have a crack at the label rotation options now though.

Rotate options:
* none - Regular horizontal text on the page
* radial - Rotate the text so that the bottom points towards the origin
* radial-right - Radial plus an additional 90deg right turn
* radial-left - Radial plus an additional 90deg left turn

Invert options:
* none - don't add any extra inversions
* invert bottom
* invert left
* invert right

What about invert options? there's one inbuilt one leftover from the brice theme, but could the idea be generalised?
I suppose the idea is that for a particular section of the circle to apply an extra 180 degree turn so that the text vaguely points 'up'.
For example the current invert applies and extra 180 for the bottom half of the circle.
For left and right radial you could invert either the left or right half of the circle to achieve something similar.
Tbh I can't seeing it getting much use, but it could be done.
It might turn out to be better to allow the designer to provide a rotate function instead of trying to anticipate all the permutations.

I've given the options version a go, and it's turned out okay, not too difficult.
Would still like a function version though at some point.


Square clock body
-----------------

The dates floating outside the clock body looked a bit weird, so I've changed the clock body to a rounded square, which I reckon looks alright.


Extras, thoughts
----------------

I'm getting pretty close to wrapping this, but there are a bunch of little extras and improvements I want to make note of at this point.
Most of these I'm happy to do as a follow up tasks:

* Truncated weeks at the start/end of year need to have their labels customized (shrunk) or taken off entirely
* **Really** want to add more info into the bottom corners of the lightning theme - week number, day name/number, etc. Need to improve week calcs for this though.
* For very small sectors like year-days it would probably be sufficient to draw quadrilaterals with straight lines rather than proper arcs. Really unlikely that the difference would be noticed, and maybe a bit lighter.
* Would love to remove the old dedicated month sector and label methods
* See if any of the CSS blend properties work in SVG - multiple uses, nice effects
* See if on-face labels can be moved behind their sectors to improve hover effect - could use CSS blend if available
* The dedicated drawDateLabel and drawYearLabel functions need to be sorted out - some of the old clocks are using drawDateLabel which has positioning logic and it's a bit confusing, need to clear up. Something more general would be better.
* Add a 'last day of period' for more user-friendly output of date ranges


### Improve label and sector formatting and titles (noted above)

I've gone ahead and done this, now just have two formatting functions - formatSectorTitle and formatLabel.
It's an improvement in most ways, but it makes setting default and override formatters more difficult as the functions are all-or-nothing.
Will have to see if there's a better technique than a that would allow for overrides.


Wrapup
------
