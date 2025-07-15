Simple Testing
==============

So far I've been testing the clocks by running and looking for obvious visible problems or errors in the console.

This has been okay, but JavaScript silently fails for some types of things, like sending through 'undefined' when an object property is missing.
Some of those bugs aren't immediately obvious.

I don't want to go to full-blown tdd/unit testing for this yet, but some types of automated testing might be handy to quickly point out problems.

One that just occurred to me relates to those `undefined`s that I'm bumping into at the moment.
A lot of classnames get generated programmatically, and if the relevant properties are absent I sometimes get things like:

	<path class=" foo-undefined".../>

Which mightn't be obvious on visual inspection as other classes might take over.

A quick and dirty way of finding these would be to look for strings like undefined, null, NaN in the output.


