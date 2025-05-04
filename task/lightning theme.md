Lightning theme
===============

This is just a theme variant for a bit of fun.

Instead of using a hand to point to the current date, light up the current sectors for season, month, week and day - might look a little like lightning.

Might change this one to use quarters instead of seasons.

New requirements:
* Quarter array
* week array
* 'current' sector class additions


Quarters and hovers
-------------------

Have the new lightning theme setup, this one using quarters instead of seasons.
Quarters wasn't hard to set up, and i've the sector draw function generic so can be used for them and seasons.

Have added a few more titles, and playing a bit more with hovers.
For the lightning theme I've added hovers on all sectors, and it's quite fun to play with.

There is an effect I'd *like*, but am not sure how it could be implemented.
What I have in mind is that when when hovering over a subpart, eg day, all it's conceptual parent groups would highlight as well.
Problem is they're not strictly grouped as parent-child in terms of actual elements in the markup.
I could try to bucket them all, but that seems like a massively unnecessary overhaul for a minor bit of eye candy.

I did find this though that might be worth looking in to:

	https://stackoverflow.com/a/74816531
	https://developer.mozilla.org/en-US/docs/Web/CSS/:has

Would probably need to add some more classes or data for the selectors to work with i think.
Not big priority though.


Week array
----------

I want to add an extra ring for weeks.

It's around about here that adding some types would really start to come in handy.

https://en.wikipedia.org/wiki/ISO_week_date

Turns out there's a standard week system, and that sometimes the first few days of the year aren't considered part of the *official* week 1:

> If 1 January is on a Monday, Tuesday, Wednesday or Thursday, it is in W01. If it is on a Friday, it is part of W53 of the previous year. If it is on a Saturday, it is part of the last week of the previous year which is numbered W52 in a common year and W53 in a leap year. If it is on a Sunday, it is part of W52 of the previous year.


Not sure what I want to do about that - for my needs I'd rather just have everything start at 1 (or zero) and count up from there incrementing every time a Monday rolls around.

Will sit on it for a bit.

### Start with a basic array

For now I'll start with a basic array and leave ISO week support for a later task.


Have the week ring going now and added a bit of overlap, looking good so far.
Next need a way to highlight the current date, or dates in general.



Date Highlighting
-----------------

For this theme all I really need is to mark the appropriate sectors for the current display date.
So for example you add a class 'current' to the current quarter, month, week and day.

That would probably do for now, but I feel like this tends to hint pretty strongly at general highlighting.

Lightning
---------
I have a basic version of highlighting working for the display date now, so the 'lightning' theme is starting to look as I'd intended.

The generic date highlighting I'd talked about above is it's own topic, with it's own concerns and problems so will defer that to sometime later.

For now I've just managed to squeeze in a few extra classes for the current display date so they can be highlighted.






