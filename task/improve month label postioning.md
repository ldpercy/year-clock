Improve month label positioning
-------------------------------

Currently the month labels are positioned with transforms that rely on Snap svg for the rotation.
It's the last piece of Snap in the plain svg version (which has [its own problems](<improve plain svg performance.md>)).

There are a few pieces to this and a bit of maths so it needs its own treatment.



