function setHighscoreFromCookies() {

//cookies ne marche pas en local sur google chrome
var cookie = getCookie("highscore");
if(cookie != ""){
	highScore = cookie;
} else {
	document.cookie = "highscore=0";
}

//fonction pour lire les cookies  (source exterieur)
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
}