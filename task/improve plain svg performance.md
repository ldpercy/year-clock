Improve plain svg performance
=============================

The initial plain svg version is notably slower than the Snap version.
See what can be done to speed it up.

A few thing to try
------------------
There are a few thing to try before I go straight to node creation:

* The month and day construction logic could be improved/optimised a little bit, eg some angles prcomputed
* Could try grouping together the output string and inserting them in one go rather that lots of little append steps - might avoid costly redraws
* round a lot of the numbers to a reasonable number of significant figures
*



