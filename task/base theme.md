Base theme
==========

Want to go with the idea of having base themes for themes.

It will probably work like this:

* Each theme can declare a base theme that will be loaded first
* The theme then adds any additional styles/features and overrides
* Optionally define a subtheme, probably stylesheet-only

I'll also hardcode a default theme that will be loaded when none is specified.


Script overrides
----------------
Overriding CSS is simple, not sure about js values/functions, better test that.
Done, it's completely straightforward - functions, variables etc get overwritten in the sequence of ordinary program flow.
So it will work fine for what I want here.

Will set up themes to be able to declare a base theme, and add subthemes so i can put the original back together in one folder.


