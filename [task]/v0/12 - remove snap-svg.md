Remove Snap SVG
===============

I've removed all snap based code from the plain-svg theme.
Would like to port those changes back to the brice theme so I can remove snap entirely from my version of year-clock.

Nothing against Snap, but it's not for me, I'm more comfortable writing SVG directly.




Original styles
---------------
The initial conversion was really easy, mostly just copying back the plain-svg code worked fine.

The only thing I'd missed was that there are two separate lines in the original for the first of each month - a first marker as well as a day marker.
It's only visible on weekend days that are the 1st where the two lines can be seen, but I noticed it, so I've fixed it.
Also some little clock dimension tweaks to better match the original.



Sync yearclock
--------------

I've brought back some of the updates back into plain-svg.

Remove Snap
-----------

Very little left, just remove the library and one last function.



Common clock base
-----------------

Now the only difference between brice and plain-svg are styles and dimensions.

I can create a common base theme for these now so I don't have to keep them in sync.
I've really only been adding bits of polish to the original so far so this will be fine.

Done.

It's starting come together now, and tipping over into more of my own code than original.


Wrapup
------

* Ported new plain SVG code back to the original Brice theme
* Tweaked the brice theme for better reproduction of the original
* Brought some changes back to plain-svg that were needed
* Moved common code from both into a new base theme 'common-original'
* Snap code entirely gone now

