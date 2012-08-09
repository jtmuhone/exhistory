# Session history management support for Internet Explorer

A javascript library to add limited support for
[session history management](http://caniuse.com/#feat=history) in
Internet Explorer < 10.

Uses [JSON parsing](http://caniuse.com/json),
[session storage](http://caniuse.com/namevalue-storage) and
[hashchange event](http://caniuse.com/hashchange). For JSON parsing support on
IE you can use [JSON-js lib](https://github.com/douglascrockford/JSON-js/).
Lack of hashchange event makes IE7 support only partial.

Early beta stage.
