Month Hand
==========

So far I've really just been refactoring the original clock, the only properly new feature is theming.

A month hand, analogous to the minute hand on a clock, would be a good new addition.

Apart from making it look more like an actual clock, a month hand would bring some neat properties as the relative alignment of the hands indicate moon phases:

* Full moons occur when the hands are aligned
* New moons are when the hands are opposed
* First and last quarter are when the hands are at 90 degrees

Alignment and opposition also correspond to the possibility of eclipses: lunar eclipses happen when the moon is full, and solar eclipses occur at new moon.

So it would be a cool feature.

**Edit:** It depends on the type of month being displayed:

https://en.wikipedia.org/wiki/Lunar_month#Types

A month hand based on regular calendar months probably won't show the above relationships, or they'll drift in and out of sync in roughly a 12:13 ratio.
A lunar month hand of the right type is what you'd need.
I'll fill in the details as I work it out.


Design
------

Just a few thoughts before I start.

On a traditional clock/watch the hour hand is shorter than the minute hand as you only rely on it for its *general* position - ie near a number or between two numbers.
The rest of the information comes from the minute hand to provide more precise information.

So, by analogy, the hands of a year clock should be like so:

* The year hand is shorter and gives you the general idea of what month you're in
* The month hand is longer and points to where you are in the month

So simple enough.
There are a few layout considerations too.

A regular clock is fortunate to  have very one of it's large divisions (12 hours) split up into an equal number of small divisions (60 minutes).
So the clock face itself (markings etc) is completely static for it's lifetime.

The year clock's face doesn't have that privilege, and will have to change depending on year and month.
And the year and month marking won't line up nicely so I'll need a design that'll work and not look too ugly.

Won't know until I try I think.
For starters I think I'll take cues from a pretty traditional analog face and put the day ticks around the edge, and put larger month markers closer in.

This will be a whole new design.


Traditional analog clock face
-----------------------------

The new theme is called 'traditional'.


Quick update - firefox weirdness
--------------------------------
Done lots of stuff, chasing around bugs and not-very-succcesfully refactoring the date code.

But last night got the month hand working, and it sort of looks okay.

This morning I've been trying to clean things up a bit, but the date code is still really unsatisfactory.

A different issue has cropped up - for some as yet unexplained reason I'm getting seemingly UTC values out of Date.getDate() in firefox.

But only in *some* circumstances.

```javascript
	console.log('-----');
	var nd = new Date();
	console.log(nd);
	gd = nd.getDate();
	console.log(gd);
```
In new tabs and in a new profile it's correct.
In any loaded page in my ordinary profile it's wrong.
It only turns up before 11am (utc new day) which might be why I hadn't noticed it before.

It must a plugin or setting i have on my regular ff profile.
Will try to find.






