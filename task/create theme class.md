Create theme class
==================

Themes are currently just properties and functions that get loaded into a global `theme` object.

I'd like to try some more structured approaches so that I can load multiple themes at once.

This idea is to create theme classes, out of which individual clock instances can be created and instantiated on the page.

This one is tentative as I'm not sure it's the necessarily the best approach, but I'd like to try it to see how it pans out.


Starting ideas
--------------

Not really familiar yet with how JS classes work, but in fairly trad OO you'd do something like this:

* Create `Theme` as an abstract base class from which all other themes inherit. It declares the core methods to be implemented such as 'drawClock'.
* The current 'common' theme becomes a concrete base class (eg Common extends Theme)
* The other themes extend the 'Common' theme (eg Lightning extends Common)
* Other common/base classes for themes are (theoretically) available
* Composition as well, if inheritance proves problematic
* Actual clocks drawn onto the page will be instances of the concrete classes

### Abstract base classes (and interfaces)
Doesn't look like abstract classes are a built-in feature in JavaScript, but can be simulated:
https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript#48428063
https://medium.com/@rheedhar/abstract-classes-in-javascript-d6510afac958

As the base 'Theme' class would normally be abstract some of those protections could be applied.

While on this no interfaces either:
https://stackoverflow.com/questions/3710275/does-javascript-have-the-interface-type-such-as-javas-interface

But a couple of neat tricks in that post to facilitate duck-typing.


What happens to the loading sequence?
-------------------------------------

Like this the whole loading sequence could potentially disappear....
(Or significant parts of it...)

The loading sequence was built to bring the relevant theme scripts into the document using old-school script tags.

In theory you could have all of the (common) themes sitting in a single library that just needs to be loaded once and wait for any instances to be instantiated.
No need to do any of the complicated callback stuff, as all base/inheritance/overrides are taken care of by class inheritance.

Some dynamic load of styles still probably required though for now at least.

This could really clean up a *lot* of code.



