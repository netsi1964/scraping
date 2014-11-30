/*global $, localStorage, angular, alert, document, console, confirm, require */
/*jshint unused:false */
/*jshint plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

function done() {
	var iBestMatchCount = -1;
	var iBestFound;
	var bFound = false;
	for (var i = found.length - 1; i > -1 && !bFound; i--) {
		var current = found[i];
		var iCurrentMatches = current.count;
		if (iBestMatchCount === -1) {
			iBestMatchCount = iCurrentMatches;
			iBestFound = i;
		} else {
			if (iCurrentMatches !== iBestMatchCount) {
				bFound = true;
			}
		}
	}
	var color = _getRandomColor(55, .25);
	[].forEach.call(document.querySelectorAll(found[iBestFound].selector), function mark(e) {
		if (e !== "") {
			e.style.background = color;
			e.style.outline = "solid 2px "+color;
		}
	});

	console.log("I suggest using: " + found[iBestFound].selector);

}

var element;
document.addEventListener("click", function clicked(e) {
	getSelector(e.target, done);
	e.cancelBubble = true;
	e.preventDefault();
});

var selector = "";
var found = [];

function getSelector(ele, done, iLevel) {
	if (typeof iLevel === "undefined") {
		selector = "";
		iLevel = 0;
		found = [];
	}
	var tagname = ele.tagName.toLowerCase();
	if (tagname !== "body") {
		var id = ele.id;

		// Remove id which contains numeric data
		id = (id.replace(/\d/g, "") === id) ? id : "";


		// Remove classnames which contains numeric data
		var className = ele.className.split(" ");
		// Remove classnames which contains numeric data
		var temp = [];
		for (var i = 0; i < className.length; i++) {
			var current = className[i];
			var stripped = current.replace(/\d/g, "");
			if (stripped === current && stripped !== "") {
				temp.push(current.replace(/\./g, ""));
			}
		}
		className = temp.join(".").replace(/\.{2}/g, ".").replace(/^\./g, "").replace(/$\./g, "");
		selector = tagname + ((id !== "" && selector !== "") ? "#" + id : "") + ((className !== "") ? "." + className : "") + " " + selector;
		var iFound = document.querySelectorAll(selector).length;
		found.push({
			"count": iFound,
			"selector": selector,
			"level": iLevel
		});
		var parent = ele.parentElement;
		if (parent !== null) {
			getSelector(parent, done, ++iLevel);
		}
	} else {
		done.call();
	}
}

function _getRandomColorSegment(min) {
	min = (typeof min === "undefined") ? 55 : parseInt(min);
	min = (min < 0 || min > 254) ? 55 : min;
	var max = 255 - min;
	return parseInt(Math.random() * max - Math.random() * max) + min;
}

function _getRandomColor(minColor, minOpacity) {
	minOpacity = (typeof minOpacity === "undefined") ? .5 : parseFloat(minOpacity);
	minOpacity = (minOpacity < 0 || minOpacity > .95) ? .5 : minOpacity;
	var max = 1 - minOpacity;
	var opacity = parseFloat(Math.random() * max - Math.random() * max) + minOpacity;
	return "rgba("+_getRandomColorSegment(minColor)+","+_getRandomColorSegment(minColor)+","+_getRandomColorSegment(minColor)+","+opacity+")";
}