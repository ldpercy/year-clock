Base theme options
==================

Declaring a base theme is a quick way to get something running, but as a pattern it suffers from [inheritance fragility](https://en.wikipedia.org/wiki/Fragile_base_class).

Need to have a think about ways to mitigate this.

One quick idea is to specify what parts of the base you want to keep.

Stylesheets would be a first candidate to avoid specificity problems.

