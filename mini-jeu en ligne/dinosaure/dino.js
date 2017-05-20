function Dino(x, y, sizeX, sizeY) {
	this.pos = createVector(x, y);
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.gravity = createVector(0, 0.02);
	
	//afficher le dino
	this.show = function() {
		fill(clr[1]);
		rect(this.pos.x, this.pos.y, this.sizeX, this.sizeY);
	}
	
	//deplacer le dino
	this.update = function() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.add(this.gravity);
		
		if(this.pos.y > linePos - this.sizeY) {
			this.pos.y = linePos - this.sizeY;
			this.vel.mult(0);
			this.acc.mult(0);
		}
	}
}