Point to middle of period
=========================

Currently the year hand points to the *start* of the date being indicated, for example on 1st Jan it points exactly verically.

For time which is continuous generally I'd prefer hands point to the middle of indicated periods.

For Jan 1 then the hand should point slightly to the right of vertical.



Base styles and inheritance
---------------------------

I (slightly foolishly) set a few styles for the common-original theme so it would at least show something when loaded.
And ended up in a slight specificity mess.
I think I'll need to add an option or two for what from the base to inherit, mainly whether to include it's stylesheet or not.
In general this inheritance business is getting a bit tricky, even with with just one common theme.
It's no wonder people started to go off it in OO and move towards composition.
Will have a think about what's the best approach here, but will be a different task.


Back to the pointer
-------------------

The day/date setup still irks me bit, i've some more info to it but I'm tempted to refactor it (somehow).

Basically have added some more basic info like the total days in the year, plus day numbers for each day in the array.
Can now use the general divisionDegrees fn for thing like this.

The thought occurs that months aren't equal divisions of the year, so shouldn't accidentally use it for 12-divisions.
Unless I do something real weird like allow for equal month spacing, but I think that would be horrible.


Divisions in general
--------------------

The brice clock uses markers for divisions *between* days, and the month sectors cover the entire period.

In general you could either either strategy however you wanted to achieve different effects.
Eg instead of day division markers you could have solid little blocks for each day.
If the css was friendly you could use nth-of-type to provide appropriate markers at alternates/weeks etc.

Something to try, but for now done here.


Wrapup
------

* The base theme thing is going to be fragile, need to sort out a solution or two, have added a new task
* Have added more info for the day/date setup
* Added fn divisionDegrees to calculate angular spacings for things around the clock face.
* The year hand now points to the middle of the display date

