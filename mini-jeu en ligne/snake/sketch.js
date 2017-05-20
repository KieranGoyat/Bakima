//kieran 
//21-03-2017

//taille du canvas
var width = 720;
var height = 480;

//definition des variables de bases
var cellSize = 24;
var cols = Math.floor(width/cellSize);
var lines = Math.floor(height/cellSize);

var snake
var snakeLenght = 5;
var apple

var sens = -1; //sens indefini pas de mouvement
var gameover = false;
var score = 0;
var highScore = 0;


//fonction executer une fois au debut 
//creation de l'image(canvas) du snake et de la pomme
function setup() {
  //on verifie les cookies
  setHighscoreFromCookies();
	
  //creation du canvas et des objet serpent et pomme
  var canvas = createCanvas(720, 480);
  canvas.parent('myContainer');
  snake = new Snake();
  apple = new Apple();

  //on bloque le nbr d image par seconde pour avoir l effet sacadé du snake
  frameRate(8);
  }
  
function draw() {
	if(!gameover) {//tant que l'on a pas perdu
	//efface l image precedente
	clear();
	background(230);
	
	// drawLines();
	snake.move(sens); //on deplace le serpent a chaque image
	
	if(!gameover) { //on retest si on a pas perdu au cas ou il aurait changé pendant le deplacement precedent
	snake.show(); //on affiche le serpent (gris foncé)
	snake.showHead(); //on affiche la tete du serpent(vert)
	apple.show(); //on affiche la pomme (rouge)
	showScore();  //on affiche le score
	}
}}


//fonction pour detecter le sens en fonction des touches
function keyPressed() {
	
  var value = -1; //-1 = valeur indefinie, 0 = haut, 1 = droite, 2 = bas, 3 = gauche
  if (keyCode === UP_ARROW && sens != 2) { //on verifie egalement que le serpent ne fait pas demi-tour
    value = 0;
  } else if (keyCode === RIGHT_ARROW && sens != 3) {
    value = 1;
  } else if (keyCode ===  DOWN_ARROW && sens != 0) {
    value = 2;
  } else if (keyCode === LEFT_ARROW && sens != 1) {
    value = 3;
  } 
  
  if(value!= -1) { //si la valeur n'est pas indefini, le sens prend cette valeur
  sens = value;
  }
}


//fonction pour dessiner les cases
function drawLines () {
	for(i=0; i < cols; i++) {
		stroke(51);
		strokeWeight(1);
		line(i*cellSize, 0, i*cellSize , height);
	}
	
	for(i=0; i < lines; i++) {
		stroke(51);
		strokeWeight(1);
		line(0, i*cellSize, width, i*cellSize);
	}
}


//fonction pour stoper quand c est perdu
function gameOver() {
	gameover = true;
	clear();
	background(230);
	textAlign(CENTER);
	fill(51);
	textSize(48);
	text("Game Over", width/2, height/2);
	textSize(32);
	text("cliquez pour relancer", width/2, 2*height/3)
	showScore();
}

//fonction pour afficher le score
function showScore() {
	fill(51);
	textAlign(CENTER);
	textSize(48);
	text("score: " + score, width/2, height/5);
	text("high-score: " + highScore, width/2, height/9);
}

//relancer le jeu quand on clique
function mousePressed() {
  if(gameover) {
  resetSnake();
}}

//fonction reset
function resetSnake() {
	//on redefini les variables de bases et les objets
	gameover = false;
	score = 0;
	sens = -1;
	snakeLenght = 5;
	
	snake = new Snake();
    apple = new Apple();
}