Dynamic clock drawing
=====================

Allow for switching themes on-the-fly without reloading the page.

This *shouldn't* be too hard, as it will just mean re-running the latter parts of the current `setup()` function.


Return to this
--------------

After completing [themes as classes](<[done]/23 - themes as classes.md>) and all the clean up it involved this can now be scripted.
Full clock redraw for now, can basically change all the clock params - style, language, date as well.

Would be quite nice to add some simple UI features to make this super easy.


Well that was quite easy
------------------------

I've added a simple form with inputs for the clock parameters plus a change event, and blammo it works.

Really not hard at all and pretty quick.
I'll probably spend 5x as much time making the form look nice and validating the inputs.

The other thing that is really surprisingly quick is the redraw - once the class and CSS are loaded the redraw is practically instantaneous.
This is especially fun with FireFox's date picker which sends change events for year and month scrolls - spinning through the dates basically animates the clock.
Super cool.

Time to clean it up and ship it.

