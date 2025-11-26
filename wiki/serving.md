Serving
=======




File protocol
-------------

I coded the year clock in the beginning without using a web server, just by opening the `index.html` file in a browser:

```
	file:///local-path-to-project/year-clock/index.html
```

Unfortunately file protocol is pretty locked-down in browsers these days (for good reasons) and there are some modern JS features I wanted that don't work under `file`.

So from version 2.1 onwards a server and http will be required.


HTTP
----

I'm currently using python's http server:

```bash
	python3 -m http.server 9001 --bind 127.0.0.1
```


