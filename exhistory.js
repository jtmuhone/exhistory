if (typeof window.history.pushState !== "function") {
    
    history.enablePopstate = true;
    if (! sessionStorage.getItem("exhistory.states")) {
        sessionStorage.setItem("exhistory.states", "{}");
        console.log("Init states");
    }
    window.addEventListener("hashchange",
			    (function () {
				if ("onpopstate" in window &&
				    location.hash.indexOf("#!/") == 0) {
				    if (history.enablePopstate) {
					var states = JSON.parse(sessionStorage.getItem("exhistory.states"));
					window.onpopstate({state: states[location.hash]});
				    } else {
					history.enablePopstate = true;
				    }
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
	var states = JSON.parse(sessionStorage.getItem("exhistory.states"));
	states[fullUrl] = data;
	sessionStorage.setItem("exhistory.states", JSON.stringify(states));
	history.enablePopstate = false;
	location.hash = fullUrl;
    };

    window.history.replaceState = window.history.pushState;
}
