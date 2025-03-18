Allow For Customisation
=======================

With luck swapping a single directory path will load a different skin for the clock.

Nice to have:
* Provide sensible defaults that can be used as fallbacks
* Allow for custom scripting for extra features
* Custom graphic resources

Not sure if the custom skins should implement the entire drawClock function, or just parts of it.


Thoughts on implementation
--------------------------

Not sure if the custom skins should implement the entire drawClock function, or just parts of it.
It doesn't matter too much, but having fallbacks would probably require the latter.

For instance you could template it out something like:

* clock body/face/background - draw statically
* clock months/seasons/other markers (such as date/year) - draw dynamically
* hands/other pointers - draw dynamically

If the main draw fn finds an implementation in the skin it uses it, otherwise it uses a default.
Also think I might use the term 'theme' instead.
