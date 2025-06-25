Custom backgrounds
==================

While playing around with the the vintage clock I'd started creating a wallpaper-style background, and it seems like I can make and customise the backgrounds generally.

So will create a few backgrounbds and see if they can become a page parameter, plus set defaults for certain themes.

Eg as a page style:
```css
	html {
		background-color: darkblue;
		background-image: url(background/star.svg);
		background-size: 5vw;
	}
```


Background element
------------------
Backgrounds like this could be applied at a few different places depending on circumstances:
* html
* body
* clock container
* svg

Scripted backgrounds
--------------------
Created an SVG that displays a random character from a set when loaded - the idea was to have a background made up of random 'space' emojis.
Unfortaunately didn't work.
I presume there's no DOM/script access given to things loaded by `background-image`.




