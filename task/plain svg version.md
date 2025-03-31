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

