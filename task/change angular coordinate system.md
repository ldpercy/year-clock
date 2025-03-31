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






