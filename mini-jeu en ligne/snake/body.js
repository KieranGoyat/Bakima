//fonction pour le corps du serpent
function Body(x, y) {
	//variables de bases
	this.x = x;
	this.y = y;
	this.nextX = x;
	this.nextY = y;
	
	//affichage des morceaux du serpent
	this.show = function() {
		var x = this.x*cellSize+0.5*cellSize;
		var y = this.y*cellSize+0.5*cellSize;
		var nextX = this.nextX*cellSize+0.5*cellSize;
		var nextY = this.nextY*cellSize+0.5*cellSize;
		
		stroke(100);
		strokeWeight(cellSize);
		line(x, y, nextX, nextY);
		
		// noStroke();
		// fill(100);
		// ellipse(x, y, cellSize, cellSize)
	}
	
	//suivre le morceau précédent
	this.follow = function(parent) {
		this.x = this.nextX;
		this.y = this.nextY;
		
		this.nextX = parent.x;
		this.nextY = parent.y;
	}
}