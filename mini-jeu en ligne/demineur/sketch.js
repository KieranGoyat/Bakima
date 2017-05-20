//kieran
//26-03-2017

//taille du canvas
var width = 720;
var height = 480;

//definition des variables de base
var cellSize = 24;
var demiCellSize = cellSize/2;
var cols = Math.floor(width/cellSize);
var lines = Math.floor(height/cellSize);
var gameEnded = false;

var cells = []
var cellToExplore = [];

var bombProbability = 12;

var normalColor;
var bombColor;
var notBombColor;
var cellColor = [];
var flagColor;

//fonction de mise en place
function setup() {
  //definition des couleurs
  normalColor = color(200);
  bombColor = color(255, 0, 0);
  notBombColor = color(0, 255, 0);
  //ensemble de couleur en fonction de la valeur de la case
  cellColor = [color(150), color(75, 200, 75), color(36,155,156), color(200, 50, 50), color(150,50,200), color(0), color(100,215,220), color(100, 250,150), color(68,189,147)]
  flagColor = color(0, 255, 255);

  //creation du canvas
  var canvas = createCanvas(720, 480);
  canvas.parent('myContainer');
  
  //aspect graphique
  textSize(16);
  textAlign(CENTER, CENTER);
  stroke(100);
  rectMode(CORNER);
  
  //creation des cellules
  for (j = 0; j < lines; j++) {
	  for (i = 0; i < cols; i++) {
		  var cell = new Cell(i, j);
		  cells.push(cell);
	}}
  
  //numerotation des cellules
  for (var i = 0; i < cells.length; i++){
	  var cell = cells[i];
	  if (!cell.bomb) {
	  cell.setNumber()
	}}
	
  show();
  }
  
  
//fonction executé a chaque clic modifiant l'affichage des cases et de leur nombre
function show() {
  rectMode(CORNER);
  for (i = 0; i < cells.length; i++){
	cell = cells[i];
	fill(cell.color)
	rect(cell.x, cell.y, cellSize, cellSize);
	
	//afficher nombre
	if (cell.show && !cell.bomb && !cell.number == 0){
	fill(51);
	textSize(16);

	var n = String(cell.number);
	text(n, cell.x + demiCellSize, cell.y + demiCellSize);
	}
  }
}

//cette fonction s'execute lorsque l'on clique
function mousePressed() {
	if(gameEnded) { //si la partie est termine, cliquez pour recommencer
		reset();
	} else { //sinon jouer
	
	x = mouseX;
	y = mouseY;
	if(!(x<0 || x > width || y < 0 || y > height) && !gameEnded) { //si on clique en dehors ne pas jouer
	//recuperer l'index de la cellule
	i = Math.floor(x/cellSize);
	j = Math.floor(y/cellSize);
	index = i + j * cols;
	cell = cells[index];
	
	//montrer case
	if (mouseButton == LEFT && !cell.locked){ //si clique gauche et pas de drapeau
	cell.show = true;
	if(cell.bomb) {
		//game over
		Ended(false);
	} else {
		//ce n est pas une bombe
		cell.color = cellColor[cell.number];
		if(cell.number == 0) {
			explore(cell); //pour afficher les cases 0 autour
		}
		show(); //afficher les cases apres modification
	}}
	
	//drapeau
	if (mouseButton == RIGHT && !cell.show) {  //si clique droit mettre un drapeau (ou l'enlever)
		cell.locked = !cell.locked;
		if (cell.locked) {
		cell.color = flagColor;
		} else {
			cell.color = normalColor;
		}
		show();
	}
	
	
	if(checkWin()) { //on regarde si victoire
		Ended(true);
	}
}}}

//afficher toutes les cases a la fin
function reveal(win) {
	if(win) {var c = color(0)} else {c = bombColor}
	for (i = 0; i < cells.length; i++){
		cell = cells[i];
		cell.show = true;
		
		if(cell.bomb) {
		cell.color = c;
		} else {
		cell.color = cellColor[cell.number];
		}
	}
}

//montre toute les cases a 0 et celle autour
function explore(cell) {
	cell.show = true;
	cell.explored = true;

	var around = cell.getCellAround();
	for(i = 0; i < around.length; i++) {
		around[i].show = true;
		around[i].color = cellColor[around[i].number];
		if(around[i].number == 0) {
		cellToExplore.push(around[i]);
	}}
	
	for(i = 0; i < cellToExplore.length; i++) {
		var cell = cellToExplore[i];
		if(!cell.explored) {
		cell.explored = true;
		explore(cellToExplore[i]);
		
	}}
}

//si toute les bombes sont locked alors gagné
function checkWin() {
	for (i = 0; i < cells.length; i++){
		var cell = cells[i];
		if(cell.bomb && !cell.locked) {
			return false;
		}
	}
	return true;
}

//afficher le resultat
function Ended(win) {
	reveal(win);
	show();
	gameEnded = true;
	
	if(win) {var txt = "You Win"} else {var txt = "Game Over"};
	
	rectMode(CENTER);
	fill(255, 150);
	rect(width/2, 7*height/12, 3*width/5, height/3);
	
	fill(0);
	textSize(48);
	text(txt, width/2, height/2);
	textSize(32);
	text("cliquez pour recommencer", width/2, 2*height/3);
}

function reset() {  //on redefinit les variables de bases
	cells = [];
	cellToExplore = [];
	gameEnded = false;
	setup();
}

