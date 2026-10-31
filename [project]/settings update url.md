Settings update URL
===================

Have changes to the clock settings update the URL

```
2026-04-25		🎛⤇📍		New task
```

Some initial thoughts from [small updates](<2.🐁Δ - small updates.md>):

Sync settings with URL... or local storage???
---------------------------------------------

I've not done URL stuff like this before, but I don't think it's going to be terribly hard.
There'll be a few little quirks about what actually gets written though I imagine.
Y'know, there might actually be other options for this like local storage.
Main annoyance that I'm trying to solve is the reset-on-reload while i'm devving.
Ie if I change some things, I'd like a reload to stay on the same settings.

So URL or local storage, or both?

### Gedankenexperiment

If I load the page vanilla, with no url parameters, then twiddle and reload, I'd like the page to stay in the same spot.
So, that would mean that some info should be in browser storage.
But probably not permanently - I'd want different browser tabs (maybe even frames) to store separate info, and a new tab should always see the defaults (unless duplicated??).
So probably `sessionStorage` then.

So if have some settings in the session, then tweak the url should the get-params take precedence?
I think so, bit it might take some trying on for size to see what's comfortable.

Will have a tinker.