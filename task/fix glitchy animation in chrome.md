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



Evaluation of perceived glitchiness
-----------------------------------

Rough evaluation of perceived glitchiness as a percentage of bad frames:

|				|	desktop	|	desktop small	|	laptop	|	latop small	|
|---------------|-----------|-------------------|-----------|---------------|
| solar (1)		|		80	|			90		|		5	|			5	|
| space			|		70	|			60		|		10	|			25	|
| wheel			|		0	|			0		|		1	|			1	|
| car dashboard	|		0	|			1		|		0	|			0	|
| vintage		|		0	|			0		|		0	|			0	|
| lightning		|		100	|			100		|		99	|			99	|
| season-out	|		98	|			99		|		50	|			50	|
| wall-clock	|		2	|			0		|		0	|			0	|
| brice			|		50	|			7		|		5	|			10	|
| debug (2)		|		dep	|			dep		|			|				|


1. Solar glitches a bit differently - it doesn't do full whiteout like most of the themes, it just displays in black and white.
2. The debug theme depends because I'm fiddling with it.

Nearly always my laptop was less glitchy, it's 3 or 4 years newer than my desktop so it probably has better single thread performance.



Things to do
------------

* Try some first-level refactors on the main draw functions in the setup script - it's *very* dumb at the moment and there are one or two easy gains to be made there
* Add some proper speed testing: automate drawing 100 frames (or whatever) of various themes and collate the results
* Find out how the `keydown` event actually works  - does it wait/queue etc




Set displayDate separately
--------------------------

Wondering what it would look like if displayDate could be set independently.
Currently it looks messy.
There needs to be a dedicated setDate method on the clock classes, but it needs to be customised a bit to each clock so the get the bits they need.
It also needs to be called at construction time, so need to clean this up.


Separate setDisplayDate
-----------------------

Okay this seems to have worked...

I've added proper constructors for each theme class, and each theme now implements it's own setDisplayDate which can be called independently.
I've quickly changed the two keypress date change events to use a `changeDate` function which doesn't do a full reconstruction and it's heaps better.
Need to clean up all that code though, and update more events to just set relevant properties.

