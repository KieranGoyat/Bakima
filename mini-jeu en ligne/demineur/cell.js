function Cell(i, j) {
	//variables de bases d'une cellule
	this.i = i;
	this.j = j;
	this.x = i * cellSize;
	this.y = j * cellSize;
	this.bomb = (Math.floor((Math.random() * bombProbability)) == 0);
	this.color = 200;
	this.number = undefined;
	this.show = false;
	this.locked = false;
	this.explored = false;
}

//fonction pour calculer le nombre de bombe autour
Cell.prototype.setNumber = function(){
	
	var number  = 0;
	var around = this.getCellAround();
	for(i = 0; i < around.length; i++) {
		if(around[i].bomb == true){
			number++;
		}
	}		
	this.number = number;
}

//fonction pour obtenir les cellules autour de la case
Cell.prototype.getCellAround = function() {
	i = this.i;
	j = this.j;
	var around = [];
	
	for (l = j-1; l < j+2; l++) {
			for (k = i-1; k < i+2; k++) {
				if(!(l < 0 || l >= lines || k < 0 || k >= cols) && !(l == j && k == i)) {
				var index = k + l * cols;
				cell = cells[index];
				around.push(cell);
	}}}

		
	return around		
}