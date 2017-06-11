"use strict"

var linkStr = "uz.gov.ua\ncity.kharkov.ua\ndesignspiration.net\nbookcoverarchive.com\ninformationisbeautiful.net";
var tableArr = {};

function parseStr(str){
	//console.log(str);
	var lst = [];
	var i = 0;
	var len = str.length;
	var tmp = '';
	while (i < len) {
		while ((i < len) && (str.charAt(i) != '\n')) {
			tmp += str.charAt(i);
			i++;
		}
		if ((i < len) && (str.charAt(i) == '\n')) {
			while ((i < len) && ((str.charAt(i + 1) == ' ') || (str.charAt(i + 1) == '\n'))) {
				i++;
			} 
		}
		lst.push(tmp);
		i++;
		tmp = '';
	}
	return lst;
}

function linearSearch(letter){
	var lst = parseStr(linkStr);
	var len = lst.length;

	var output = [];
	for (var i = 0; i < len; i++){
		var link = lst[i];
		var firstLetter = link.charAt(0);
		if (letter == firstLetter) {
			output.push(link);
		}
	}
	return output;
}

function makeTable(letter){
	//var tableArr = {};
	tableArr[letter] = linearSearch(letter);
	//return tableArr;
}

function loadPage(){
	var frame = document.getElementById("page-frame");
	console.log(this);
	frame.setAttribute("src", "http://" + this);
}

function linkList(links) {
	console.log(links);
	var len = links.length;
	var firstlevel = document.getElementById("first-level");
	var list = document.createElement("ul");
	for (var i = len - 1; i >= 0; i--) {
		var point = document.createElement("li");
		var taglink = document.createElement("BUTTON");
		taglink.setAttribute("class", "links");
		//taglink.setAttribute("onclick", loadPage(links[i]));
		var tFunc = loadPage.bind(links[i]);
		taglink.addEventListener("click",tFunc);

		firstlevel.appendChild(list);
		list.appendChild(point);
		taglink.innerHTML = links[i];
		point.appendChild(taglink);
	}
}

function linkTable() {
	//console.log("linkTable");
	var table = {};
	for (var code = 97; code <= 122; code++) {
		var letter = String.fromCharCode(code);
		if (linearSearch(letter).length != 0) {
			//table = makeTable(letter);
			makeTable(letter);
		}
	}
	table = tableArr;
	return table;
}

function fullLevels(){
	//console.log("fullLevels");
	var key;
	var levels = document.getElementById("levels");
	var firstlevel = document.createElement("ul");
	firstlevel.setAttribute("id", "first-level");
	levels.appendChild(firstlevel);
	var table = linkTable();

	for (key in table) {		
		//console.log(key);
		var letter = document.createElement("li");
		letter.setAttribute("class","letters");
		letter.setAttribute("id", key);
		letter.innerHTML = key;
		firstlevel.appendChild(letter);

		linkList(table[key]);
	}
}

(function() {
	//console.log("init");
	document.getElementById("levels").onload = fullLevels();
})();

/*var links = linearSearch(letter);
var len = links.length;
var string = '<ul><li>' + a + '</li><ul>';
for (var i = len - 1; i >= 0; i--) {
	string += '<li><a href=\"' + links[i] + '\"></a></li>';

}
string += '</ul>'*/
//addEventListner("click", )