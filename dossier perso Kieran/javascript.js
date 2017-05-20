function extend(src) {
	document.getElementById('extend_img').src= src;
	document.getElementById('extend').style.display = "block";
	document.getElementById('home').style.overflowY = "hidden";
}

function close_ext(){
		document.getElementById('extend').style.display = "none";
		document.getElementById('home').style.overflowY = "scroll";
}