Fix Glitchy animation in chrome
===============================

From: Wheel clock followup


The glitchiness in chrome seems to have sorted itself out for some of the newer themes, but is still present in some older ones - perhaps it's a coding technique that's causing it?
Could be CSS or something?
I might be able to fix it without going too far down the performance rabbit-hole.
Interestingly the glitchiness also shows up on the small versions on the test page, so it's probably not anything to do with size-dependent rendering speed.

Review (on my laptop right now) - these seem okay:
* wheel
* dashboard
* vintage
* wall-clock

Still glitchy:
* lightning - very
* season-out - very
* brice  - a bit
* debug - very
* solar  - a bit, more so in the test page
* space  - a bit

So it looks like it's worse in the themes with year-day sectors, prob they take longer to draw.
But that doesn't really explain solar or space, or the original brice all that much.

Experimenting with the debug theme - taking out the year-day sectors and labels entirely and it still blinks a bit.


Might have something to do with `getPeriodDayArray` - just adding/removing a call to this function does seem to affect the blinkiness, even if the resulting sectors never get drawn.



