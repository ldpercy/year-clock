Improve plain svg performance
=============================

The initial plain svg version is notably slower than the Snap version.
See what can be done to speed it up.

A few thing to try
------------------
There are a few things to try before I go straight to node creation:

* The month and day construction logic could be improved/optimised a little bit, eg some angles precomputed
* Could try grouping together the output strings and inserting them in one go rather that lots of little append steps - might avoid costly redraws
* round a lot of the numbers to a reasonable number of significant figures



Date setup
----------
Have made a few adjustments, didn't really speed anything up, but it's a little cleaner.
Could use a bit more attention though.


Grouping innerHTML writes
-------------------------

This was the kicker - it's *much* faster now.

On both firefox and chromium the drawClock function duration for 'plain-svg' is down to around 20 milliseconds.
So job done from this perspective.


Floating point rounding
-----------------------

Grouping the writes has done most of the job, but I'd also like to look at truncating or rounding the output floats for a few reasons.

* Unnecessary precision - beyond a certain number of decimal places there will be no visual difference
* Longer output might take a tad longer for the browser to parse/compute (not likely to be a biggie - a float is a float)
* Larger overall page and file sizes - bigger memory footprint

Mostly minor things, but I have saved the output for examples so file size matters a bit to me.

Also this should only be applied at output stages so as not to lose precision in computation.
I'm going to split the 'shapes' section of maths out to a dedicated SVG script file to make the distinction clear.

### Significant figures
* 3 - I can see a bit wonkiness in some lines, but need to be fullscreen
* 4 - looks about right
* 5 - looks absolutely perfect

So it'll be 4 or 5 depending on needs.
If you're going to project this in a super-duper IMAX style theatre will ultra resolution maybe go up, but 4 or 5 should be sufficient for most anyone.
I'll stick with 4 four for now.
It could be made into a theme parameter...

I haven't applied it to everything yet, just the radial lines and sectors.
Will come back to the others as needed.


Wrapup
------
* Moved some of the month calculations out of the output loops
* Grouped the document writing for month and day items to reduce redraws - *much* faster now
* Added precision rounding to some of the outputs to reduce overall size
* Added a new example for the readme, with rounding it's about 3/5 of the size of the previous one

