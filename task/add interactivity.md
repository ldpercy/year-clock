Add Interactivity
=================

*Was: Add hovers*


Add hovers
----------

I'd like to add a few simple hover animations for various bits of the clock like the hands.

Mostly just eye-candy, but could be used to help readability.


**Update**

I've been adding title elements and basic hovers over the last couple of themes, and some of these have filtered back to the older themes.

There are more things that could be done, but I've renamed this task to 'Add Interactivity' as I have few more ideas that go beyond hovers.


Click event ideas
-----------------

Just ideas at this stage:
* Double click on day/other segment to set current display date (preferably without a reload)
* Single click on day/other segment to set a secondary date and show relative difference such as 'days ago' or 'days to'.





Labels block hovers
-------------------

> [!NOTE]
> **Not a high priority** - Don't spend too much time on this

Everything so far has had the sectors drawn first, with labels placed on top.
This is fine and produces the visual result you'd expect and want most of the time.

One downside though is the hover for the sector gets blocked when the mouse is over the label text.
It's not a big deal, but I've been wondering if there are ways to draw the labels in other ways so that this interaction is removed.

### Labels behind sectors

Draw the labels first then the sectors on top.
Normally this will block/obscure the labels, but can work with transparency and/or clever use of css blend modes.

I've managed to produce quite acceptable results on the standard (light) lightning theme with multiply or darken.

It's harder to make the dark theme look nice with just a single blend-mode setting though.
Would probably require more tweaks.

### Labels as children of elements

I'm not too sure this can be done actually - if elements like `path` allowed children *other* than title then the hover might bubble.
But I don't think most drawing elements (path, rect, circle etc) allow arbitrary nested children like that - I'll double check.

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element#graphics_elements

Yeah, as i thought, all the graphics elements basically are only allowed animation and descriptive as child elements.

Hover on a containing group might be another possibility - I think I did something like this on the share charts ages ago, but don't remember if it was done natively or with script trickery.



### CSS :has

There was also this that I found a little while back, might offer another avenue:

	https://stackoverflow.com/a/74816531
	https://developer.mozilla.org/en-US/docs/Web/CSS/:has


