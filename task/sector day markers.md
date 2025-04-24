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


Day bug
-------

I added a couple of hovers to the new season-out theme - first just a red highlight for the day under the mouse, bit of eye candy, but it's neat.

Then I added an actual tooltip-style hover for the day sectors with title tags showing the date.
Actually really useful, except it's showing that all of the days/dates are seemingly out-by-one - for instance firsts don't line up with their month starts.

So what's going on?

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

> The timezone is always UTC

So my maths `isoDate(date)` function is wrong.

https://stackoverflow.com/questions/49330139/date-toisostring-but-local-time-instead-of-utc/72581185#72581185

I've used this answer to fix my function.



Seasons
-------

I've wanted this for ages.
It was one of the first tweaks I wanted to add the the original brice clock, with some cute little emojis for the seasons.

Now's the time to tackle it.

Initially it looks easy, just create an array something like:

```json
	const seasonArray = [
		{
			name: 'Summer',
			startDate: 'year-12-01',
			endDate: 'year-03-01',
		},
		{
			name: 'Automn',
			startDate: 'year-03-01',
			endDate: 'year-06-01',
		},
		{
			name: 'Winter',
			startDate: 'year-06-01',
			endDate: 'year-09-01',
		},
		{
			name: 'Spring',
			startDate: 'year-09-01',
			endDate: 'year-12-01',
		},
	];
```
And do the same array looping for the sectors as usual.
But it's a tiny bit more complicated because summer crosses over the year boundary (which is conveniently obscured above).

So you could split up Summer like this:
```json
	const seasonArray = [
		{
			name: 'Summer',
			startDate: 'year-01-01',
			endDate: 'year-03-01',
		},
		{
			name: 'Automn',
			startDate: 'year-03-01',
			endDate: 'year-06-01',
		},
		{
			name: 'Winter',
			startDate: 'year-06-01',
			endDate: 'year-09-01',
		},
		{
			name: 'Spring',
			startDate: 'year-09-01',
			endDate: 'year-12-01',
		},
		{
			name: 'Summer',
			startDate: 'year-12-01',
			endDate: 'year-01-01',
		},
	];
```
That would cover the year neatly, but then you've got two summer sectors, and it doesn't make it easy to position a label in the middle.
An improved approach would be to have summer and end in the same year, and pray that the maths works out as the angles across the boundary will be decrease.

I might just try that first and see what it will actually do, but I have another idea if it fails.

### 1st day bug

Have something nearly working, though not sure that it should be...
Anyway there's a small bug in the start/end angle, getting overlap by one day, need to find.
That just the wrongle end angle, easy fix

Anyway I have something working for seasons.
I'm not sure how dateRangeRadians is working for negative ranges though... should test it.



