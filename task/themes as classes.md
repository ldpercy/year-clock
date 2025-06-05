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



