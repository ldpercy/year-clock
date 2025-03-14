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


Load sequence
-------------
At the moment the core is a single js file included with a script tag at the bottom of the html (an older technique used to defer loading until later in the parsing).
Lets try to organise the setup.


### Modules only work via HTTP
I was planning to use ES modules, but no-go for local files without a server:

	https://javascript.info/modules-intro#what-is-a-module
	https://github.com/whatwg/html/issues/8121
	https://dev.to/calinzbaenen/rant-why-the-hell-does-everything-cool-javascript-related-have-to-be-locked-behind-needing-server-4ik3

That's a pity.
I don't want to run a server for this so I'll stick with old-school script tags for now.

Part of the reason I wanted to split all this up is to work towards customisation.
Eg have directories for different clock svg, css, json etc.
There are a bunch of suggestions out there for other ways to do this, including creating scripts tags, will have a look.



