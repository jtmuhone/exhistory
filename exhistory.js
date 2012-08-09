/*
Copyright (c) 2012, Joonas Muhonen
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function() {
    if (typeof window.history.pushState !== "function") {
	history.enablePopstate = true;

	var historyHashchange = (function() {
		if ("onpopstate" in window) {
		    if (history.enablePopstate) {
			var states = JSON.parse(window.sessionStorage.getItem("exhistory.states"));
			if (states && states[location.hash]) {
			    window.onpopstate({state: states[location.hash]});
			}
		    } else {
			history.enablePopstate = true;
		    }
		}
	    });
	if (typeof window.addEventListener === "function") {
	    window.addEventListener("hashchange", historyHashchange, false);
	} else {
	    window.attachEvent("onhashchange", historyHashchange);
	}

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
	    if (window.sessionStorage.getItem("exhistory.states")) {
		var states = JSON.parse(sessionStorage.getItem("exhistory.states"));
	    } else {
		var states = {};
	    }
	    states[fullUrl] = data;
	    window.sessionStorage.setItem("exhistory.states", JSON.stringify(states));
	    history.enablePopstate = false;
	    location.hash = fullUrl;
	};

	window.history.replaceState = function(data, title, url) {
	    if (url === ".") {
		url = "";
	    }
	    document.title = title;
	    if (window.sessionStorage.getItem("exhistory.states")) {
		var states = JSON.parse(sessionStorage.getItem("exhistory.states"));
	    } else {
		var states = {};
	    }
	    states[location.hash] = data;
	    window.sessionStorage.setItem("exhistory.states", JSON.stringify(states));
	};
	
    }
}).call(this);
