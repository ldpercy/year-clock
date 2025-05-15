Refactor config global
======================

Split off from: [add interactivity](<add interactivity.md>)

Original context below up up until **Resume from task split**


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

The logic is a bit messy, and the actual logical units aren't really clearly defined.

Could it be cleared up a bit?


Some kind of better structure...
--------------------------------

So what I'd like, and what I'm slowly moving towards with all of this, is having a single functions like:

	setupPage()									// do whatever's necessary to get the page setup and ready
	drawClock(element, theme, config, date)		// draw a clock into the element with some $parameters
	fooClock.setDate(lastChristmas)				// update the display date for a clock
	fooClock.setTheme()							// live update the theme for a clock, keep the date
	fooClock.setStyle('dark')					// live update the styles for a clock
	fooClock.setLanguage('klingon')				// live update the localisation for a clock

So I could just spray clocks straight into the page and update them at will.
Something I'd started dreaming of for the test page when i started scripting it....

This is a much bigger task than just interactivity, though the want for interactivity is what's motivating it in this case.

I'm going to think about a task split, or maybe just some new tasks.
I might want to rename and finish off this branch as well before going much further.

A few more thoughts while I'm here.

* For any of the above to work each clock will need it's own namespace. So the load sequence will need to be more careful about where it's payloads get dropped.
* Individual clock instances could be organised with js classes for data and methods
* ...Or something more *functional*, whatever that may be
* Reusing the page's script elements for loading different clock themes I think could probably be done, as long as the relevant bits get copied into the relevant instance spaces.
* Styles on the other hand, not so sure about about. I've never dug all that deep into scripting styles, so not sure if there are ways of saying 'load this, but only apply it to this' which is what I'd need. I know there are techniques out there, virtual dom and other things I used to butt into in SPAs, but will need to brush up.


Where to from here?
-------------------

As stated I need to rename and finish up this branch - new work = new tasks.

Work so far on this branch:
* Experimental click events on the svg - will comment them out for now
* Add displayDate as parameter to drawclock
* Remove/refactor out old config.date ref in themes to use displayDate parameter
* Moved period arrays into config.date/displayDate object
* displayDate object creation moved to function in date script
* And displayDate call moved to just before drawClock

So thus far this has mostly been about removing reliance on the `config.` global scope, mainly for the theme code.
That will then become the updated task and branch description.

There are still a few references to `config.` left that I'll pull out as part of this task.

There's also the `theme.` global that needs to be addressed - but that's going to have to be part of a new task.



Resume from task split
----------------------

Original 'add interactivity' context above, new task context from here on.

