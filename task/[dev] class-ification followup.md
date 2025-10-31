Class-ification followup
========================

Follow up jobs from class-ification.

```
2025-10-22		New Task
```

The main work of converting everything into classes is done.
Now, as far as i can tell, there's nothing in the global window namespace anymore, everything is somewhere under `yearclock`, or `ldpercy` for the HTMLApp class.

But for the first pass I avoided a lot of possible refactors, time to start looking at them.
In no particular order:

* Angles should be converted to angle objects like I've done in Turtle
* DegreeDelta and RadianDelta should be combined and renamed to range, as they usually represent concrete angular spaces, not differences
* Bring in a version of the PlanarSpace class from turtle called something like SVGPage with the cartesian and polar coordinates fixed - might want to wait until I have the parameterisation for that working properly first
* Bring in some of the SVG class from turtle for things like rectangles and viewboxes, probably the grids too
* See if more of the common things can be moved to the `ldpercy` namespace
* Create a proper Event class so that custom ones can be built
* Get a proper PeriodArray base class going to consolidate a lot of disparate code
* I have no idea what to do about localisation yet....
* Probably convert some of the static Date methods to instance methods
* Go back to YearClock.js and sort out some of the methods I dumped in there
* What is currently ThemeBase could probably be largely converted to one or more library classes with static methods, or organised into proper classes.
* Convert a lot what are currently class function fields to proper methods
* Have another look at the function eval style used for the hand config (`function : ()=>this.getHand1,`,`yearHandFunc = (handConfig.function) ? handConfig.function() `) - see if I can do this normally now


There's lots more, but that should keep me busy for a little while :-)


Angles
------

Start with something fairly easy.
Though I'm already thinking about the difference between absolute angles and relative angles (actual angular positions vs between arbitrary lines).
Hopefully that can mostly be clarified by naming and context.

### Deltas & ranges
Looks like I named them deltas because they're set up as a starting position and a width.
Not really a delta then, but i get the idea.
The other good things about that arrangement is that it's clear which way the range goes (+/-ve), and can represent rotations greater than 360 degrees.
Sooo... not actually a bad idea at all - go former me.

### Tear it up
I'm gonna seriously tear up a bunch of the old divisionRadians, dateRadians, blahRadians etc code.
Just torch it and rewrite it so it makes sense.

Here we go...
