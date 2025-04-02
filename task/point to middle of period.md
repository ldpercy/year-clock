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

