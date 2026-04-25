Custom backgrounds
==================

```
2025-07-01		1.2.0	Done
```

While playing around with the the vintage clock I'd started creating a wallpaper-style background, and it seems like I can make and customise the backgrounds generally.

So will create a few backgrounbds and see if they can become a page parameter, plus set defaults for certain themes.

Eg as a page style:
```css
	html {
		background-color: darkblue;
		background-image: url(background/star.svg);
		background-size: 5vw;
	}
```


Background element
------------------
Backgrounds like this could be applied at a few different places depending on circumstances:
* html
* body
* clock container
* svg


Scripted backgrounds
--------------------
Created an SVG that displays a random character from a set when loaded - the idea was to have a background made up of random 'space' emojis.
Unfortaunately didn't work.
I presume there's no DOM/script access given to things loaded by `background-image`.


Background priority
-------------------

So far all the themes have just had some rules in their stylesheets to set background colours.
With custom backgrounds I have to decide where the background styles live, and what their priority is.

A simple solution that I'll probably start with will be to add a separate stylesheet link to the page that can be changed on the fly.
Background styles and graphics can go into the background folder for now.
I'll place the background style link *after* the theme styles so they can override the stock theme backgrounds.
Will have to be vigilant about *only* allowing background styles in there though.


I've started with a very basic URL param to switch the background.
Things to sort out:
* Need to normalise all the backgrounds to the same element - currently the themes mostly use the svg element to apply their backgrounds
* Really need to decide whether the background is a page or clock property - either could be justified for different reasons, but it changes what gets redrawn and how, and how the form is constructed
* I would like to remove/change the old year-clock footer - don't like the scroll reveal much, and it effects the background choices.

Page or clock
-------------
I think this is going to have to be **clock** to be consistent.
Whether that mean the svg itself, or a clock container element, not sure yet.
I'll start with the svg element, but I'm not sure whether the css `background-` properties really properly belong there (even though they work).
But not the page html or body elements - too presumptuous.

To apply backgrounds to the clock SVG I'll use a `svg.yearclock` class for now.


Remove svg#clock
----------------
These have been hanging around for far too long and causing specificity problems.
Time to clear them all out.
Eventually I think I'll go towards something like this:

```css
svg.themeName {
	/* theme rules */
}
```

But for now just replacing all the id selectors with the class selector `svg.yearclock`.


HTML+SVG notes
--------------

Should probably move some of this to the wiki and/or the html-experiment project to test more rigourously.
I haven't done any really *basic* testing of html+svg in ages, but have noticed a few things while I'm messing around with this stuff:

* SVG elements seem to naturally expand to fill their html container elements (without any other hard sizes specified)
* SVG elements have a natural `display` of `inline`, but seem to behave more like block elements
* Padding on an SVG element applies to the **viewbox**. The background and borders are still expanded to the container, but the drawing space can be shrunk in with padding.
* Margins apply as per a regular html block element


Background Priority
-------------------

I'm going to try making the background a part of the clock SVG but also overridable in the UI.
I've been to-ing and fro-ing about this for a while, but will just implement something and reevaluate it later.

For this to work how I think I want it to I'll need to take the form change event and tweak the update a bit based on what's changed - hopefully this will work.

There are a few useful properties passed through in the event object - I think the one I want is `event.target` which references the actual element that changed afaict.

* `event.target` - The element that triggered the event (the actual form inputs in this case)
* `event.srcElement` - DEPRECATED alias for event.target
* `event.currentTarget` - The element the event handler was attached to (the form)

Okay so it's working.
Changes for theme, date, language and style are all doing full redraws, and changing the background just loads the new background stylesheet.
I should be able to switch 'style' to no longer do a full redraw as well.

The form is getting bigger, and there are more inputs planned - will need some new responsive styles.

Style change updated to no longer do full redraw.

Not sure yet where the initial style and background draws should properly go - need to look again after a break.


Actual backgrounds
------------------
Mostly happy so far, a few things will need tidying though.

So far I only have a couple of emoji-based backgrounds for testing that are cute, but would like to add a few different kinds of example backgrounds before I wrap this up.
* A basic wallpaper style or two based on gradients (started doing this for the vintage clock)
* A daytime sky
* Perhaps a more serious take on a night sky
* Something simple/abstract

Could maybe add some of these later, one or two for now will do.


### Firefox & chromium
They disagree about how to render the 'space' background.
I made it in ff using `pre-wrap` - chromium doesn't seem to honour that property in SVG.
Tbh that technique was a bit hackish anyway; will look for an alternative, I think there might be better ways to do align/distribute.
I was going to do a sky theme in a similar way but I'll just comment them both out for now.
There are also complications to do with font selection for emojis in browsers - some glyphs that look fine on my system don't render the same in-browser.


### Text input and select

Want to change both to text inputs with suggestions - I think there's a standard way now.
I've changed these over to text inputs with `datalist`s but the browser implementations are a bit meh - not quite what I'd hoped.
I'll leave them for now but keep an eye out for better options.


Wrapup
------
Going to call this one here - want to move on, anything else will go into other work.

* Added background folder for images and css
* Changed old svg id selectors to use classes instead
* Normalised all backgrounds to SVG element
* Starter backgrounds: star, sunset, dusk
* Changed style and background to use datalist
* Some experimental transitions were added to the lightning and season-out themes
* Updated the form change event to allow different kinds of updates depending on what changes




