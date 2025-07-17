Wireframe
=========

A very quick task.

The old 'common' theme really isn't doing anything anymore.
It was originally a base theme that others were built upon, but that role has gone with the changeover to class-themes.
Now it's just the brice theme without colours.

It occurred to me the same effect could be achieved with a style variant, but i'd have to add identical `style-wireframe.css` files to to every theme:
```css
svg.yearclock, svg.yearclock * {
	background: none !important;
	background-color: none !important;
	fill:none !important;
	stroke: black !important;
	stroke-width: 1px !important;
	filter: none !important;
}
```

But I can just add it as a single background file (+option) as they're currently last in the stylesheet stack.

Done.

It's not necessarily the *best* spot for it, but good enough for now.
For instance in future it might be nice to be able to turn wireframe on/off for specific elements that I'm working on.
Will have a think about ways to do that.
Also there are still some transitions visible, but the hovers have gone.
Might want to be able to see those in wireframe sometimes?


I've removed the old common theme as well.


Wrapup
------

* Add 'wireframe' background stylesheet as a global override
* Update index and test html
* Delete old 'common' theme

