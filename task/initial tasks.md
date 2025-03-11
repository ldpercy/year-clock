Initial tasks
=============

* See if I can rescale the whole thing to a radius like 1000 or 1200
* Figure out to correctly include and sequence different js files
* Figure out if i can *dynamically* include things like js and css based upon parameters etc
* Start going through the init/draw sequence & setup


Rescale
-------

Gone okay so far, have scaled up to 1200, and it looks pretty similar, though I'm not aiming for exact.
A bunch of little bits of the svg are buried in the Snap scripts like paths and style attributes.
I've rejigged a few of those for the rescale.

I'd like to pull more of the svg out of the snap scripts, and convert things to template strings and ordinary styles.
I wonder how much of the Snap is needed?
Could it be replaced with vanilla JavaScript, or even SMIL?



