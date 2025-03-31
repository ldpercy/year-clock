Plain SVG Version
=================

I'm going to have a crack at rewriting the current snap-svg code with plain SVG and vanilla JS.

Some parts I think will be fairly easy, others not so sure about.



Plain SVG Theme
---------------
I've created a new theme 'plain-svg', will begin converting some of the draw functions over.

Have removed the 'brice' theme as a base, so this is all indedependent code now.


Initial conversion - it's slow
------------------------------
I've completed the initial conversion of everything to plain SVG.
There's still one Snap dependency in there though, will sort that out shortly.

For this first run I've just used the simplest technique I could think of and string appended the SVG elements to the clock with:

	innerHTML += ...

It's **noticeably** slower than the snap version.

The snap version loads pretty instantaneously, at least I don't really notice any lag.
But this version has a noticeable lag of half a second or so on my machine (firefox).
Chromium feels a little quicker, but still slower than Snap.
I'll add in some timing counters shortly to measure.

My instinct is that the string appending method is likely the culprit.
I expect Snap uses node creation and insertion or similar.


Performance timing
------------------

I've added performance timing to an overridden log function.

Timings vary a bit depending on the browser circumstance.

All in milliseconds.

For example from a freshly loaded browser it's slower:

				chromium	firefox
	brice 		~175		...
	svg-plain	~230-400	~300


Repeatedly refreshing the page:

	Theme			chromium	firefox
	brice 			~25-35		~20-35
	svg-plain		~300-400	~300-350


### Confounding factors
I have a couple of drop-shadows on the new svg-plain theme, they might add a little bit of lag as blurs are sometimes slow.
Also I have different plugins on each browser, so they might affect things.

I could try a few more things but for now I'm looking at around 300ms drawing time with SVG string appending.
I should also note that I only really noticed the slow down after I added the day tick marks.
After that the number of elements went up from a ~30 to around 400.
I could time that out too if I wanted, but it'll prob just tell me what I already know.


Remove last bit of Snap
-----------------------

I'm going to yank out the last bit Snap then wrap this up.

Performance tuning can be done in a different task.

Hmm not as simple as I'd hoped.
Some maths involved.
Might need to split this one too.


Wrapup
------

Have created a brand new theme 'svg-plain' that has no base-dependence on the original brice theme.
It's done using a pretty rudimentary and slow method, should be able to improve.
Going to wrap this upo here as I've done the main task job, though it needs more work.

Two new tasks out of this:
* [improve plain svg performance](<improve plain svg performance.md>)
* [improve month label postioning](<improve month label postioning.md>)

