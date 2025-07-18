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


Opt in
------

I'd like to be able to manually opt in/out of any testing features I add.
I initially thought about switching it on based on protocol (on for file://) but even that's prob too much.
Just turn it on with a URL flag when needed.




Wrapup
------
I've run ahead and have some basic opt-in smoke testing going, which is what I wanted.

* Add a `test` url param to turn on testing
* Test for the presence of certain *problem* strings in the output: NaN, Infinity, undefined, null
* If present count them up and show in output
* Add styles for quick error indicators
* Fix some `undefined`s that were found
