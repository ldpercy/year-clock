Wheel clock
===========

I've been itching to continue revamping the old 'plain-svg' theme - I'd had ideas about transparency/translucency and using clip/mask for knocking out the text.

But think I've got an idea that could finally give it a new name - turn it into a rotating wheel instead of a static clock face with a pointer.

I did a little version of this kind of thing for temperature gauge on the car dashboard.
Going to do the same thing for the whole clock this time.


Knock out
---------

Getting the wheel to rotate wasn't hard.

Have been wanting knockout effects for ages and think I've finally got an example working over in the svg experiment project, so going to try that next for the month sectors.

The problem is that the knockout mask has to include the shape that you want to apply the knockout to, so in this instance I probably can't separate the sectors and labels (as has been the case for everything so far).

Something's not working - need to simplify a bit and build it up.
No hole-in-one for this one unfortunately.

Have a simpler version going just for the year label.

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/mask

Have something working now with a basic `text` element.
Not sure if there was a problem with the textPath version, will keep trying to get it working.
If I can only get it working for `text` will shift the design to something a bit different that doesn't require the curved text - thinking either roman numerals, or maybe something based on polygons/stars.

Okay turns out you *can* use a `textPath` as part of a mask, but I was doing in incorrectly.
The `textPath` element has to be inside a `text` element or it doesn't work.
This is true for `textPath`s in general, not just in this masking case.

Still need to settle on a general idea for this theme though.


Theme ideas
-----------

This one wasn't supposed to be anything in particular just more sort of conceptual wheels in space type of idea.
Maybe a dyson ring or something like that.

Background was going to be similar to to the dusk one, maybe with the sun at the top or bottom - think I might try a few different things.
Was also thinking about making the rings non-concentric perhaps to hint more at a lunar-cylce type of idea (without going into it technically).
There are tons of things that could be tried.

Had a quick go at a not-really-a-wheel idea, with a 'moon' marking the first of the month (plus some really budget diffraction spikes).
It looks okay-ish and marks the first out fairly well, but it's totally misleading in terms of lunar cycles.
Thing is I kinda like it anyway, and it *could* do for now. Maybe.
I'm going to do a proper lunar cycle clock at some point and would probably use a presentation something like this, so maybe I should back away from this one for now and save it for a proper lunar clock.
Alternatively I could just jump on it now.
Need to think about what features/presentation I want for the lunar clock and whether it belongs here, or is there space for the wheel theme first.





