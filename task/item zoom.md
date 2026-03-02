Item zoom
=========


Discovery task for now, should be baked into specific jobs as required.



Some notes from experimentation on the lightning theme.


Adding a hover zoom

	scale: 110%;

In combination with transform properties on sectors:
```
	transform-box:content-box;
	transform-origin:50% 50%;
```
Produces a fairly decent zoom effect.
The sector labels need to be combined though.

