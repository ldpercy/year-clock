Dimension updates
=================

A few things that have been on my mind, not 100% about.


### Proper resizing to 1200/2400

The initial resize was fine, but I'm finding myself wanting to standardise the clockface itself to 1200/2400 so I don't have to trim the numbers to accommodate surrounds/shadows etc.

External features would go beyond the 1200 radius, which would then need...


### Allow for viewbox customization

The viewbox is currently hardcoded in the main html page.
I'd like to add options to customise it a bit.
For instance if you wanted a larger or non-square clock surround you could push out the viewbox to accommodate it.


### SVG size and width

I don't think they're right. Have a look.

Probably most of the SVG tag could be pushed into the drawclock function somehow.



Start
-----
Removing the hardcoded svg dimensions was easy, and I don't think they were doing anything, overridden by css.

I've added a quick viewBox parameter to the theme that when present will overwrite the viewBox on the SVG element.

So with those two, I'm going to go back and resize some of the clocks and add a bit of padding to their viewboxes where needed.

The reason I want this is to make the clockface maths simpler.
I have a theme in mind that I want in three equally sapced rings and I just want to set them at 400 800 and 1200 and not need to tweak the numbers after that.

Resizing
--------
I'll start with the brice clock, as I have a reference for it.
Err actually I don't need to do anything for it - it has no border stroke or shadow so it fits perfectly into the viewbox.

'Common' has the barest of truncations in firefox from the stroke-width, I'll leave it alone.

I've done a really quick resize job on svg-plain and the wall clock.
They're not exactly the same as before, but good enough for now.


Wrapup
------

I'm going to wrap this up, it was just a quick side job before going back to sector-day-markers.

* Removed hardcoded svg element width and height - use css instead
* Viewbox is now customizable in the theme
* Added a convenience fn for quickly setting viewbox padding
* Quickly resized a svg-plain and wall-clock back out to 1200








