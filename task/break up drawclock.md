Break up drawClock function
===========================

As mentioned in allow-for-theming there are a few pieces that the clock could be broken up into:

* body or case - the 'outside' or housing of the clock
* face - might be called the 'dial' or 'dial plate' in some contexts eg watches
* season/month/day/other markers - part of the face/dial, but could be treated separately
* year/date/other text
* hands & other pointers

So the first thing to do is probably just put each of those in their own functions, and have drawClock call them in the desired sequence.

I'd like to allow for base-theme inheritance here, so I think they'll need to be accessible in the 'theme' scope somewhere.



