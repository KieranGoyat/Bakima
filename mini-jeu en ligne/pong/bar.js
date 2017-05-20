function Bar(x, y, w, h) {
	this.pos = createVector(x, y);
	this.width = w;
	this.height = h;
	this.vel = createVector(0, 0);
}

//deplacement des bares
Bar.prototype.update = function(y) {
	
		this.pos.y = y - this.height/2;
		
		if(this.pos.y < 0) {
			this.pos.y = 0;
		}
		if(this.pos.y > height - this.height) {
			this.pos.y = height - this.height;
		}
		
		bars.push(this);	
	}

//affichage des bares
Bar.prototype.show = function() {
		rect(this.pos.x, this.pos.y, this.width, this.height)
	}