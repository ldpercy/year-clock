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


There's a copy of 'wheel' from when the ideas coalesced in `theme/solar`.


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