function Block(x, y, sizeX, sizeY) {
	this.pos = createVector(x, y);
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.vel = createVector(-1, 0);
	this.acc = createVector(-0.03, 0);
	this.gravity = createVector(0, 0.01);
	this.addedToScore = false;
}

//afficher les blocks
Block.prototype.show = function() {
		fill(clr[1]);
		rect(this.pos.x, this.pos.y, this.sizeX, this.sizeY)
	}

//deplacer les blocks
Block.prototype.update = function() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.add(this.gravity);
		
		if(this.pos.y > linePos - this.sizeY) {
			this.pos.y = linePos - this.sizeY;
		}
	}

//verifier les collisions	
Block.prototype.checkCollision = function(object) {
		var dX = Math.abs(this.pos.x - object.pos.x);
		var dY = Math.abs(this.pos.y - object.pos.y);
		var dSizeX = this.sizeX + object.sizeX;
		var dSizeY = this.sizeY + object.sizeY;
		
		if(dX <= dSizeX && dY <= dSizeY) {
			return true
		} else {
			return false
		}	
}
