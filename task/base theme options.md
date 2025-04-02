Base theme options
==================

Declaring a base theme is a quick way to get something running, but as a pattern it suffers from [inheritance fragility](https://en.wikipedia.org/wiki/Fragile_base_class).

Need to have a think about ways to mitigate this.

One quick idea is to specify what parts of the base you want to keep.

Stylesheets would be a first candidate to avoid specificity problems.


Styles
------

Stylesheets shouldn't overall be *too* bad, as long as the svg has sensible structure, classes and ids.
I ran into some specificity problems, but that's probably just programmer error.

Nevertheless it would be useful to be able to switch off base theme styles entirely.
So I'll add that as an option.



yearclock.js
------------

Still not sure about this, there are few way you could go.

At least some of what is currently common-original would be beneficial as a library.

Will sit on it for a bit.



