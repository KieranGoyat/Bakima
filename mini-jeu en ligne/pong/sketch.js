//creation du canvas
var width = 720;
var height = 480;
var canvas;

//definition des variables de bases
var ball;
var bars = [];

var y1 = height/2;
var y2 = height/2;

var wait = true;
var timeToWait = 2;
var time = getTime();

var scorePlayer1 = 0;
var scorePlayer2 = 0;

var player1Move = 0;


function setup() {
	var canvas = createCanvas(720, 480);
	canvas.parent('myContainer');

  background(230);
  //creation de la balle
  ball = new ball(width/2, height/2, 20);
  
  //creation des bares
  leftBar = new Bar(5, 0, 15, 100);
  bars.push(leftBar);
  rightBar = new Bar(width - 20, 0, 15, 100);
  bars.push(rightBar);
  
  textAlign(CENTER);
  textSize(48);
  noStroke()
  noCursor()
  }
  
  
  
function draw() {
	//efface l image precedente
	clear();
	background(230);
	
	//gestion du temps de pause
	if(wait) {
		var t = getTime();
		var d = t - time;  //time = temps a la victoire precedente
		//d = difference de temps entre maintenant et la victoire precedente
		
		if ( d > timeToWait){
			
			//compte a rebours arriver a 0,  jouer
			var ran = Math.random();
			if(ran < 0.5){var sens = 1} else {var sens = -1};
			ball.vel = createVector(sens * random(2,5), random(2,8));
			ball.vel.setMag(ball.speed);
			wait = false;
			
		} else {
			//compte a rebours
			d = timeToWait - d ;
			d = d.toString();
			fill(255);
			text(d, width/2, height/3);
		}
	}	
	
	// controle 1er joueur avec les touches shift et control
	if (keyIsDown(SHIFT)) {
		y1-=6;
	} else if(keyIsDown(CONTROL)) {
		y1 +=6;
	}
	
	//controle 2e joueur avec les fleches
	if (keyIsDown(UP_ARROW)) {
		y2-=6;
	} else if(keyIsDown(DOWN_ARROW)) {
		y2 +=6;
	}
	
	//empeche les bares de sortir de l'ecran
	if(y1 < 0) {y1 = 0};
	if(y1 > height - leftBar.height/2) {y1 = height - leftBar.height/2};
	if(y2 < 0) {y2 = 0};
	if(y2 > height - rightBar.height/2) {y2 = height - rightBar.height/2};
	//affichage score
	fill(0);
	text(scorePlayer1.toString() + " - " + scorePlayer2.toString(), width/2, height/10)
	
	//update et show
	leftBar.update(y1);
	leftBar.show();
	rightBar.update(y2);
	rightBar.show();
	
	ball.update();
	ball.show();
	
	bars = [];
}

//fonction pour avoir le temps
function getTime() {
	var t = new Date();
	var t = t.getTime();
	var sec = Math.round(t / 1000);
	
	return sec
}
