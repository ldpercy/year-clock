Themes as classes
=================

Themes are currently just properties and functions that get loaded into a global `theme` object.

I'd like to try some more structured approaches so that I can load multiple themes at once.

This idea is to create theme classes, out of which individual clock instances can be created and instantiated on the page.

This one is tentative as I'm not sure it's the necessarily the best approach, but I'd like to try it to see how it pans out.


If successful will likely cover these two as well:
* [dynamic theme loading](<dynamic theme loading.md>)
* [add svg tag to drawclock](<add svg tag to drawclock.md>)

And probably simplify [convert callbacks to async](<convert callbacks to async.md>).



Starting ideas
--------------

Not really familiar yet with how JS classes work, but in fairly trad OO you'd do something like this:

* Create `Theme` as an abstract base class from which all other themes inherit. It declares the core methods to be implemented such as 'drawClock'.
* The current 'common' theme becomes a concrete base class (eg Common extends Theme)
* The other themes extend the 'Common' theme (eg Lightning extends Common)
* Other common/base classes for themes are (theoretically) available
* Composition as well, if inheritance proves problematic
* Actual clocks drawn onto the page will be instances of the concrete classes

### Abstract base classes (and interfaces)
Doesn't look like abstract classes are a built-in feature in JavaScript, but can be simulated:
https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript#48428063
https://medium.com/@rheedhar/abstract-classes-in-javascript-d6510afac958

As the base 'Theme' class would normally be abstract some of those protections could be applied.

While on this no interfaces either:
https://stackoverflow.com/questions/3710275/does-javascript-have-the-interface-type-such-as-javas-interface

But a couple of neat tricks in that post to facilitate duck-typing.


What happens to the loading sequence?
-------------------------------------

Like this the whole loading sequence could potentially disappear....
(Or significant parts of it...)

The loading sequence was built to bring the relevant theme scripts into the document using old-school script tags.

In theory you could have all of the (common) themes sitting in a single library that just needs to be loaded once and wait for any instances to be instantiated.
No need to do any of the complicated callback stuff, as all base/inheritance/overrides are taken care of by class inheritance.

Some dynamic load of styles still probably required though for now at least.

This could really clean up a *lot* of code.

### Where does the theme code live then?

It's still not really clear how the files could be organised yet, for instance the script parts don't necessarily need their own directories anymore.

How it ends up being structured will probably depend a fair bit on what can be done about the stylesheets.
For example if there *are* techniques to apply certain chunks of CSS to certain nodes, and this can be done dynamically/scripted, then a whole theme could probably be packed into a single script file.
(Rather than the 3 or more in a directory used now.)

I'd better take a detour into stylesheet scripting.

See: [multiple clocks in document](<multiple clocks in document.md>)


Remaining questions
-------------------

At this point I'm satisfied that classes will *probably* work, and that targeting css for in-page clock instances can *probably* be done.

I'd like to start writing code soon...

There are a few remaining things to clarify...

* Do we do away with the theme folders altogether and replace them with single class files?
* If so how do we declare/load the correct theme classes at page load time?
* If themes have base classes, how do we make sure they're loaded/present before the theme's classes are loaded?

Some quick ideas for a really basic implementation...:


### Themes will probably end up being single files
Everything will be packed into single class files:
* config
* CSS
* drawClock
* anything else

That means the theme folder will just have a bunch of files like:

	themeName.class.js

### Base classes are always loaded
This keeps things simple to begin with - in effect we have something like this most of the time:
* 1 abstract base theme class (class Theme)
* 1 concrete base theme class (class Common extends Theme)
* Any number of actual theme classes inheriting from Common (class ThemeName extends Common)

At the very least the abstract base class will be part of the core scripts.
In two minds at this point about whether the 'Common' class belongs there as well.

### Theme classes can probably be loaded at page load or dynamically as requested
It won't matter too much either way I don't think.

...
So that's probably enough to start on *something*.
It won't be great, but better to start somewhere.




Task split
----------

-> [multiple clocks in document](<multiple clocks in document.md>)

I've spent way too much time on this particular diversion.
It's been cool brushing up on recent CSS features, but I need to split this particular goal out to a separate task.

For now I'm going to keep the css as plain files to keep editor support.
Which also means keeping the theme directories for now as well.

This task is now primarily about just the JS-class aspect of theming.




Back to the theme classes
-------------------------

I'd started making a bit of mess beginning to change things over.
Want to take a step back and sketch out vaguely how the initial load/draw might work now with classes.


* The three old callbacks should go away; should need only one
* Now I'll probably need a a central addClock function that sits in the page that looks something like drawClock(element, theme, config)
* The clock theme classes probably shouldn't have their own draw-into-element methods - I think that should be the page's responsibility.
* The drawing functions should probably all be rewritten as string getters, so the main method just returns a big fat svg string to be inserted/appended by the document.

The document addClock (or whatever I call it) function will probably be responsible for a few things:

* Retrieving and caching the theme class (if it hasn't already been loaded)
* Maintaining records/references of what's been loaded/drawn and handling reuse of already stored resources

It might actually be better to have a small class in the page itself to handle some of this...

Actually I think it's a bit arguable what info should be stored by the page and what should be stored in the instance - will work that one out as I go.


### Draw functions converted to string getters

Took a detour to do this first, will make conversion to classes easier.



Where to next?
--------------

Trying to figure out the next steps...

Will try working on the Clock constructor method, which should take parameters like:

	* date (or displayDate)
	* style
	* language
	* id

How many of those are strictly needed in the constructor though?


Name mapping for theme classes
------------------------------

So far I've used dashed lower-case names for themes eg 'wall-clock'.

For classes though will probably want to stick with the convention of upper-casing them, and dashes will probably be out.
So do i start mapping between name styles, or just enforce one format?

Because I'm namespacing the theme classes I could probably do something like this:

	themeClass['wall-clock'] = class extends ThemeBase {

But not sure I want to.
Ugh. I'll start out like this and see how it gets on, though not totally enamoured with it.


A tiny peculiarity in class methods
-----------------------------------

I have a line in a few of the theme getClockSVG methods that looks like:

	${theme.clock.getHands(displayDate, drawMonthHand=false)}

The inline assignment `drawMonthHand=` throws up errors after being converted to a class.

	Uncaught ReferenceError: assignment to undeclared variable drawMonthHand

For whatever JS reason this style doesn't work with classes, no problem, not wedded to it.
Should probably just convert 'hands' to a config object to cleanm it up.



Main class conversion done, cleaning up
---------------------------------------

Removed the old config.js files, they're no longer needed.
I don't think anything was making any use of the loadBaseCSS flag anymore, and it was trouble to begin with.

### Common theme
The 'common' theme is now not really doing much as it basically inherits everything from the theme base.
The only thing it provides is a basic outline css.
I think I'll keep it around, but think about renaming/repurposing it.


Clean up defaults and 'globals'
-------------------------------

One thing it does highlight though is that there are still some default values in the ThemeBase class.
I should very probably remove them.
They're possible sources of unintended dependencies and bugs.
I'll move config 'defaults' to the common theme where they can live for now.
This should show up any accidental config inheritance.
I'm in two minds about whether *some* sensible defaults might be helpful for some things - not sure yet.

* A default viewbox string is probably reasonable
* There are default arguments used in a few places - should prob remove those too

Some older base methods for the original themes still make use of what were globals as well:

* getPeriodDayTicks
* getDateLabel
* getMonthLabels

Overall I'd like this type of thing gone as it presumes setting names - change them over to become arguments.

Have done getMonthLabels and getDateLabel; getPeriodDayTicks is a bit more work though.
There are three ticks are currently constructed out of clock parameters
* weekday
* weekend
* first-of-month

Have also updated the getBody and getFace methods.

Also need to do `getHands`. Done.

That's all the direct reads of `this.` properties that I can find right now.
All the main draw methods are properly parameterised now afaict.


Cleanup setup script
--------------------

All the themes are roughly in shape and working as before.

A while back I quickly put together a rough replacement for the old setup callbacks to work with the new class arrangement.
I want to revisit this now and clean up the old code.

* The three old callbacks can go
* The old global 'theme' object can probably go too

Actually the theme object is still used a bit, but that will need to be re-jigged.
There shouldn't be a page-global theme anymore, but there could be starting values attached to the page.

So I'll create a page object (maybe a class?) for storing some of this sort of stuff.

* Values for default, url parameter and initial computed arguments are now stored in the page object
* cleaned up logic for those so now clearer and more consistent
* Have moved an old config.monthNames reference out to date/l10n
* reusable element references now stored in page object
* reorganised draw clock clock parameters - prob want to correct the arg spread though



Small silent failure
--------------------

There was a small silent failure in the debug theme:

	${this.getFace(this.clockRadius)}

In this particular case the clock radius hadn't been set - but rather than failing an `undefined` was passed through.
Not a big problem, but also I barely noticed it because the effect was small.
I'd really rather get errors for cases like this.


Playing with multiple draw
--------------------------
This has a few more pieces needed to be properly ready, but I want to start playing with it to see where it's at.

With a little forcing I should be able to draw multiple clocks into the page now, though styles are going be broken as they're currently reused.

```js
let testClock = {
	id          : 'test',
	container   : document.getElementById('clockContainer2'),
	date        : new Date('2011-11-11'),
	theme       : 'brice',
	style       : 'dark',
	language    : page.initial.language,
};
drawClock(testClock);
```

Yep it works and yep it breaks the styles.
Okay cool.
The [long diversion into style encapsulation](<multiple clocks in document.md>) suggests I won't be able to properly fix this anytime soon, but still have an idea or two that might help a bit.


Clock instance mutators
-----------------------

Getting pretty close to wrapping this - want to take a little thought diversion before I close.

Towards the end of the [refactor config global](<[done]/21 - refactor config global.md>) task (which strongly motivated this task) I'd speculated about clock mutator methods that could in some way work on a clock instance:

	fooClock.setDate('2001-01-01')
	fooClock.setTheme('example')
	fooClock.setStyle('daytime')
	fooClock.setLanguage('latin')

Whilst not strictly in-scope for this task, conversion to classes lends itself to the mutator idea so I want to have a bit of a think about how they could work.

At the moment all other than setStyle would require a full clock redraw.

### setStyle

This just requires changing the href of the clock instance's style link.
This should pretty much *just work* if the style exists so I could implement this now.
I'd like to move the `<link rel="stylesheet" ... >` elements to become part of the drawClock process though.

### setLanguage

Would currently require a full clock redraw.
The *might* be ways of rewriting particular text and title elements with clever use of document selectors, but not sure it would be worth it.
Would be a trade off depending on the complexity of what's already been drawn, and how much needs to change.

### setDate

For a complete date change a full redraw would be pretty much mandatory - there's little to be gained from just keeping the clock body (though you could do it).

However... (dramatic pause)

An in-year date change could be quite interesting, and possibly quite cool.
Most of the clock face stays the same - only the hands, highlights and perhaps a few labels would need to be updated.
Even better if you could animate the changes.

I'd speculated about this one in [add interactivity](<add interactivity.md>) but now in a better spot to consider it.


### setTheme

At the furthest end of the scale, setTheme would currently require a total teardown of the existing clock instance, only retaining the date, style and language.
So you'd really need to call `drawClock(clockConfig)` again but keep a few parameters.

If in some fanciful future the theme was a property of the clock instance, using composition rather than inheritance, you might be able to change it and do a redraw.
But not anytime soon.
