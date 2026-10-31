Clock Overview
==============

The clock is broadly divided into the following parts, roughly in order of drawing:

* Background or wall - the backdrop onto which all subsequent clock parts are drawn. Usually a flat/muted colour.
* Clock body - cosmetic-only border around the main clock drawing area
* Clock face drawing area - this is where any actual parts/sectors/divisions are drawn. It has dimensions of 2400x2400 (1200 radius).
* Division markers and labels for months, days etc
* Additional date markers for the current display date, eg year
* Clock hands


Dimensions
----------

The clock face's dimensions of 2400x2400 are the primary fixed constraint, all other dimensions are subsidiary to that.

2400 was chosen for being highly composite and making divisions and maths easy.

### Clock center

The centre of the clock is at `(0,0)` in the SVG grid space, the quadrants are standard SVG:

```
         │
         │
 (-x,-y) │ (+x,-y)
         │
─────────┼─────────
         │
 (-x,+y) │ (+x,+y)
         │
         │
```

### SVG viewbox

By default the SVG viewBox used is:

	viewBox="-1200 -1200 2400 2400"

Clocks without any body or external decorations such as the original Brice theme will use that viewbox.

Adding things like a clock body/shadows etc requires pushing the viewbox out.
That can be set manually, or alternatively a convenience function `padViewBox()` is available to quickly add a fixed amount of padding around the standard viewBox.

### Angular Dimensions

Angles start at 0 in the 12 O'clock position and increase in the clockwise direction:

```
            0°,0π,2π
                │
                │
                │
270°,3π/2 ──────┼───── 90°,π/2
                │
                │
                │
             180°,π
```


