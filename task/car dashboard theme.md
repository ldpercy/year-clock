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

I've chopped something together that is starting to work.

Inadvertently I've made the end relative to the start instead of absolute, but this is actually better as more kinds of angular contexts, eg greater than one revolution, are possible.

Have both dials working now in a basic way


Wireframe and Grid
------------------

I've rejigged the getClockSVG methods so that method now sits in the ThemeBase, and the themes now have getThemeSVG methods instead.
The main difference is that the SVG tag has been promoted to the ThemeBase, and I can add common elements easily across themes.

In this case, a graph-paper like grid that gets turned on in wireframe mode to help with layout.

Paying off immediately, spotted a a bug.


Month sector bug
----------------

Looks like I've munged something to do with the month sectors - they're not lining up with their day sector/markers at the moment, hopefully this is just a recently added bug.

Not lining up with days either, it's out fractionally, so not a counting/off-by-one error.

It's:

	addRadians(displayDate.monthArray);

`addRadians` currently only works for evenly spaced array items, so it's evenly spacing the months (bzzzzt).

Need another way of calcing radians for unevenly spaced arrays.

Changes made in:

	8202901c Get dial working for months: remove radians from getMonthArray, move to themes

Months were previously using:

	'radians'      : dateRangeRadians(startDate, nextMonth),



`dateRangeRadians` is still available, and is being used by the season, quarter and week functions.

Need to decide what to do about it. Do I just wodge in angular context, or try to generalise `addRadians`?

I think a general date range addRadians function would be useful.
The array items needn't even necessarily be aligned or consecutive - just as long as they have start and end dates we can calc radians within a context.
Could also be useful for things like custom date-range highlights, which I'll actually want pretty soon.

Now I have another weirder bug...
Something is completely stopping the date.js script in its tracks - no error, just the script isn't loading or available.
It must be a syntax error of some sort, but I can't find it.
Thas was weird:

	Uncaught SyntaxError: redeclaration of formal parameter radiansStartdate.js:133:8note: Previously declared at line 129, column 41

Wasn't showing up in a normal load, only in a pared down test file.
For future reference, I was using a default param with the same name as a const.
Should really have shown up somewhere between vscode, ff, chromium....

I've changed the themes over to use a new `addDateRangeRadians` function to fix the month sector misalignment, and have added angle context to `dateRangeRadians`.
But it is now in an awkward state of being incorrect for date ranges outside what the arc represents - will need to add some testing/rules.
At the moment the only year crossing date range is probably summer in season-out so look at that, but will need a general solution.


dateRangeRadians
----------------

Currently stands like this:

	function dateRangeRadians(date1, date2, radiansStart=0, radiansLength=Math.TAU) {...}

But it's incomplete like that.
Currently it's exhibiting as a bug on the year side of the dashboard theme.
It's assuming the dates take place within a standard circle.

Ugh.
Struggling with this one - too many assumptions.
Lets generalise it a bit.
What if the array items were non-sequential/non-correlated, ie just an arbitrary set of date ranges.
And we wanted to calc their radian parameters over an arbitrary arc.

We'd need
	* the array of date periods of interest (holidays/seasons/sprints whatever)
	* The angular range over which to distribute them
	* The date range represented by the whole range

So if the arc is 180 degrees, and the arc represents a whole year, then the date period sectors can be placed within.

So I need some sort of compact way or expressing a date-angle mapping.

```js
	const diy1 = daysInYear(date1);
	const diy2 = daysInYear(date2);

	const start = divisionRadians(diy1, dayOfYear(date1), radiansStart, radiansLength).start;
	const end   = divisionRadians(diy2, dayOfYear(date2), radiansStart, radiansLength).start + (Math.TAU * yearDifference(date1, date2)); // INCORRECT for arcs
```
There are more assumptions in here too.
The `daysInYear` and `dayOfYear` calcs aren't necessarily correct - they need to be replaced by something sensitive to the date range represented by the full arc.
So need something like:

```js
	const daysInRange = daysInRange(periodStart, periodEnd);

	const dop1 = dayOfPeriod(date1, periodStart, periodEnd);
	const dop2 = dayOfPeriod(date2, periodStart, periodEnd);

	const start = divisionRadians(daysInRange, dop1, radiansStart, radiansLength).start;
	const end   = divisionRadians(daysInRange, dop2, radiansStart, radiansLength).start;
```

That will be closer.
Need to write `daysInRange` and `dayOfPeriod` though.

I think they're actually the same function - `dayDifference(date1,date2)` which will just be a generalised version of the current `dayOfYear(date)`.

`dayOfPeriod` might still be needed - it could return null if the date is outside the range  - not sure yet.


### Experimenting with small classes
The signatures of some of these functions are starting to get a bit hard to read.
I'm going to toy with changing some things over to small classes for obviously grouped parameters.
Eg:
```js
class DateRange {
	constructor(start, end) {
		this.start = new Date(start);
		this.end = new Date(end);
	}
}/* DateRange */
```
Not sure yet if this will help or hinder read/write-ability, will try it for a little while.
Also *technically* these might be better described as intervals, will stick with range for now.

Actually i might need another terminology here - I also want to be able to describe ranges in terms of start+offset pairs that I'd started using for radian width.

Using 'range' for one and 'interval' for the other is tempting...
For really simple things I could even get away with using completely generic classes, ie just Range or Interval.
Could even subclass for datatypes, might be good for some things, not sure I want to though.

For radians i'll use Delta, something like this:
```
class RadianDelta {
	constructor(start = 0, delta = Math.TAU) {
		this.start = start;
		this.delta = delta;
	}
}/* RadianDelta */
```


