//kieran
//28-03-2017

//taille du canvas
var width = 720;
var height = 720;

//variables pour les couleurs
var clr;
var clr1 = [];
var clr2 = [];
//color[background, objectcolor]

//variables de bases
var linePos = 400;
var gameover = false;
var highScore = 0;
var score = 0;

var blocks = [];

function setup() {
	clr1 = [51, 255];
	clr2 = [200, 0];
	clr = clr1;
	
	//definition du highscores a partir des cookies
	setHighscoreFromCookies();
	
	//creation du canvas
	var canvas = createCanvas(720, 480);
	canvas.parent('myContainer');
	
	rectMode(RADIUS);
	frameRate(60);
	
	dino = new Dino(200, linePos-20, 20, 40);  //creation de l'objet dino
	spawn(0);  //creation des blocks
  }
  
//affichage des elements
function draw() {
	if(!gameover) {
	background(clr[0]);
	stroke(clr[1]);
	strokeWeight(4);
	line(0, linePos, width, linePos);
	drawScore(32, false);
	
	if(Math.floor(frameCount/600)%2 == 0) {clr = clr2} else {clr = clr1}; //change de couleur toute les 10 sec
	
	//deplacement du dino
	dino.update();
	dino.show();
	
	//pour chaque block verifie qu'il n'y a pas collision
	for(i=0; i < blocks.length; i++) {
		blocks[i].show();
		blocks[i].update();
		if(blocks[i].checkCollision(dino)) {
			gameover = true;
		}
	}
	
	//retire les blocks en dehors du canvas et check le score
	for(i = blocks.length-1; i >= 0; i--) {
		if(blocks[i].pos.x < dino.pos.x - dino.sizeX && !blocks[i].addedToScore) {
			//on a depasse le bloc
			score++;
			if(score > highScore) {
				highScore = score;
				document.cookie = "highscore=" + highScore;
			}
			blocks[i].addedToScore = true;
			spawn(Math.floor(Math.random()*5));
		}
			
		if(blocks[i].pos.x < 0 - blocks[i].sizeX) {
			blocks.splice(i, 1);
		}
	}
	
	//32 = space keycode
	if ((mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32)) && dino.pos.y > 350) {  //possibilité de jouer avec espace/souris/fleche du haut
		dino.acc.add(createVector(0, -0.01)); //faire sauter le dino
		dino.vel.add(createVector(0, -1));
	}
	
	if(gameover) {
		gameOver();
	}
	
}}

function gameOver() {
	background(clr[0]);
	textSize(48);
	textAlign(CENTER, CENTER);
	fill(clr[1]);
	noStroke();
	text("Game Over", width/2, height/3);
	textSize(32);
	text("cliquez pour relancez", width/2, height/3 + 30);
	drawScore(48, true);
}

//affiche le score
function drawScore(size, txt) {
	textSize(size);
	textAlign(CENTER, CENTER);
	fill(clr[1]);
	noStroke();
	if(txt) {
		text("score: " + score, width/2, height/2+30);
		text("highscore: " + highScore, width/2, 2*height/3+30);
	} else {
		text("score: " + score, width/2, height/4);
		text("highscore: " + highScore, width/2, height/6);
	}
}

function mousePressed() {
	if(gameover) {
		//reset
		gameover = false;
		score = 0;
		blocks = [];
		spawn(0);
	}
}
