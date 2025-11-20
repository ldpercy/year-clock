Solar clock
===========


This is the long-awaited theme to show things like sun and moon dynamics/phases etc.

Some ideas from the wheel clock task:

* Sun in center
* Fisheye background
* Year-month ring
* Either offset the sun *or* the year-month ring to suggest the seasonal distance from the sun
* Could even hint at the height of the sun in the sky
* Draw moon's apparent 'circular' travel + figure out a way to present lunar phases.
	(The fisheye view might actually make the sun-earth-moon linear relationship less obvious)
* Maybe use diffraction spikes for pointers (if needed)


This is a copy of 'wheel' from when the ideas coalesced.


Thinking again about the fisheye view, and don't think it's going to be the best perspective for lunar phases.

Going to instead try a kind of abstract inner solar-system type view.


Early start
-----------

Was about to head down the rabbit hole of elliptical maths, turns out applying a scale transform does most of the work for me.

Have a tilted view of the inner solar system, and the month ring spinning around the current date.

It's got a bunch of problems though that need to be worked though:

* The months are on the wrong side
* The month days aren't lined up correctly for some months
* The orbit is incorrect as far as I can remember - I think looking from above the plane of the north-up ecliptic the earth travels in a counterclockwise direction, so the month sequence needs to be reversed
* Need to confirm the moon direction as well
* The actual year orbit is ~365.25 days - not going to try to represent that - still working with a standard calendar abstraction here
* It would be nice to be able to simulate a little bit of perspective on the ring - eg make the far side a little bit smaller
* Add axial rays to the sun

Am going to take off the knockout effects for this theme for now, will use those on the wheel clock.


Return after a while
--------------------
The wheel clock task ended up twistier than a basket of pretzels - by the end of it I had the new wheel clock, the start of two new themes, and the ideas for another.

I also had the diversion into performance to fix the glitchiness in chrome, been skilling up on JS classes, and have the new Turtle project going.

So time to return to the solar clock, which I've been slowly laying the groundwork for.

### Rings
During the wheel clock and its followup I added a 'ring' arrangement so that sectors, labels and related config could be grouped together logically.

This is one of the things i needed for the solar clock because the rings & labels need to go counter-clockwise (in contrast to all the other themes so far), so it makes sense to set that collectively.

Which is more or less where I'm at now.


### Sector direction 'anticlockwise'

So far all the clocks have been 'clockwise' for their time-dimension, so most of the currently written code assumes that.
Will need to figure out the best way to switch it, and find all the places that might need updating.
The first thought that occurred to me is just adding a switch to 'addRadians' and/or 'addDateRangeRadians' - that *seems* like it might do it without needing to alter the actual draw loops.

Also, coming back from Turtle I reckon I could tidy up a bunch of code with better use of js classes.

Where to start...


addRadians & addDateRangeRadians
--------------------------------

* `addRadians` is used to add radians to an array where the items are evenly spaced, in practise that means the day arrays - yearDay & monthDay.
* `addDateRangeRadians` is used when the periods are of arbitrary length. So far it's used on arrays for month, season, quarter and week, but could also be used for other kinds of things such as projects or holidays. Just calls `dateRangeRadians` for each item.

I feel like lots of this code could be reorganised/cleaned up with better use of js classes.
There are also a lot of warning comments in there - not sure how current though as things as 'working' at the moment.
I think that stuff dates from the car dashboard when I first introduced angular context.

For instance say I create a class called PeriodGroup or DateRangeArray, i could add a getter for the sectorRadians which would only be called if/when needed.
This would do away with having to manually call the adders in setDisplayDate like I'm doing now.
(That was always a bit of a crufty hack.)
Converting some things over to the angle class I've used in Turtle might be good too.

Still not really sure yet though what objects/classes are more fundamental - ie what should compose what etc.

### What a mess
I've really fallen right into some of most confusing code here...
Lots of functions calling functions to calculate angle ranges.
I've got to be able to simplify this...
The terminology is a bit confusing too.
I need some sort of way of clarfying when I mean an absolute angle, as in for example a clock position, and an angular range as in the difference between two angular positions.
A sector or an angular context (eg car dashboard dials) will be examples of the second.





