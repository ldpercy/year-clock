Common styles
=============

Use common styles from html-common.

[ldpercy-workspace task](<../../ldpercy-workspace/task/🖧👚 - common styles.md>)


```
2026-04-29		🖧👚		new task
```

For most of the other apps this task is easy-ish.
But for year clock there are a couple of complications because I haven't added proper light-dark scheming in here yet.
So I might need to do a little extra work here.


### subtasks

* [x] Update app info dialog to common style
* [x] Panel styles from html-common
* [x] Hide scheme switcher for quick release





Themes and schemes
------------------

I've been considering this for a while, and had mooted it for the previous task.

For year clock i need each theme (& style) to define whether it's a light or dark colour scheme.

Light only
* vintage
* season out

Dark only
* wheel
* space
* solar
* car dashboard

Light & dark
* lightning
* brice
* wall clock, though the dark theme is pretty half-arsed


I have thought about making sure each theme has light & dark variants, but it won't make much sense for some, and *way* too much work.

So for now the theme maps what's available.
If there's no light or dark theme, just disable the radio.

### Dark themes & 'styles'
There's also the issue of how I've done the dark themes so far, when present.

They're done as style variants with extra stylesheets.
That means there's a base stylesheet for the theme that's always loaded, but you can specify an additional 'style' stylesheet to be applied.
The idea was that you could tweak some appearance things by just adding some extra rules - at the time i think I was mostly thinking about fairly lightweight stuff like colours, but you could do pretty much anything.
I never really made all that much use of it tbh, there are only two non-dark stylesheets - the mono one i did for season-out (which barely counts), and the nighttime one I did for car-dashboard - it's the only one I actually put any work into.

And of the dark themes, the one for lightning is the only one with any real effort in it.

So what to do...


Ideas
-----

Doing a 'proper' revamp of all this is likely to take a bit of thought, and seeing how close all of the other apps are for this task, I'm inclined to look for a shortcut release here, and return to the scheme issue in detail later.

So how could cut I this off here for a release?

Perhaps the simplest option is to just fix the overall scheme to light for the moment, which is pretty much what yearclock has right now anyway, and hide the scheme switching interface.
Like that we stay more or less in the same place looks-and-functionality-wise, but now using panel (etc)styles from html-common.

That would probably work for a quick release.





