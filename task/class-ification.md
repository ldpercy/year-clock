Class-ification
===============

Reorganise more stuff into classes.
Lots to do here, and some of this will be ongoing rather than a self contained task.

```
2025-10-19		New Task
```

Ideas
-----

After doing the conversion to html app I have more ideas about ways to better organise things.
And there are some things I can definitely take from what I've done in Turtle.

* The display date and related methods could be moved to YearClock class
* SVG should be turned into a library similar to the one in Turtle
* The 'utility' methods could be moved to the year clock app/html app
* Maths/geometry reorganised to something like what I have in Turtle, but fix the coordinates to SVG-polar-up-clockwise

Not sure yet what to do with all the date functions - some will find a home elsewhere, but some look like they could belong to an ordinary js Date instance.
Need to find out what's considered good practise for things like that - is it okay to embellish built in JS functions/objects/classes, or is it better to define derivatives with the needed extras?

The ThemeBase will also be ripe for reorganising into smaller classes.
I could probably have large chunks of it as a library in the YearClock namespace, and the actual inherited portion could be fairly small.


Out of everything, the maths and date scripts are going to be hardest work as they're the biggest and messiest.


Namespaces
----------

I've been out for a walk and was thinking about this.

Nearly everything could just be placed under a 'YearClock' namespace, or if wanted I could go further and use 'ldpercy' as a master namespace under which I put all my projects, ie have 'ldpercy.YearClock', 'ldpercy.Turtle' etc.

I've just had a quick try of a setup like this over in experiment-html, and it seems to work - no idea if there are issues with doing it like this, but I'll give it a try at least.
Can always change it...

The setup will look something like this:

```js
class ldpercy {}														// my top level namespace
ldpercy.yearclock = class {}											// namespace for year clock related work
ldpercy.htmlapp = class {}												// namespace for the html app
ldpercy.htmlapp.HTMLApp	= class { ... }									// Actual HTML App class
ldpercy.yearclock.App = class extends ldpercy.htmlapp.HTMLApp { ... }	// html app for year clock
ldpercy.yearclock.app = new ldpercy.yearclock.App();					// instance of the yearclock app

ldpercy.yearclock.
	Date
	SVG
	i10n
	maths				// various classes/namespaces for libraries

ldpercy.yearclock.theme = class {}															// namespace for all theme classes
ldpercy.yearclock.theme.ThemeBase = class { ... }											// theme base class
ldpercy.yearclock.theme.Solar = class extends ldpercy.yearclock.theme.ThemeBase { ... }		// (etc) concrete theme classes
```

I might drop the 'ldpercy' if it gets too verbose.
Alternatively see if there's any easy way to alias it.

From MDN:
> Class expressions can have names as well. The expression's name is only visible to the class's body.
> ```js
> const MyClass = class MyClassLongerName {
>	// Class body. Here MyClass and MyClassLongerName point to the same class.
> };
> new MyClassLongerName(); // ReferenceError: MyClassLongerName is not defined
> ```

I'll have to see how this works with nesting, might be useful.
Hmm just tried it, probably not unfortunately, likely just end up using `yearclock` as the base namespace for now.
Might still use ldpercy for some external or common things like the html app.




Start converting everything
---------------------------

Am in the process of converting the scripts to become classes.

For now most things are being explicitly placed under a 'yearclock' namespace, eg:

	yearclock.Maths
	yearclock.Event

But some things will end up under an 'ldpercy' namespace - will see how that goes.

I've also moved a whole stack of stuff around into more sensible directory locations.

This is going to get v2.0 on account of practically everything changing.



Dates....
---------

I've subbranched to try a Date conversion - massive amount of changes, much will need more work, but it's 'mostly' (famous last words) working.

All the themes are green, but still going over things looking for bits I might have missed.
Some titles/labels for vintage look odd and need verifying for instance.

A bunch of the old crufty code to do with displayDate has been rehomed into the base yearclock class, i've reworked it a little, needs more.

Some areas are more verbose now with all the namespacing, but that's to be expected.
I can only do a little aliasing in this kind of setup, but will try to find places where things can be trimmed down some more.
For example I'd like to do something with the date static methods if I can, still undecided about those.

Still looking for ways to make it clear when a method returns a 'new' object, untethered to the original.

This is an example:
```
this.displayDate.monthDayArray = this.getPeriodDayArray(yearclock.Date.startOfMonth(this.displayDate), yearclock.Date.nextMonth(this.displayDate), this.displayDate, this.displayDate.language);
```
There will be ways to clean this up, but for now is a bit long winded.


The title turning up in the vintage theme is actually coming from the ring, so while relatively new, not related to this conversion.
I'll turn it off.


What's next
-----------

I'll quickly change the 'utility' into a testing library.
Will get rid of the old 'log' function I think - will just stick with the standard console and explore it's methods more.

After that it's only geometry and period array remaining.
They're both pretty messy and sources of some very refactorable code, esp geometry.
A lot of geometry will also be convertible into a version of the planar space from Turtle.

For now will try to just class-ify them with minimal refactoring.


### PeriodArray

This really needs a different name/organisation, but it will have to do for now.
All of this code could use some hefty refactoring.
A few similar methods got dumped into the root of the yearclock theme, all will need sorting out.



