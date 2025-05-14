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
It's not a big deal, but I've been wondering if there are ways to draw the labels in other ways so that this interaction is removed or minimised.

### Labels behind sectors

Draw the labels first then the sectors on top.
Normally this will block/obscure the labels, but can work with transparency and/or clever use of css blend modes.

I've managed to produce quite acceptable results on the standard (light) lightning theme with multiply or darken.

It's harder to make the dark theme look nice with just a single blend-mode setting though.
Would probably require more tweaks.

### Labels as children of sector elements

I'm not too sure this can be done actually - if elements like `path` allowed children *other* than title then the hover might bubble.
But I don't think most drawing elements (path, rect, circle etc) allow arbitrary nested children like that - I'll double check.

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element#graphics_elements

Yeah, as i thought, all the graphics elements basically are only allowed animation and descriptive as child elements.


### Group labels and sector elements as siblings

Hover on a containing group might be another possibility - I think I did something like this on the share charts ages ago, but don't remember if it was done natively or with script trickery.


### CSS :has

There was also this that I found a little while back, might offer another avenue:

	https://stackoverflow.com/a/74816531
	https://developer.mozilla.org/en-US/docs/Web/CSS/:has




Dynamically set display date
----------------------------

I've got a couple of test events for single and double click that I can probably put into action.

### dbl click fires two single clicks first

https://stackoverflow.com/questions/880608/prevent-click-event-from-firing-when-dblclick-event-fires

https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail



But for these to be useful what I really need right now is a single function call to set the current display date.
This is probably going to require *lots* of changes.
Lets see now...

* So far the naming for 'current' or 'display' date has been a bit mixed. I started using display date a while back, but lately have been using current. Need to decide on something and stick to it. Display is probably better.
* Need ways to find and update all changeable clock elements to the new display date. No small task.
* Need to clean up the initial date setting code
* Need to clean up anything still relying directly on the `config.date` global


Refactor config.date global
---------------------------

Might start here, might be easy to at least parameterise this.

Ugh. This is a bit of a mess.
In use I've mixed up proper JS date objects and the current `config.date` which has a bunch of extra stuff in it.

What to do...

For starters I need to be clearer about what kinds of dates I'm using in what contexts, that might at least get me out of this jam for the moment.

* If the argument is 'date' it's a vanilla JS date object
* If the argument is 'displayDate' it's the fattened out date object currently sitting in config.date

For now I'll pass the full displayDate object into drawClock, and divvy it out as needed.

Okay done, have cleaned up all the config.date references in the themes.


### Date array globals

I'd like to get all of the `config.` references out of the themes entirely now as well.
There are a dozen or so remaining references to the date array globals left in the themes.
These will need to go as well.

It occurs to me around about here that a few things should be shuffled around to make more sense.

* Those period arrays should be part of the displayDate object, because they are attendant to it
* `config.date = ` should probably be just  `let displayDate = ` and pushed into a constructor in the date script
* This would work towards being able to draw multiple clocks (with different settings) in the same document
* It might also be helpful to turn `displayDate` into a js class to group all of its functionality together

I'm going to go ahead and make these changes but as this touches a bunch of older and lower down code I'm going to merge it back pretty much straight away to keep main in sync.



Experiment - move createDisplayDate to before drawClock
-------------------------------------------------------

This is really starting to change a lot about how things were working - I need to write out what I'm doing here because I'm coming back after a few days and need to reconnect.

* I'd pulled a bunch of globals out of the theme code - I think i got most/all, but there might be a few leftover - will find and fix as needed
* I'd merged all of the fat date stuff together into a single displayDate object that it now being built by a function. That object itself needs some serious refactoring, but it is what it is for the moment.
* The displayDate object is now a transient parameter to the main drawClock function(s), so in theory now (or pretty soon, depending on how good the previous refactors were) I'll be able to split out the clock draw from the setup sequence. This mean's I'll be able to redraw the clock on demand, instead of just at page load.

I think that's where I was up to. I'm hesitant about a lot of this as this all changes stuff that's been pretty static for a long time.

So the idea I had this morning was to rename the setup callback functions to something a bit more generic like 'setup1', 'setup2' and 'setup3' and just include the relevant parts as needed.

So it currently looks something like this:

```
	page load -> setup   (setup 1)
		do all the the general page load stuff
		call async setThemeConfig (setup 2)

	setThemeConfig (setup 2)
		this sets the theme config

		if there's a base theme load that
			setBaseTheme (setup 2.5)
		else
			go straight to load theme
			setTheme  (setup 3)
		call async

	setBaseTheme (setup 2.5)
		do that then
		setTheme  (setup 3)

	setTheme
		do a bunch of final theme setup stuff
		and call drawclock
```

To be honest, it's not that great.

The logic is a bit messy, and the actual logical units are really clearly defined.

Could it be cleared up a bit?


Some kind of better structure...
--------------------------------

So what I'd like, and what I'm slowly moving towards with all of this, is having a single functions like:

	setupPage()									// do whatevers necessary to get the page setup and ready
	drawClock(element, theme, config, date)		// draw a clock into the element with $parameters
	fooClock.setDate(lastChristmas)				// update the date for a clock
	fooClock.setTheme()							// live update the theme for a clock, keep the date
	fooClock.setStyle('dark')					// live update the styles for a clock
	fooClock.setLanguage('klingon')				// live update the localisation for a clock

So I could just spray clocks straight into the page and update them at will.
Something I'd started dreaming of for the test page when i started scripting it....

This is a much bigger task than just interactivity, though the want for interactivity is what's motivating it this case.

I'm going to think about a task split, or maybe just some new tasks.
I'm might want to rename and finish off this branch as well before going much further.


