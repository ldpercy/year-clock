Convert draw functions to string-getters
========================================


Add SVG tag to drawclock
------------------------

At the moment the svg tag is hardcoded into the main page and the clock elements are dynamically added into it.
This is a leftover from the original Snap SVG based design.

Want to move the SVG tag creation into the drawClock function so it's complete and more flexible.


Revise this task
----------------
As part of the theme-classes job I want to change all the draw functions to become string getters - the svg tag will be included in this so repurposing this task.

'Add SVG tag to drawclock' becomes 'Convert draw functions to string getters'.


Draw functions
--------------

At the moment most of the draw functions do their own writing into the target element with something like:

	theme.clock.element.innerHTML += svg;

I think this was a leftover from the more direct style of the original year-clock that I'd never bothered to change.
With moving to classes the methods will need to become string-getters instead, which is more OO in style, but also just better in general.

I'm going to do this first before going back to the class-work as it should stand alone okay.


Wrapup
------

This was fairly quick.
In hindsight probably should have done this a while ago.

* All of the direct draws have been pulled out of the draw functions
* All draw function converted to string getters
* The main 'drawClock' functions have become 'getClockSVG' and now use template strings to call the string getters
* The getClockSVG functions now return the whole SVG string including the tag

Will return to theme-classes next.

