Season circle bugfix
====================

The `current` finder fails for Jan-feb - the wrpped months - need a small fix for this.


Array.find bug
--------------

I added a small bug when converting the season arrays over to use `array.find`

	seasonArray.find( (season) => dateIsInRange(displayDate.object, season.dateRange) ).class = 'current';

This fails for the season circle when the date is in the unwrapped portion of the year ie Jan+Feb.

A few thoughts:
* The 'current' class for season circles isn't actually used anywhere, so I *could* just remove that line
* I think there's a way to short circuit property/method chains now with `?` (unless I'm getting mixed up with a different language)
* To make it work, the circle array needs to include the current date which means having the wrapped season either at the start or end of the year
* A bit more automated testing would have caught this before going to prod


Bugfix
------
The actual fix isn't too bad, just switch on the current date to decide how to wrap the year-crossing season; the 'current' find now works.



