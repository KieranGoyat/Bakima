//kieran 
//17-04-2017
//18-04-2017

//variable de bases
var puissance4 = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
var currentPlayer = 1;
var ended = false;

//creation du canvas
function setup() {
	var canvas = createCanvas(720, 480);
	canvas.parent('myContainer');
	textAlign(CENTER, CENTER);
	textSize(48);
	draww();
}

//lorsque l'on clique
function mousePressed() {
	var x = mouseX;
	var y = mouseY;
	
	if(!ended){ //si pas terminé, jouer et verifier si gagner
		play(x, y, currentPlayer);
		checkWin(currentPlayer);
	} else { //si terminé reset
		rset();
	}
	
	if(!ended) {draww()}; //afficher le jeu
}

//fonction pour jouer
function play(x ,y ,currentPlayer) {
	if(!(x<0 || x>width || y<0 || y>height)){ //on verifie que l'on clique bien sur le cadre
	var col = Math.floor(7*x/width);  //on determine sur quelle collone on a cliqué
	var played = false;
	
	var i=5; //on part d'en bas
	while(!played && i>=0) {
		if(puissance4[col][i] == 0) { //si la case n'est pas jouée
			puissance4[col][i] = currentPlayer; //on joue sur cette case
			played = true; //on sort de la boucle pour verifier si les cases sont jouées
			changePlayer(); //on change de joueur
		} else {
			i--; //si la case est jouée on remonte
		}
	}
}}

function checkWin(player) {
	//change le player car deja changer dans play()
	var player = -player+3; //1->2  ou 2->1
	var win = false;  //on part du principe que l'on a pas gagné
	for(i=0; i<7; i++) {
		for(j=0; j<6; j++) {
			//pour chaque cases
			if(puissance4[i][j] == player) {
				//pour chaque pions du joueur
				//si 4 pions du meme jouer sont alignés alors gagné
				//verticale
				if(j-3>=0){if(puissance4[i][j-1] == player && puissance4[i][j-2] == player && puissance4[i][j-3] == player) {win = true}};
				//horizontale
				if(i+3<7){if(puissance4[i+1][j] == player && puissance4[i+2][j] == player && puissance4[i+3][j] == player) {win = true}};
				//diagonale droite
				if(j-3>=0 && i+3<7){if(puissance4[i+1][j-1] == player && puissance4[i+2][j-2] == player && puissance4[i+3][j-3] == player) {win = true}};
				//diagonale gauche
				if(j-3>=0 && i-3>=0){if(puissance4[i-1][j-1] == player && puissance4[i-2][j-2] == player && puissance4[i-3][j-3] == player) {win = true}};
			}
	}}	
	if(win) {
		gameEnded(player); //afficher le vainqueur
	} else {
		//verifie qu'il n'y a pas égalité
		var egality = true;  //on part du principe qu'il y a egalité
		for(i=0; i<7; i++) {
			for(j=0; j<6; j++) {
				//si au moins une case est vide -> pas egalité
				if(puissance4[i][j] == 0) {egality = false};
		}}
		if(egality){gameEnded(0)};  //si egalité afficher égalité
	}
}


function draww() { //on affiche le jeu
	background(200);
	drawLines();
	drawGame();
}

function drawLines() { //on affiche les lignes
	strokeWeight(4);
	fill(51);
	for(i=1; i<7; i++) {
		line(i*width/7, 0, i*width/7, height);
	}
	for(i=1; i<6; i++) {
		line(0, i*height/6,  width, i*height/6);
	}
}

function drawGame() { //on affiche les pions
	strokeWeight(0);
	for(i=0; i<7; i++) {
		for(j=0; j<6; j++) {
			//pour chaque cases
			var value = puissance4[i][j]
			 if(value == 1) {
				fill("yellow");
				ellipse((i+0.5)*width/7, (j+0.5)*height/6, 40, 40);
			} else if(value == 2) {
				fill("red");
				ellipse((i+0.5)*width/7, (j+0.5)*height/6, 40, 40);
			} else {};
	}}
}

function gameEnded(player) { //on affiche qui a gagné
	drawGame();
	ended = true;
	background('rgba(200,200,200, 0.5)');	
	fill(51);
	if(player == 1) {
		text("victoire du joueur 1", width/2, height/2);
	} else if(player == 2) {
		text("victoire du joueur 2", width/2, height/2);
	} else {
		text("égalité", width/2, height/2);
	}
	
	text("cliquez pour recommencer", width/2, 2*height/3)
}

function changePlayer() { //on change de joueur
	if(currentPlayer == 1) {
		currentPlayer = 2;
	} else {
		currentPlayer = 1;
	}
	document.getElementById("player").innerHTML = "joueur " + currentPlayer;
}

function rset() { //on redefini les variables de bases
	ended = false;
	currentPlayer = 1;
	document.getElementById("player").innerHTML = "joueur " + currentPlayer;
	puissance4 = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
}