Dynamic clock drawing
=====================
```
2025-06-19		1.1.0	Done
2025-06-20		1.1.1	Update form and media queries
```

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


Wrapup
------

I've added a bit of basic CSS to make the form look a bit prettier, and a bit of responsiveness for page orientation.
I should change it over to grid -> https://stackoverflow.com/questions/9686538/align-labels-in-form-next-to-input
But I need to brush up on that first.

Far from perfect but enough for now.

* Added html form for updating clock settings
* Added event and handler for redrawing clock on form change


**Done: 2025-06-19 v1.1.0**


Follow-up
---------

* Update the form presentation and responsiveness

**Done: 2025-06-20 v1.1.1**