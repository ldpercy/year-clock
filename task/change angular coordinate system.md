Change angular coordinate system
--------------------------------

*Was: Improve month label positioning*


Currently the month labels are positioned with transforms that rely on Snap svg for the rotation.
It's the last piece of Snap in the plain svg version (which has [its own problems](<improve plain svg performance.md>)).

There are a few pieces to this and a bit of maths so it needs its own treatment.



Label positioning try
---------------------

Without the transforms the month labels all pile up at 12 and 6 o'clock, so there's some funky positioning going on.

I had a quick go at using the maths polarPoint function to place them properly using x and y coords, but things spiralled a bit.

The maths functions use a rotation angle that is shifted by 90 degrees:

```javascript
	function clockAngle( revolutions )
	{
		return Math.TAU * (revolutions - 0.25)
	}
```

So the labels ended up on the wrong months.
I tried fiddling with that, but it became clear that it was more involved - things like the month and day markers could also end up in the wrong spot.

So here we are, it's more than just label position, it's the angular coordinate system.
I think I might rename this task.


What I'd like
-------------

This probably contradicts established practise, but for simplicity I'd like 12 o'clock to be 0 degrees and increase clockwise from there.

It's in radians, so it should go from 0 to 2pi.



How it works currently
----------------------

Start and end angles (trimmed):

	January		-1.5707 -1.0386
	February	-1.0386 -0.5407
	March		-0.5407 -0.0085
	April		-0.0085 0.5064
	May			0.5064 1.0386
	June		1.0386 1.5536
	July		1.5536 2.0858
	August		2.0858 2.6179
	September	2.6179 3.1330
	October		3.1330 3.6651
	November	3.6651 4.1802
	December	4.1802 4.7123

So currently it goes from -1/4 to 3/4 of a revolution.

I'd like these from 0 to 6.2831...

Taking the quarter turn off clockAngle fixes that.
But now the month sectors are out by 90 degrees and the labels by 180.


Do it properly
--------------

I'm just messing about here, trying different things.
The labels are in the correct spot, so I'm something is right, but the month sectors are still out by 90.
Need to actually do the maths.
There's probably a very good reason for the way it was done.

### Coordinates

SVG uses the following system (centered around 0,0):

	-x -y	+x -y
	-x +y	+x +y

...

Oooh I think I've found it. There was extra quarter turn hidden in the label code:

```javascript
	const midAngle = midpoint(startAngle,endAngle) + (Math.TAU * 0.25)
```

Take that out and now it's working.
I wasn't all that far off.
The trig functions for polarPoint needed changing for the new angles, but that was about it.


Improve month label positioning
-------------------------------
So with that done, can I go back to the original job?

Done, labels now have absolute centers and are rotated corrently (transform now only for rotation on the spot).


Wrapup
------

Angles now start at 0 at 12 o'clock/Jan 1 and increase clockwise through to 2pi/360.
A few bits of maths rewritten, and a couple of stray quarter turns removed.
The month labels now have proper positions and are only rotated in place around their centers.
And the last bit of of Snap has been removed from the plain-svg theme.


