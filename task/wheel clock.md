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




