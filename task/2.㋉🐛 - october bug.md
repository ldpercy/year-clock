October bug
===========


Probably a counting/off-by-one error of some sort.

```
2025-11-24		Open	㋉🐛
```

Only just noticed this, am still investigating.
Appears to be an error in month-day angle calculation putting the hands in wrong spot, but seemingly only in October???

*	index.html?test=true&theme=vintage&date=2006-10-13


Affected that I can see easily:
* vintage
* car-dashboard
* wall-clock

Wheel, solar and space are probably similarly affected, but a little harder to spot on those.

