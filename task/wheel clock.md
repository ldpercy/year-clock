Wheel clock
===========

I've been itching to continue revamping the old 'plain-svg' theme - I'd had ideas about transparency/translucency and using clip/mask for knocking out the text.

But think I've got an idea that could finally give it a new name - turn it into a rotating wheel instead of a static clock face with a pointer.

I did a little version of this kind of thing for temperature gauge on the car dashboard.
Going to do the same thing for the whole clock this time.


Knock out
---------

Getting the wheel to rotate wasn't hard.

Have been wanting knockout effects for ages and think I've finally got an example working over in the svg experiment project, so going to try that next for the month sectors.

The problem is that the knockout mask has to include the shape that you want to apply the knockout to, so in this instance I probably can't separate the sectors and labels (as has been the case for everything so far).

Something's not working - need to simplify a bit and build it up.
No hole-in-one for this one unfortunately.

Have a simpler version going just for the year label.

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/mask

Have something working now with a basic `text` element.
Not sure if there was a problem with the textPath version, will keep trying to get it working.
If I can only get it working for `text` will shift the design to something a bit different that doesn't require the curved text - thinking either roman numerals, or maybe something based on polygons/stars.

Okay turns out you *can* use a `textPath` as part of a mask, but I was doing in incorrectly.
The `textPath` element has to be inside a `text` element or it doesn't work.
This is true for `textPath`s in general, not just in this masking case.

Still need to settle on a general idea for this theme though.


Theme ideas
-----------

This one wasn't supposed to be anything in particular, just more sort of a conceptual wheels in space type of idea.
Maybe a dyson ring or something like that.

Background was going to be similar to to the dusk one, maybe with the sun at the top or bottom - think I might try a few different things.
Was also thinking about making the rings non-concentric perhaps to hint more at a lunar-cycle type of idea (without going into it technically).
There are tons of things that could be tried.

Had a quick go at a not-really-a-wheel idea, with a 'moon' marking the first of the month (plus some really budget diffraction spikes).
It looks okay-ish and marks the first out fairly well, but it's totally misleading in terms of lunar cycles.
Thing is I kinda like it anyway, and it *could* do for now. Maybe.
I'm going to do a proper lunar cycle clock at some point and would probably use a presentation something like this, so maybe I should back away from this one for now and save it for a proper lunar clock.
Alternatively I could just jump on it now.
Need to think about what features/presentation I want for the lunar clock and whether it belongs here, or is there space for the wheel theme first.


I've stumbled onto a fisheye version of the dusk background while toying with radial-gradient.
It suggests pretty strongly of an observer standing on the ground looking up into the night sky, so I think I want this for the eventual lunar/solar clock.
And some of the other features currently drawn:
* sun in center
* year-month ring
* either offset the sun *or* the year-month ring to suggest the seasonal distance from the sun
* could even hint at the height of the sun in the sky
* draw moon's apparent 'circular' travel (+ figure out a way to make lunar phases make sense)
* maybe use the diffraction spikes for pointers

There's enough there to make the new [task](<solar clock.md>).
I've copied the current state of 'wheel' over to a new solar theme as a starting point.

From here I'll take the wheel theme in a different direction.


Wheel theme
-----------

The main ideas i want to explore here:
* Rotating year+month rings - the current date becomes a static position
* Knockout, translucent and *simple* filter effects


Trying out a different non-concentric arrangement that puts the current date in a sort-of readable group to the left.
It looks interesting in an abstract or mechanical way, but doesn't really have much intuitive value.
Also, in this arrangement it seems fairly arbitrary whether the rings rotate clockwise or counter-clockwise - either could be done, and as they're not really analogies for anything either could make sense within a way of thinking.
Toothed cogs or gears might make sense, and I'd thought about that a while back, but don't think I want to for this one now.
Plus, prob quite tricky.
Currently they're rotating counter-clockwise.

Given that this theme is meant to be a bit abstract, I might stick with this for a while.
On the downside it doesn't look that *good* right now though, the sector borders are jaggy - have started to mess around with filters as well but it's a bit laborious.

Next
----

There are a few things I'll need soon for both this and solar.
* Grouping the config & rendering code for sectors and labels into 'rings'
* The ability to reverse the rendering direction of said rings


Groups sectors and labels into Rings
------------------------------------
I've been wondering about this for a little while.
Whilst not always the case, in lots of places the sectors and labels share related details such as radius.
In the case of the label knockout i'm experimenting with for the wheel theme the details **have** to be shared because of the way that the knockout works.
In other cases it might be useful to have the sectors and labels pre-grouped, or allow for other kinds of groupings.
I also need to be able to reverse the time-progression direction for the solar theme so in that case also it makes sense to have the sector and label config grouped.

I've started grouping some config for the new themes like this, which is indicative of where I'm heading:
```js
	monthSector = {
		annulus : new Annulus(1150,950),
		label : {
			radius         : 1050,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
		}
	};
```
But I'll probably rename it slightly, something like:

```js
	monthRing = {
		sector : new Annulus(...),
		label : { ... }
	};
```
I won't necessarily change everything over to this yet, just have it as another way of grouping things.


Diversion - pseudo-constructor, constructors, and super
-------------------------------------------------------

A construct that i'd like has problems:
```js
	monthRing = {
		name    : 'yearMonth',
		array   : this.displayDate.monthArray,		// can't do this - displayDate isn't set yet
		sector  : new Annulus(1150,950),
		label   : {
			radius         : 1050,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
		}
	};
```

The pseudo-constructor area is evaluated prior to the constructor being run, so while you can reference other things defined in the pseudo-constructor, you can't rely on anything coming from the actual constructor method.
What's the best thing to do here...?

I quite like the compact definition, perhaps it's best to leave it as a placeholder and set it at constructor time.

There are other 'setup' items I'm currently doing in the `getThemeSVG` methods that also should probably be moved to constructor time.

I need to sort out a cleanish way of doing subclass super calls though, preferably with a contained parameter class or some kind [destructuring](../../experiment-html/javascript/javascript.md).
I don't want to run around modifying loads of function signatures every time I change the clock parameters.

### Wholesale clock parameters

This is a bit of an experiment, and I'm either making or cleaning up a mess.

Want to try just setting the clock parameters wholesale onto the instance rather than individually.

```js
constructor(parameter) {
	this.parameter = parameter;
	this.displayDate = createDisplayDate(parameter.date, parameter.language);
}
```


Using 'this' instead of arguments
---------------------------------

Also going to take out displayDate as a parameter to getClockSVG and instead set it at construction time.
It feels less asymmetric like this, but still unsure.

I also have a nebulous cloud of concern regarding OO/Functional/Impure/Pure function/method calls.
This is a core philosophical question - I think as long as I'm clear and consistent things shouldn't be too bad.

Principles:
* things that are fairly constant for the lifetime of the instance -ie most clock parameters - can be assumed, don't need to be passed as a method parameters
* things that are variable within the context of the instance need to be proper arguments.

Thing is, if I'm at all serious about those then really quite a lot of other clock method arguments should probably be taken out as well.
Everything in the pseudo-constructor/config category is more or less static for the instance and can be assumed, so they'd all be candidates.
I've had other thoughts about those in general, but still have a funny feeling that some could be parametrised sometimes.
Going to sit on this one for a bit.

A maybe possible counter example...?
I've just gone through and removed displayDate as a parameter for getDateLabel, working on the assumption (as per above) that it's reasonably static for the lifetime of the instance.
What if I want that method, but I need to put a different date in - say I need to display a year range or next year or something?
In that case I'd need a new version of the method that does take a date as a parameter, or I'd need to undo everything i've just done.

I feel like it's going to be a bit of to-and-fro here depending on needs.
Same goes with the theme 'config'.
*Generally* clock parameters and theme config will be static and can probably be assumed, and as such *mostly* shouldn't need to be passed around as parameters.
But there might be contrary cases to keep an eye out for.
This is also assuming (for now) that instances are fairly immutable once constructed, which may not be case in a more optimised future (don't tear-down, update).

Another thought - if I convert the current ThemeBase class to become something like a library or service object (composition) then complete arguments (purity) will need to be reinstated, eg getDateLabel will need a date as a parameter again.
I have wondered sometimes if the themebase should be broken up into separate objects for parts like labels, sectors, hands etc.
This isn't on the cards at the moment, but might be in future.


I should note that a while back I actually went through and pulled *out* a bunch of `this` references from the ThemeBase to improve purity - now I'm re-allowing them - need to be careful.
Currently the only things that I can fairly widely reference with `this` are:
* this.parameter
* this.displayDate
* this.viewBox
The above can be assumed/referenced in the themebase.
Most other things are specific to the themes, and can perhaps be assumed in each contained environment.


Back to constructors and ring config
------------------------------------

The impetus for the above was to clear up how I want to define clock rings, and what to do when core theme config depends on clock parameters.
Now I have something like this:

```js
	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector  : new Annulus(1150,950),
		label   : {
			radius         : 1050,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
		}
	};

	constructor(clockParameter)
	{
		super(clockParameter);
		this.monthRing.array = this.displayDate.monthArray;
		this.dayRing.array   = this.displayDate.monthDayArray;
	}

```

I have the compact ring definition that I want, and make sure that the construction-specific vars are set.
Looks okay I *think*.
Hmmm.
Now I'm second guessing.
Ugh. I'll run with it for a bit and see if it does what I needed it to do for different kinds of rings.
It might end up cleaner to specify the array separately.


Design again
------------
Still messing around with design ideas for this one - nothing is really grabbing me yet.

### Funky sawtooth bug
Currently messing around with using straight sides for sectors using the old 'simple' idea.
In the past I'd come up with some interesting mechanical-looking effects by having one side round and the other curved, but never actually used them yet.
In the process I've hit upon a bug that draws the sectors kind of like sawtooth waves and it looks kind of funky - would be nice to have weird effects like these as options as well.

### Roman Numerals
I've put in roman numerals for the rings - I thought it would look interesting.
But they have readability issues - obvious I guess, it is a stylistic choice after all - but especially on the rings for things IX and XI, and left and right orientations.
And in some cases they just kind of look not good - annoying to the eye, hard to grok.
Things like relatively static positions (year) and month numbers aren't too bad, but generally I think it will help to make the reading orientation quickly understandable.

### Spacey theme

The current 'spacey' idea for this theme isn't really gelling with roman numerals either.
I'd imagined something stone-like that I'd thought *might* be interesting, but would probably require some filters, and could easily become pretty naff.
I do still want some kind of translucent wheel in space sort of thing somehow, but not like this.
So do I pivot again, or wind it back to something more like the original idea?
The other idea I had while tinkering with roman numerals was something completely different stylistically, some kind of ancient bronze clock set into sandstone - something more conceivably 'roman'.
Again I'd probably need to be more on top of filters to have a decent chance at that, and I'd want a knockout+shadow effect which I haven't achieved yet.

I might wind it back.

### The original idea...

Originally this was supposed to be a bit of revamp of the old plain-svg theme, which itself was just a tweaked version of brice.
I had started making things transparent which looked kinda cool.
I think things might have gotten out of hand when I made both rings rotate indepedendently.
I might save that for the solar theme, and just try a single rotating disc for this one and have the month-days highlight in some other way.

I'm going to ditch the asymmetric thing I've been using here as well.
There's definitely space for it somewhere, but not for this theme.
I'm tempted to stash the current version or copy it away somewhere though - if I wind this a long way back and squash merge it's going to be unrecoverable if i want to look at it later on.

This current version of wheel would be better off as an abstract space/alien theme, incorporating some of the base-n experiments that I've been tinkering with.
So yeah, will just just copy the current state and try to get back to the original, simpler, wheel idea.


Back to the wheel
-----------------

Here we go again.

First thing, I think I've broken the season switch for some of the themes.
Ah the changeover to a bulk clock parameter had a few missing updates - sorted.


### Wind back

Have wound this back to something a bit more along the lines of the original idea.
Now to consolidate out the idea and polish it.

One thing I'd quite like to try is figuring out rounding/padding for the sector shapes.
