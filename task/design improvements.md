Design improvements
===================

I knocked the wall-clock theme together pretty quickly while adding the month hand, and it looks okay as a basic clock replica.

But from a readability perspective I think it could be improved.

The presentation of a regular clock is well known and once learned, can be read at a glance.

The year clock is different though.
There's no established layout for it, and quick reading isn't necessarily a main goal.
And closely emulating a traditional face might actually be a bit more confusing initially.
So I think finding new presentation styles, ones that are different from normal clocks and watches is probably justified.
For example adding reading shortcuts like day names and numbers would probably help.

Also the relative lengths of the hands, the placements of year, month and day markers could all be re-imagined.

So I'm going to experiment with different designs and see what works.

It's also worth noting that I think the original Brice design is pretty effective and easy to read.



SVG improvements/optimisations
------------------------------

See also this that I did **not** know could be done, it's pretty cool:

	https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#using_d_as_a_css_property


It would be worth investigating whether a technique like this could be used in conjunction with `use` elements to allow styling certain items purely in css.
Tick marks for days would be a good candidate for experimentation as it would mean you could move some lengths out of the config.

