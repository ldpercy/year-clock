Year Clock
==========

A bit like a regular analog clock, but instead of the regular 12 hour divisions it has the 12 months of the year.

The 'hour hand' points to the time of year. In the second example the 'minute hand' points to the time of month.

<p align="middle">
	<img src="image/example3.svg" alt="Year clock example 3" width="40%"/>
	<img src="image/example4.svg" alt="Year clock example 4" width="40%" title="yearclock.html?theme=wall-clock&date=2024-02-26"/>
</p>

Click through to the raw for this example to show hovers and tooltips on the day sectors:
<p align="middle">
<img src="image/example5.svg" alt="Year clock example 4" width="50%" title="yearclock.html?theme=season-out&date=2015-10-21"/>
</p>



Prior and current art
---------------------

It's been done many times before.

A notable example is the front face of the [Antikythera mechanism](https://en.wikipedia.org/wiki/Antikythera_mechanism), which is over two thousand years old.

(See also: https://en.wikipedia.org/wiki/Orrery)


More recent examples:

* http://year-clock.net/
* http://www.levitated.net/daily/levCelestes.html, https://forums.tumult.com/t/galileos-celestial-calendar/15896
* https://plandisc.com/en/
* https://circular-calendar.com
* https://www.theroundmethod.com/
* https://mycircularcalendar.com/


Many more examples can be found by searching for things like 'radial calendar' or 'circular calendar'.

### Year Clock by Andy Brice and Ian Brice

* http://andybrice.net/blog/2010/01/30/year-clock/
* https://www.flickr.com/photos/squidthing/albums/72157622655107168/

I've started with code from [http://year-clock.net](http://year-clock.net) to use as a base.

A copy of the original source code is in the [./year-clock.net/](<./year-clock.net/>) directory.


How to run
----------

* Clone the repository
* Open the file `[path to repo]/year-clock/yearclock/yearclock.html` directly in a browser

No webserver is required, it all runs locally.


URL Parameters
--------------

### Date

Set the clock display to a specific date, eg:

	yearclock.html?date=2023-04-05

### Theme

Load a different theme to the default, eg:

	yearclock.html?theme=brice

Theme 'brice' is the original design seen on [year-clock.net](http://year-clock.net).

### Style

Only relevant if the theme includes style variants, eg:

	yearclock.html?theme=brice&style=dark

### Language

A small set of translations were inherited from the original, eg:

	yearclock.html?language=fr


Theming
-------

> [!NOTE]
> Theming work is in progress so subject to change



Themes are in [yearclock/theme/](<./yearclock/theme/>).

Each theme is a directory `yearclock/theme/[themeName]/` with three files:

* config.js	- basic information about the theme, including specifying a 'base' theme
* style.css	- regular stylesheet for the clock
* yearclock.js - contains clock setting and the `drawClock()` function

Optional style variants (specified with the 'style' parameter) are stored as:

* style-[styleVariant].css	- additional css rules for the variant


Tasks
-----

More detail in the [task/](<./task/>) directory.

### Currently working on

* Customisable theming and styling of the clock face
* Remove callbacks from loading sequence
* Dynamic theme loading (no page reload)
* My own clock themes


### Future features

* A lunar-month hand to demonstrate moon phases
* A 'second hand' pointing to the time of day
* Calendar integration
* Live date changes
* Animation for live date changes
* Convert to TypeScript
