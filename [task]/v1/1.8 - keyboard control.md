Keyboard control
================

I generally don't like it when websites take over the keyboard or interfere with ordinary browser features.

But i really want to be able to do continuous date addition and subtraction, and I want to do it with the keyboard.

So I need to find out how to do it, and do it in the most unobtrusive way.

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent


Quick hacked in version
-----------------------

I've managed to v.quickly hack in date back/forward control for the `,` and `.` (`<` and `>`) keys.
They're not likely to be used for much and work for the idea well enough.

I've hacked a quick filter to stop the events propagating when those keys are pressed on inputs with ids, but it's a wodge and I need to figure out how to do it properly.

Wrapup
------

Have *very* quickly added in some forward and back date keyboard controls.
They work okay, and don't seem to need debouncing or anything like that.
Need to figure out a better target filter though.


