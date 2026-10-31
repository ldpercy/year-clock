Multiple clocks in document
===========================

Split from [themes as classes](<themes as classes.md>)

I expect quite a lot of the drawing aspects of this will become achievable once themes-as-classes starts taking shape, but the figuring out how to contain the styles for each clock has been a major sidetrack.

I've carved out some of the CSS discussion from that task below:



Ordinary Stylesheets/CSS
------------------------
Before i go into more technical solutions, can any of what I want be done with regular CSS features?
For example you could enforce that themes prefix all their style rules with certain kinds of selectors so that their effect was contained.

eg
```css
#themeInstance  selector { ... }	/* select a specific clock instance on the page */
.themeName      selector { ... }	/* select all instances of 'themeName' clocks on the page */
```

Either of these could be done, but you'd probably need to write the whole stylesheet like this, which would get tedious - to be able to do it at least a bit dynamically would help.

There's also nested style rules that i think got added a few years back - should brush up on those:

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting

So with that you could perhaps build a dynamic stylesheet that targets a single element with something like this:

```js
	const myTheme.css = `
		svg.clock { blah }
		.sector { blah}
		etc... `;

	const styleTag = `
	<style>
		#myInstance {
			${myTheme.css}
		}
	</style>`;
```

I think that, or something like it, could work. It would have to be written into the page along with the svg tag.

I've tried that with a really simple html experiment and it looks like it could in principle work.

Although I'm not yet sure how CSS vars would work in a setup like this yet.
I've made some use of vars as globals like this:

```css
	:root {
		--background: seashell;
		--clockface: white;
		...etc....
	}
```

But I think that would probably have to change in a multi-instance situation as `:root` could well be global to the whole document.
Some sort of use of `&` could be useful here perhaps?

There might be other options that aren't terribly onerous, for example you could require something like this (somewhere within the clock class):

```js
	theme.css = `
		svg.clock {
			--background: seashell;
			--clockface: white;
			/* ... rest of css ... */
		}
	`;
```

So that when it gets written it comes out like this:

```html
<style>
	#myInstance svg.clock {
		--background: seashell;
		--clockface: white;
		/* ... rest of css ... */
	}
</style>
```

I'm not 100% sure that something like this is *necessary*, but it might make things a bit clearer.
Will see.




CSS as class string
-------------------

One major downside to packing styles into a js class string is you lose all editor support for css.
No idea if there's a way to customise intellisense etc to activate in certain circumstances.

For arguments sake, could raw css (theme/style.css) be loaded and modified according to what I'd sketched above for targeting a single instance?


* load theme class
* load css using link but with `disabled`

It seems like I'm going to be pretty severely hobbled by the current same-origin restrictions on the file URI:

	https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#file_origins

In everything I've tried so far I can't actually directly read the content of anything loaded with file:/// URIs.

These get blocked by origin policy:
* fetch (and presumably xhr)
* iframe contents
* document.styleSheets


See also:
[experiment-html - local-load-content](experiment-html/local-load-content/local-load-content.md)

Which in this case means that while I can load and apply CSS from a file easily, I can't get at it's source programmatically to rewrite it as an id-only nested rule.
At least not while using strictly local file URIs.

So while I'm sticking with local-only, my options are:
* Put the CSS into the js class as a string (as suggested above) and lose nice editor features
* Leave the CSS as separate files (keep the folder structure too) but find another way to localise the effects of the styles


The ability to localise the the styles would probably be limited to class, or maybe nth-of-type.
With nested classes alone you could have different themed clocks on one page, so that would be a start.

To have different instances of the same theme on a single page with full style isolation would be a goal though.
As far as being a goal though, the only real use-case for style isolation would be things like style-variants (style parameters), and even in that case some proper use of classes on the parent element would probably sort it out.

There could be other rarer instances where it might be needed, but perhaps I'm overhyping this requirement a bit.



### What about @import

Another newish (edit: not new) feature - can it do anything useful here?

Or [@ rules](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax/At-rule) in general for that matter.

Actually there are several possible leads in that list, better go through them - for example:

* container
* layer
* namespace
* scope

In essence I think I need something like the following

I can write the html dynamically, so i can do something like this:
```html
	<style>

	</style>
```




