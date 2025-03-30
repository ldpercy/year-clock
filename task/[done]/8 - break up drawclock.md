Break up drawClock function
===========================

As mentioned in allow-for-theming there are a few pieces that the clock could be broken up into:

* body or case - the 'outside' or housing of the clock
* face - might be called the 'dial' or 'dial plate' in some contexts eg watches
* season/month/day/other markers - part of the face/dial, but could be treated separately
* year/date/other text
* hands & other pointers

So the first thing to do is probably just put each of those in their own functions, and have drawClock call them in the desired sequence.

I'd like to allow for base-theme inheritance here, so I think they'll need to be accessible in the 'theme' scope somewhere.



Initial work
------------

I've broken up the main drawClock function and moved some things around within the theme object.

We now have a `theme.clock` object to hold all the parameters and drawing functions for the clock.

The only mandatory item within that object is the main drawing function:

	theme.clock.drawClock()

All of the other parameters and functions could be skipped if you just wanted to pack it all into the one function, not the best idea though.


Wrapup
------
This was pretty short and sweet and I'm only polishing things now, so will wrap it up.

The `theme.clock` object now holds all the parameters and drawing functions for the clock theme.

