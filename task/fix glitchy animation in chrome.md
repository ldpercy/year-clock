Fix glitchy animation in chrome
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



Rough evaluation of perceived glitchiness as a percentage of good/vs bad frames:

|              | desktop| desktop small| laptop| latop small|
|--------------|--------|--------------|-------|------------|
| solar (1)    | 80     | 90           |       |            |
| space        | 70     | 60           |       |            |
| wheel        | 0      | 0            |       |            |
| car dashboard| 0      | 1            |       |            |
| vintage      | 0      | 0            |       |            |
| lightning    | 100    | 100          |       |            |
| season-out   | 98     | 99           |       |            |
| wall-clock   | 2      | 0            |       |            |
| brice        | 50     | 70           |       |            |
| debug (2)    | dep.   | dep.         |       |            |


1. Solar glitches a bit differently - it doesn't do full whiteout like most of the themes, it just displays in black and white.
2. The debug theme depends because I'm fiddling with it.



Things to do
------------

* Try some first-level refactors on the main draw functions in the setup script - it's *very* dumb at the moment and there are one or two easy gains to be made there
* Add some proper speed testing: automate drawing 100 frames (or whatever) of various themes and collate the results
* Find out how the `keydown` event actually works  - does it wait/queue etc
