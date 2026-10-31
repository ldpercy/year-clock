Serving
=======




File protocol
-------------

At the beginning I developed the year clock without using a web server, just opening the `index.html` file in a browser:

```
	file:///local-path-to-project/year-clock/index.html
```

File protocol is however pretty locked-down in browsers these days (with good reason), and some modern JS features I want don't work under `file`.

So from version 2.0 onwards a server and http will be required.


HTTP
----

I'm currently using python's http server:

```bash
	python3 -m http.server 9001 --bind 127.0.0.1
```


