//kieran 
//10-04-2017

//variable de base
var morpion = [[0,0,0],[0,0,0],[0,0,0]];
var currentPlayer = 1;
var ended = false;

//initialisation
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
	
	if(!ended){ //si c'est pas fini, on joue
		play(x, y, currentPlayer);
	} else { //si c'est fini on recommence
		rset();
	}
	
	if(!ended) {draww()};
}

//affichage
function draww() {
	background(200);
	drawLines();
	drawGame();
}

//affichage des lignes
function drawLines() {
	strokeWeight(4);
	fill(51);
	line(width/3, 0, width/3, height);
	line(2*width/3, 0, 2*width/3, height);
	line(0, height/3, width, height/3);
	line(0, 2*height/3, width, 2*height/3);
}

//affichage des pions
function drawGame() {
	for(i=0; i<3; i++) {
		for(j=0; j<3; j++) {
			Xcenter = i*width/3 + width/6;
			Ycenter = j*height/3 + height/6;
			
			if(morpion[i][j] == 1) {
				noFill();
				ellipse(Xcenter, Ycenter, 75, 75); //cercle
			} else if(morpion[i][j] == 2) {	
				line(Xcenter - width/12, Ycenter - height/12, Xcenter + width/12, Ycenter + height/12); //croix
				line(Xcenter - width/12, Ycenter + height/12, Xcenter + width/12, Ycenter - height/12);
			} else {};	
	}}
}

function play(x, y, player) {
	var Xcase = Math.floor(3*x/width);
	var Ycase = Math.floor(3*y/height);
	
	if(morpion[Xcase][Ycase] == 0) { //si case vide
		morpion[Xcase][Ycase] = player; //on joue sur cette case
		checkWin(Xcase, Ycase, player); //on verifie si on gagne
		changePlayer(); //on change de joueur
	}	
}

//verifie si on gagne
function checkWin(x, y, player) {
	//on part du principe que l'on gagne
	var verticalWin = true;
	var horizontalWin = true;
	var diagonaleDroite = true;
	var diagonaleGauche = true;
	var egality = true;
	
	for(i=0; i<3; i++) {
		if(morpion[x][i] != player) {verticalWin = false};
		if(morpion[i][y] != player) {horizontalWin = false};
		if(morpion[i][i] != player) {diagonaleGauche = false};
		if(morpion[2-i][i] != player) {diagonaleDroite = false};
		for(j=0; j<3; j++) {if(morpion[i][j] == 0) {egality = false}}; //tant que toutes les cases ne sont pas joués egalité possible
	}
	
	if(verticalWin || horizontalWin || diagonaleDroite || diagonaleGauche){ //si gagné
		gameEnded(player); 
	} else if(egality) { //sinon si egalité
		gameEnded(0)
	};
}

//affichage du texte de fin
function gameEnded(player) {
	draww();
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

//changement de joueur
function changePlayer() {
	if(currentPlayer == 1) {
		currentPlayer = 2;
	} else {
		currentPlayer = 1;
	}
	document.getElementById("player").innerHTML = "joueur " + currentPlayer;
}

//remise a zero
function rset() {
	ended = false;
	currentPlayer = 1;
	document.getElementById("player").innerHTML = "joueur " + currentPlayer;
	morpion = [[0,0,0],[0,0,0],[0,0,0]];
}