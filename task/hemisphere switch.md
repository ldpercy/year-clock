Hemisphere switch
=================

A small feature - the ability to nominate what hemisphere the clock is in so that seasonal features can be customised accordingly.

This crosses over with locale in some ways - for instance if you're in a North American locale like en-CA you can safely assume Northern Hemisphere, but I don't want to map out all of those possibilities, not yet at least.

A simple switch will do for now.


### CSS class

Some parts of it could be done with just an additional CSS class on the clock, for example the month colours used by the Brice theme.

But not a lot more - the seasons need proper adjustments, and currently the seasons are hardcoded to southern hemisphere:

```js
name:      'Spring',
dateStart: new Date(year,8,1),
dateEnd:   new Date(year,11,1),
```

Plus I think some parts of the world use season definitions that are based on celestial events - need to check that out.
