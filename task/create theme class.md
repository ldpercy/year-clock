Create theme class
==================

Themes are currently just properties and functions that get loaded into a global `theme` object.

I'd like to try some more structured approaches so that I can load multiple themes at once.

This idea is to create theme classes, out of which individual clock instances can be created and instantiated on the page.

This one is tentative as I'm not sure it's the necessarily the best approach, but I'd like to try it to see how it pans out.


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


Ordinary Stylesheets/CSS
------------------------
Before i go into more technical solutions, can any of what I want be done with regular CSS features?
For example you could enforce that themes prefix all their style rules with certain kinds of selectors so that their effect was contained.

eg
```css
#themeInstance  selector { ... }	/* select a specific clock instance on the page */
.themeName      selector { ... }	/* select all instances of 'themeName' clocks on the page */
```

Either of these could be done, but you'd probably need to write the whole stylesheet like this, which would get tedious - to be able to do it at least a bit dynamically would help.

There's also nested style rules that i think got added a few years back - should brush up on those:

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting

So with that you could perhaps build a dynamic stylesheet that targets a single element with something like this:

```js
	const myTheme.css = `
		svg.clock { blah }
		.sector { blah}
		etc... `;

	const styleTag = `
	<style>
		#myInstance {
			${myTheme.css}
		}
	</style>`;
```

I think that, or something like it, could work. It would have to be written into the page along with the svg tag.

I've tried that with a really simple html experiment and it looks like it could in principle work.

Although I'm not yet sure how CSS vars would work in a setup like this yet.
I've made some use of vars as globals like this:

```css
	:root {
		--background: seashell;
		--clockface: white;
		...etc....
	}
```

But I think that would probably have to change in a multi-instance situation as `:root` could well be global to whole the document.
Some sort of use of `&` could be useful here perhaps?

There might be other options that aren't terribly onerous, for example you could require something like this (somewhere within the clock class):

```js
	theme.css = `
		svg {
			--background: seashell;
			--clockface: white;
			/* ... rest of css ... */
		}
	`;
```

So that when it gets written it comes out like this:

```html
<style>
	#myInstance svg {
		--background: seashell;
		--clockface: white;
		/* ... rest of css ... */
	}
</style>
```

I'm not 100% sure that something like this is *necessary*, but it might make things a bit clearer.
Will see.



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
* 1 abstract base theme class (interface for theme)
* 1 concrete base theme class (Common)
* Any number of actual theme classes inheriting from Common

At the very least the abstract base class will be part of the core scripts.
In two minds at this point about whether the 'common' class belongs there as well.

### Theme classes can probably be loaded at page load or dynamically as requested
It won't matter too much either way I don't think.

...
So that's probably enough to start on *something*.
It won't be great, but better to start somewhere...
