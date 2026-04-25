Test Page
=========

Would like to set up a test page where i can embed two (or more) instances of year clocks so I can reload once to see changes/breakages.

A far cry from proper tdd-style testing, but it might help and improve things along the way.

A relatively simple first approach would be to embed the whole clock page with iframes.
That would sidestep all the globals related problems.

More sophisticated, but a *lot* more work, would be drawing different clock instances directly into the same page.
This would require some major reworking, but would clean up a lot of code in the process.


iframe version
--------------
Done, v.quick and easy.
Will use this for a while and just add features as i go:

* customise parameters wholesale or individually
* change parameters live
* draw iframes per json/other config
* ...
