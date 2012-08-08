if (! "pushState" in window.history) {
    window.history.states = {};
    window.addEventListener("hashchange",
			    (function () {
				if ("onpopstate" in window &&
				    location.hash.indexOf("#!/") == 0) {
				    window.onpopstate({state: window.history.states[location.hash]});
				}
			    }), false);
    window.history.pushState = function(data, title, url) {
	if (url === ".") {
	    url = "";
	}
	document.title = title;
	if (url.indexOf(";") < 0) {
	    var fullUrl = "#!/" + url + ";" +
		Math.floor(Math.random() * 1000000);
	} else {
	    var fullUrl = "#!/" + url;
	}
	window.history.states[fullUrl] = data;
	location.hash = fullUrl;
    };

    window.history.replaceState = window.history.pushState;

}
