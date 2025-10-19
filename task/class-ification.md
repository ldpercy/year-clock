Class-ification
===============

Reorganise more stuff into classes.
Lots to do here, and some of this will be ongoing rather than a self contained task.

```
2025-10-19		New Task
```

Ideas
-----

After doing the conversion to html app I have more ideas about ways to better organise things.
And there are some things I can definitely take from what I've done in Turtle.

* The display date and related methods could be moved to YearClock class
* SVG should be turned into a library similar to the one in Turtle
* The 'utility' methods could be moved to the year clock app/html app
* Maths/geometry reorganised to something like what I have in Turtle, but fix the coordinates to SVG-polar-up-clockwise

Not sure yet what to do with all the date functions - some will find a home elsewhere, but some look like they could belong to an ordinary js Date instance.
Need to find out what's considered good practise for things like that - is it okay to embellish built in JS functions/objects/classes, or is it better to define derivatives with the needed extras?

The ThemeBase will also be ripe for reorganising into smaller classes.
I could probably have large chunks of it as a library in the YearClock namespace, and the actual inherited portion could be fairly small.


Out of everything, the maths and date scripts are going to be hardest work as they're the biggest and messiest.


