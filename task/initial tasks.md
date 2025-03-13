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
For now I've added the 'pivot' to the needle.

I'd like to pull more of the svg out of the snap scripts, and convert things to template strings and ordinary styles.
I wonder how much of the Snap is needed?
Could it be replaced with vanilla JavaScript, or even SMIL?



SVG cleanup
-------------

Will continue cleaning up the SVG for a bit, mainly pulling bits out the scripts.

### Font-size
I think I need to define a base document font-size, and use relative after that.

Hmm the script used to position the year will have to be rejigged. I'll hack it for now.
Also the baseline-shift and vertical-align properties dont' seem very well supported in svg so I can't tweak the vertical purely in css (yet).

Ah-hah:
https://stackoverflow.com/questions/2193916/positioning-svg-elements-using-css

This works in both firefox and chromium.
Id really like to be able to test this in KDE's svg engine as well, but not sure how to do that yet.

This will do for now, move on to js sequence and module loading.