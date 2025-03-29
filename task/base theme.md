Base theme
==========

Want to go with the idea of having base themes for themes.

It will probably work like this:

* Each theme can declare a base theme that will be loaded first
* The theme then adds any additional styles/features and overrides
* Optionally define a subtheme, probably stylesheet-only

I'll also hardcode a default theme that will be loaded when none is specified.


Script overrides
----------------
Overriding CSS is simple, not sure about js values/functions, better test that.
Done, it's completely straightforward - functions, variables etc get overwritten in the sequence of ordinary program flow.
So it will work fine for what I want here.

Will set up themes to be able to declare a base theme, and add subthemes so i can put the original back together in one folder.


Bootstrap problem
-----------------
There's a bootstrap problem.
We don't know what the base theme is until we've loaded the theme script.

So with the theme I need to get the config first, then load the base, then the theme materials.
So there needs to be a separate theme file to load first.

Also i'm renaming 'subtheme' to 'style'.
It's a tad confusing in a couple of spots, but I think it looks better.
Might look around for other ideas.


Callbacks
---------

At the moment the loading sequence is done with a couple of simple callbacks.
I'd really like to rewrite these with something a bit more modern such as async/await, but unfortunately I'm a bit out-of-my-depth when it comes to writing promise-style code.
That will have to be a separate task.


Base feature load
-----------------

Currently there are only two parts to the theme's `yearclock.js`:

* theme.clockStyle
* theme.drawClock()

They could be split up in various ways, but will start with these.

If a base theme is defined, load it and set clockStyle and drawClock on the theme object.

Next, load the actual theme, and overwrite the theme object with it's theme features.

	https://stackoverflow.com/questions/17972473/merge-two-objects-and-overwrite-the-values-if-conflict

Object.assign or ES6 spread.

Then call drawClock().


Base theme load is working
--------------------------

I've created a very basic test theme that uses `brice` as the base.
Added a few small tweaks and can now switch between the themes showing the edits.

	yearclock.html?theme=new




